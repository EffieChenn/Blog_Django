from django.urls import path
from .views import (
    BlogPostListView,
    BlogPostDetailView,
    BlogPostFeaturedView,
    BlogPostCommentView,
    # CategoryListView,
)

urlpatterns = [
    path("blog", BlogPostListView.as_view()),
    path("blog/featured", BlogPostFeaturedView.as_view()),
    path("blog/<slug>", BlogPostDetailView.as_view(), name="blogpost-detail"),
    path("blog/<slug>/comment", BlogPostCommentView.as_view(), name="blogpost-comment"),
    path("category/<str:category>/", BlogPostListView.as_view()),
]
