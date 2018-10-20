import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// import Hello from '@/components/Hello'
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
//Vue.use(VueFormGenerator)
const router = new Router({
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
});

router.beforeEach((to, from, next) => {
  store.commit('toggleNav', false);
  store.commit('toggleCart', false);
  if(to.path == '/checkout' && store.state.order.cart.length == 0){
    next('/cart');
  }
  next();
});

export default router;
