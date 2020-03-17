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
    path: '/login',
    name: 'login',
    view: 'Login'
  },
  {
    path: '/restaurantInfo/:id',
    name: 'RestaurantInfo',
    view: 'RestaurantInfo',
    props: true
  },
  {
    path: '/recruitBoard',
    name: 'RecruitBoard',
    view: 'RecruitBoard'
  },
  {
    path: '/recruitBoardInfo/:id',
    name: 'RecruitBoardInfo',
    view: 'RecruitBoardInfo'
  },
  {
    path: '/userRecord',
    name: 'UserRecord',
    view: 'UserRecord'
  },
  {
    path: '/search',
    name: 'SearchRestaurant',
    view: 'Search',
    props: true
  }
]
