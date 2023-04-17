from django.urls import path, include
from . import views

from rest_framework import routers
 
router = routers.DefaultRouter()
 
router.register(r'index',views.Api_index, basename='index')

urlpatterns = [
    path('', include(router.urls)),
    #path('', views.index, name='index'),
    #path('upload/', views.file_upload, name='upload'),
    #path('howto/', views.how_to, name='howto'),
    #path('api/', include(router.urls))
]
