from PIL import Image
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .ai.detection import get_prediction

class PredictionView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            assert 'image' in request.data, ('You need to pass an image file with api call')
            prediction = get_prediction(request.data['image'], 'keras_model.h5')
            return Response({'prediction': prediction})
        except AssertionError as e:
            return Response({'error': str(e)}, status = status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)
