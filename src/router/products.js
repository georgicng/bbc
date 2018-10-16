import Products from '@/pages/Products'

export default {
  path: '/products',
  name: 'Products',
  component: Products,
  props(route) {
    return  route.query || {}
  }
}