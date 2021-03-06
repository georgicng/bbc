import Vue from 'vue';
import Router from 'vue-router';
import LoadScript from 'vue-plugin-load-script';
import VueImg from 'v-img';
import ErrorPage from 'vue-error-page';
import store from '../store';
import HomeRoutes from './home';
import CategoriesRoutes from './categories';
import ProductsRoutes from './products';
import DetailsRoutes from './details';
import CustomRoutes from './custom';
import CartRoutes from './cart';
import CheckoutRoutes from './checkout';
import AboutRoutes from './about';
import ContactRoutes from './contact';
import ComplaintRoutes from './complaint';
import FAQRoutes from './faq';
import TermsRoutes from './terms';
import SuccessRoutes from './success';

Vue.use(Router);
Vue.use(LoadScript);
Vue.use(VueImg);
window.eventBus = new Vue();
Vue.use(ErrorPage, { tagName: 'app-view', bus: 'eventBus' });

Vue.filter('slugify', (value) => {
  const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
  const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return value.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(p, c =>
        b.charAt(a.indexOf(c)))     // Replace special chars
    .replace(/&/g, '-and-')         // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');           // Trim - from end of text
});

//Vue.use(VueFormGenerator)
const router = new Router({
  routes: [
    HomeRoutes,
    CategoriesRoutes,
    ProductsRoutes,
    DetailsRoutes,
    CustomRoutes,
    CartRoutes,
    CheckoutRoutes,
    AboutRoutes,
    ContactRoutes,
    ComplaintRoutes,
    FAQRoutes,
    TermsRoutes,
    SuccessRoutes,
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  store.commit('toggleNav', false);
  store.commit('toggleCart', false);
  if (to.path == '/checkout' && store.state.order.cart.length == 0) {
    next('/cart');
  }
  next();
});

export default router;
