from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Order, Waypoint
from .serializers import OrderSerializer, WaypointSerializer

class OrdersList(APIView):
    def get(self, request):
        orders = Order.objects.prefetch_related('waypoints').all()
        serializer = OrderSerializer(orders, many=True)
        for order in serializer.data:
            order['waypoints'] = [
                {
                    'location': waypoint.location,
                    'waypointType': waypoint.waypointType
                }
                for waypoint in Order.objects.get(orderNumber=order['orderNumber']).waypoints.all()
            ]
        return Response(serializer.data)

class WaypointsList(APIView):
    def get(self, request):
        waypoints = Waypoint.objects.all()
        serializer = WaypointSerializer(waypoints, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def createOrder(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['POST'])
def createWaypoint(request):
    serializer = WaypointSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)