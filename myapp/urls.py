from django.urls import path 
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('upload/', views.file_upload, name='upload'),
    path('about/', views.about, name='about'),
]
