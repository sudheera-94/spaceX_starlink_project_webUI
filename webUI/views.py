from django.shortcuts import render
from django.views import View
from django.views.generic import TemplateView

from .forms import NewSatellite
from .services import get_Info


class GetInfo(TemplateView):
    template_name = 'home.html'

    # Get request handling
    def get_context_data(self, *args, **kwargs):
        context = {
            'info': get_Info()
        }
        return context


def home(request):
    return render(request, 'home.html')


def form_name_view(request):
    return render(request, 'new_satellite.html')
