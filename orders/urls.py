from django.urls import path

from .views import OrdersList, WaypointsList, createOrder, createWaypoint

urlpatterns = [
    path('orders/', OrdersList.as_view()),
    path('waypoints/', WaypointsList.as_view()),
    path('createOrder/', createOrder),
    path('createWaypoint/', createWaypoint),
]