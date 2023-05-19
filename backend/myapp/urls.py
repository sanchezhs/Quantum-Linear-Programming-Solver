from django.urls import path, include
from . import views

from rest_framework import routers
 
router = routers.DefaultRouter()
 
router.register(r'input',views.Api_input, basename='input')
router.register(r'upload',views.Api_upload, basename='upload')
router.register(r'settings',views.Api_settings, basename='settings')

urlpatterns = [
    path('', include(router.urls)),
]
