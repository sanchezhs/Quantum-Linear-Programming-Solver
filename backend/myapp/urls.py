from django.urls import path, include
from . import views

from rest_framework import routers
 
router = routers.DefaultRouter()
 
router.register(r'index',views.Api_index, basename='index')
router.register(r'upload',views.Api_upload, basename='upload')
router.register(r'settings',views.Api_settings, basename='settings')
router.register(r'ibm',views.Api_ibm, basename='ibm')

urlpatterns = [
    path('', include(router.urls)),
    #path('', views.index, name='index'),
    #path('upload/', views.file_upload, name='upload'),
    #path('howto/', views.how_to, name='howto'),
    #path('api/', include(router.urls))
]
