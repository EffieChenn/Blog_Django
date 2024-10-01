from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from .models import BlogPost, Comment, Category
from .serializers import BlogPostSerializer, CommentSerializer, CategorySerializer
from datetime import datetime

from rest_framework.permissions import BasePermission


class IsAuthenticatedOrReadOnlyForCreate(BasePermission):
    def has_permission(self, request, view):
        # 允許 GET、HEAD、OPTIONS 請求
        if request.method in ["GET", "POST", "HEAD", "OPTIONS"]:
            return True
        # 在執行 create 操作時進行身份驗證
        return request.user and request.user.is_authenticated


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def retrieve(self, request, *args, **kwargs):
        category_name = self.kwargs.get("name")
        category = Category.objects.filter(name=category_name).first()

        if category:
            posts = category.posts.all()  # 名稱要跟model內部的related_name相同
            serializer = BlogPostSerializer(posts, many=True)
            return Response(serializer.data)
        else:
            return Response(
                {"message": f"Category '{category_name}' not found."},
                status=status.HTTP_404_NOT_FOUND,
            )


class BlogPostViewSet(ModelViewSet):
    serializer_class = BlogPostSerializer
    lookup_field = "slug"
    permission_classes = [IsAuthenticatedOrReadOnlyForCreate]
    queryset = BlogPost.objects.all()

    def list(self, request):
        category_name = self.request.query_params.get("category", None)
        if category_name:
            queryset = self.queryset.filter(category__name=category_name)
        else:
            queryset = self.queryset
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def comments(self, request, slug=None):
        blogpost = self.get_object()
        comments = Comment.objects.filter(
            blogpost=blogpost).order_by("-pub_date")
        comment_serializer = CommentSerializer(comments, many=True)
        return Response(comment_serializer.data)

    @action(detail=True, methods=["post"])
    def add_comment(self, request, slug=None):
        blogpost = self.get_object()
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(blogpost=blogpost, pub_date=datetime.now())
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["get"])
    def featured(self, request):
        featured_posts = self.queryset.filter(featured=True)
        serializer = self.get_serializer(featured_posts, many=True)
        return Response(serializer.data)

    def create(self, request):
        self.check_permissions(request)

        user = request.user

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            category_name = request.data.get("category")
            category = Category.objects.filter(name=category_name).first()
            serializer.validated_data["author"] = user

            if not category_name or not category:
                default_category = Category.objects.get(pk=1)
                serializer.validated_data["category"] = default_category
            else:
                serializer.validated_data["category"] = category

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
