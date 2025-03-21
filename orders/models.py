from django.db import models
from enum import Enum

class WaypointType(Enum):
    PICKUP = "Pickup"
    DELIVERY = "Delivery"

class Waypoint(models.Model):
    class Meta:
        ordering = ('-location',)

    WAYPOINT_TYPE_CHOICES = [
        (WaypointType.PICKUP.value, WaypointType.PICKUP.name),
        (WaypointType.DELIVERY.value, WaypointType.DELIVERY.name),
    ]
    waypointType = models.CharField(
        max_length=10,
        choices=WAYPOINT_TYPE_CHOICES,
        default=WaypointType.PICKUP.value,
    )
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.location

class Order(models.Model):
    class Meta:
        ordering = ('-date',)

    orderNumber = models.AutoField(primary_key=True)
    waypoints = models.ManyToManyField(Waypoint)
    customerName = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.orderNumber)