import Products from '@/pages/Products'

export default {
  path: '/products',
  name: 'Products',
  component: Products,
  props: route => ({
    page: route.query.page || 1,
    filter: route.query.filter,
  }),
};
