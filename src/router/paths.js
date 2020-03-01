/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '',
    // Relative to /src/views
    view: 'Main'
  },
  {
    path: '/restaurantInfo',
    name: 'RestaurantInfo',
    view: 'RestaurantInfo',
    props: true
  },
  {
    path: '/typography',
    view: 'Typography'
  },
  {
    path: '/icons',
    view: 'Icons'
  },
  {
    path: '/search',
    name: 'SearchRestaurant',
    view: 'Search',
    props: true
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: 'Upgrade'
  },
  {
    path: '/login',
    name: 'Login',
    view: 'Login'
  }
]
