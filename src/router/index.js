import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import CollectionsView from '../views/CollectionsView.vue'
import ReturnPolicyView from '../views/ReturnPolicyView.vue'
import RefundsView from '../views/RefundsView.vue'
import ProductView from '../views/ProductView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/collections', name: 'collections', component: CollectionsView },
    { path: '/product/:id', name: 'product', component: ProductView },
    { path: '/return-policy', name: 'return-policy', component: ReturnPolicyView },
    { path: '/refunds', name: 'refunds', component: RefundsView }
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

