from django.db import models
from .posts import BlogPost

# from django.contrib.auth.models import User  # 使用Django內置的User模型來代表作者


class Comment(models.Model):
    blogpost = models.ForeignKey(
        BlogPost, related_name="comments", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)
    content = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} : {self.content} - at {self.pub_date}"
