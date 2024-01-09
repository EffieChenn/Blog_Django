from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    # BlogPostListView,
    # BlogPostDetailView,
    # BlogPostFeaturedView,
    # BlogPostCommentView,
    BlogPostViewSet,
    CategoryViewSet,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r"blog", BlogPostViewSet)
router.register(r"categories", CategoryViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path(
        "categories/<name>",
        CategoryViewSet.as_view({"get": "retrieve"}),
        name="category-detail",
    ),
    path(
        "blog/<slug:slug>/add-comment/",
        BlogPostViewSet.as_view({"post": "add_comment"}),
        name="blogpost-add-comment",
    ),
    # JWT Auth
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # path("blog", BlogPostListView.as_view()),
    # path("blog/featured", BlogPostFeaturedView.as_view()),
    # path("blog/<slug>", BlogPostDetailView.as_view(), name="blogpost-detail"),
    # path("blog/<slug>/comment", BlogPostCommentView.as_view(), name="blogpost-comment"),
]
