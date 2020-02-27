
export const urls = {
  'restaurantList': {
    path: '/api/restaurants',
    method: 'get',
    data: {
      category: null,
      name: null,
      restaurant_id: null
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
    data: {
      restaurantId: null,
      date: null,
      memberId: null,
      rating: null,
      id: null
    },
    description: 'Get review List'
  }
}
