from django import forms


class NewSatellite(forms.Form):
    satelliteName = forms.CharField(max_length=20)
    xCoordinate = forms.IntegerField(max_value=19, min_value=0)
    yCoordinate = forms.IntegerField(max_value=19, min_value=0)
    comments = forms.CharField(max_length=100, empty_value="_")
