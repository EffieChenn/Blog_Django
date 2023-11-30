from rest_framework import serializers
from .models import BlogPost, Comment, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        exclude = ["id"]


class BlogPostSerializer(serializers.ModelSerializer):
    comments = serializers.StringRelatedField(many=True)
    category = serializers.SlugRelatedField(
        many=False, slug_field="name", read_only=True
    )

    class Meta:
        model = BlogPost
        fields = "__all__"
        lookup_field = "slug"


class CommentSerializer(serializers.ModelSerializer):
    pub_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False)

    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ["pub_date", "blogpost"]
