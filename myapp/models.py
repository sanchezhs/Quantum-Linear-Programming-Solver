from django.db import models

# Create your models here.
class Function(models.Model):
    function = models.CharField(max_length=200)
    maximize = models.BooleanField(default=False)

class Restriction(models.Model):
    restriction = models.CharField(max_length=250)
    function = models.ForeignKey(Function, on_delete=models.CASCADE)