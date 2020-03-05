/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '',
    name: 'main',
    view: 'Main'
  },
  {
    path: '/restaurantInfo',
    name: 'RestaurantInfo',
    view: 'RestaurantInfo',
    props: true
  },
  {
    path: '/search',
    name: 'SearchRestaurant',
    view: 'Search',
    props: true
  }
]
