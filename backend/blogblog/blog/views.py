from rest_framework import status
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    GenericAPIView,
    ListCreateAPIView,
)
from rest_framework.mixins import ListModelMixin
from .models import BlogPost, Comment
from .serializers import BlogPostSerializer, CommentSerializer
from datetime import datetime


# class CategoryListView(APIView):
#     def get(self, request):
#         queryset = Categories.objects.all()
#         serializers = CategorySerializer(queryset, many=True)
#         return Response(serializers.data)


# ListAPIView內建一個get方法，只需要定義一個視圖類，而不必手動實現 GET 方法
class BlogPostListView(ListAPIView):
    queryset = BlogPost.objects.all().order_by("-date_created")
    serializer_class = BlogPostSerializer
    lookup_field = "slug"
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        # 從URL参数中獲得分類名稱
        category_name = self.request.query_params.get("category", None)

        # 如果没有提供分類名稱，返回所有文章
        if category_name is None:
            return BlogPost.objects.all()

        # 根據分類過濾文章
        queryset = BlogPost.objects.filter(category=category_name)
        return queryset


# If you want to use object lookups other than pk, set 'lookup_field'.
# For more complex lookup requirements override `get_object()`.


class BlogPostDetailView(RetrieveAPIView, ListCreateAPIView):
    queryset = BlogPost.objects.order_by("-date_created")
    serializer_class = BlogPostSerializer
    lookup_field = "slug"
    permission_classes = (permissions.AllowAny,)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        # Get comments for this blog post
        comments = Comment.objects.filter(blogpost=instance).order_by("-pub_date")

        # 一次取得多筆資料，故many=true
        comment_serializer = CommentSerializer(comments, many=True)

        # 拿序列化後的資料，但格式不好查看
        data = serializer.data

        # 將評論數據與文章數據組合在一起的方法 ＝ 與該文章關聯的評論會顯示在該文章下方
        data["comments"] = comment_serializer.data

        # DRF內的Response會將上述格式轉換成JSON
        return Response(data)


class BlogPostCommentView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, slug, *args, **kwargs):
        try:
            blogpost = BlogPost.objects.get(slug=slug)
        except BlogPost.DoesNotExist:
            return Response(
                {"error": "Blog post not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # post / 新增資料時，需將資料反序列化後傳遞給後端
        serializer = CommentSerializer(data=request.data)

        # 並且需要通過驗證（ .is_valid()為序列化器內建的驗證方法，全都符合的話會返回True ）
        if serializer.is_valid():
            serializer.save(blogpost=blogpost, pub_date=datetime.now())
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # 驗證有錯的話，返回 儲存錯誤欄位的字典，status可指定回應代碼
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlogPostFeaturedView(ListAPIView):
    queryset = BlogPost.objects.all().filter(featured=True)
    serializer_class = BlogPostSerializer
    lookup_field = "slug"
    permission_classes = (permissions.AllowAny,)


# class CategoryListView(APIView):
#     permission_classes = (permissions.AllowAny,)

#     def get(self, request, format=None):
#         data = map(lambda c: {"id": c[0], "name": c[1]}, Categories.choices)
#         return Response(data)
