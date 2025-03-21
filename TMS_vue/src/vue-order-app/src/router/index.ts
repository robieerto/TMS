import { createRouter, createWebHistory } from 'vue-router'
import Orders from '@/pages/Orders.vue'
import CreateOrder from '@/pages/CreateOrder.vue'

const routes = [
  {
    path: '/',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/create-order',
    name: 'CreateOrder',
    component: CreateOrder
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router