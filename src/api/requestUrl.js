
export const urls = {
  'restaurants': {
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
      restaurantId: null
    },
    description: 'Get review List'
  },
  'userRecord': {
    method: 'get',
    data: {
      localDateTime: null
    },
    description: 'Get user record List'
  },
  'recruitBoard': {
    path: '/api/boards/recruitment',
    method: 'get',
    data: {
      localDateTime: null
    },
    description: 'Get recruitment List'
  },
  'newRecruitment': {
    path: '/api/boards/recruitment',
    method: 'post',
    description: 'Post new recruitment'
  },
  'hiworksLogin': {
    path: 'https://api.hiworks.com/open/auth/authform?client_id=ymyevwpjp6xuza6cptlamb17w6u3j0f15e327689372af8.44470726.open.apps&access_type=offline',
    method: ''
  },
  'hiworksUser': {
    path: '/hiworks/user',
    method: 'get'
  }
}
