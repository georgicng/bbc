import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import VeeValidate from 'vee-validate'
import HomeRoutes from './home'
import CategoriesRoutes from './categories'
import ProductsRoutes from './products'
import DetailsRoutes from './details'
import CartRoutes from './cart'
import CheckoutRoutes from './checkout'
import AboutRoutes from './about'
import ContactRoutes from './contact'
import ComplaintRoutes from './complaint'
import TermsRoutes from './terms'

Vue.use(Router)
Vue.use(VeeValidate)

export default new Router({
  routes: [
    HomeRoutes,
    CategoriesRoutes,
    ProductsRoutes,
    DetailsRoutes,
    CartRoutes,
    CheckoutRoutes,
    AboutRoutes,
    ContactRoutes,
    ComplaintRoutes,
    TermsRoutes,
  ]
})