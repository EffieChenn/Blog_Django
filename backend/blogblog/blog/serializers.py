from rest_framework import serializers
from .models import BlogPost, Comment


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        # 取得全部欄位
        fields = "__all__"
        lookup_field = "slug"


class CommentSerializer(serializers.ModelSerializer):
    pub_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False)

    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ["pub_date", "blogpost"]
