from django.contrib import admin
from django.urls import path
from main.api_views import PredictionView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('prediction/', PredictionView.as_view())
]
