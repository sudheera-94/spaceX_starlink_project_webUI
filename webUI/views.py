from django.shortcuts import render
import requests
from django.views.generic import TemplateView
from .services import get_Info


class GetInfo(TemplateView):
    template_name = 'home.html'

    def get_context_data(self, *args, **kwargs):
        context = {
            'info' : get_Info()
        }
        return context

# def home(request):
#     response = requests.get('http://127.0.0.1:8000/add/1.json')
#     satelliteData = response.json()
#     return render(request, 'core/home.html', {
#         'satelliteId': satelliteData['satelliteId'],
#         'satelliteName': satelliteData['satelliteName'],
#         'comments': satelliteData['comments']
#     })
