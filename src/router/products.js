import Products from '@/pages/Products';

export default {
  path: '/products',
  name: 'Products',
  component: Products,
  props: (route) => {
    let page = 1;
    let category = 0;

    if (route.query.page) {
      page = parseInt(route.query.page);
    }

    if (route.query.category) {
      category = parseInt(route.query.category);
    }

    return { page, category };
  },
};
