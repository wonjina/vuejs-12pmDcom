
export const urls = {
  'restaurantList': {
    path: '/api/restaurants',
    method: 'get',
    data: {
      type: Object,
      default: null
    },
    description: ''
  },
  'categories': {
    path: '/api/restaurants/categories',
    method: 'get',
    description: 'Get catogories List'
  },
  'reviews': {
    path: '/api/reviews/restaurant',
    method: 'get',
    description: 'Get review List'
  }
}
