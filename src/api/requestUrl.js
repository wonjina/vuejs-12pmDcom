
export const urls = {
  DOMAIN: 'http://api.12pm.com:9194',
  'restaurants': {
    path: '/api/restaurants',
    method: 'get',
    data: {
      name: null,
      page: 0,
      size: 7
    },
    description: ''
  },
  'restaurantInfo': {
    path: '/api/restaurants',
    method: 'get',
    description: ''
  },
  'reviews': {
    path: '/api/reviews/restaurant',
    method: 'get',
    data: {
      restaurantId: null,
      page: 0,
      size: 5
    },
    description: 'Get review List'
  },
  'newReviews': {
    path: '/api/reviews/restaurant',
    method: 'post',
    data: {
      comment: null,
      rating: null,
      memberId: null,
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
  },
  'logout': {
    path: '/logout',
    method: 'get'
  }
}
