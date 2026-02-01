import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import CollectionsView from '../views/CollectionsView.vue'
import ReturnPolicyView from '../views/ReturnPolicyView.vue'
import RefundsView from '../views/RefundsView.vue'
import ProductView from '../views/ProductView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import ShippingPolicyView from '../views/ShippingPolicyView.vue'
import TermsOfSaleView from '../views/TermsOfSaleView.vue'
import WhomIfastforView from '../views/WhomIfastforView.vue'
import ChristianJournalsView from '../views/ChristianJournalsView.vue'
import WhomIStudyforView from '../views/WhomIStudyforView.vue'
import WhomThyProfessionCallsforView from '../views/WhomThyProfessionCallsforView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/collections', name: 'collections', component: CollectionsView },
    { path: '/product/:id', name: 'product', component: ProductView },
    { path: '/return-policy', name: 'return-policy', component: ReturnPolicyView },
    { path: '/refunds', name: 'refunds', component: RefundsView },
    { path: '/privacy-policy', name: 'privacy-policy', component: PrivacyPolicyView },
    { path: '/shipping-policy', name: 'shipping-policy', component: ShippingPolicyView },
    { path: '/terms-of-sale', name: 'terms-of-sale', component: TermsOfSaleView },
    { path: '/christian-journals', name: 'christian-journals', component: ChristianJournalsView },
    { path: '/WhomIfastfor', name: 'whom-ifastfor', component: WhomIfastforView },
    { path: '/WhomIStudyfor', name: 'whom-studyfor', component: WhomIStudyforView },
    { path: '/WhomThyProfessionCallsfor', name: 'whom-profession', component: WhomThyProfessionCallsforView }
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

