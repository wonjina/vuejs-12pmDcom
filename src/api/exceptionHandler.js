import router from '../router'
import store from '@/store'
import swal from 'sweetalert'

const UNAUTHORIZED = 401
const NOT_FOUND = 404
const FOUND = 302
const BAD_REQUEST = 400

const onUnauthrorized = () => {
  swal({
    title: '로그인이 필요합니다.',
    icon: 'error'
  })
    .then(() => {
      store.state.reviewModalFlage = false
    })
  localStorage.setItem('isRequestedLogin', false)
  store.state.userInfo = null
}
const onRedirect = (redirectUri) => {
  window.location.href = redirectUri
}
const onNotFound = () => { router.push({ name: 'main' }) }

const onBadRequest = () => {
  swal({
    title: '잘못된 입력값입니다.',
    icon: 'error'
  })
    .then(() => {
      store.state.reviewModalFlage = false
    })
}

export const exceptionHandler = {
  catch (result) {
    const status = result.response.data.code
    console.log(result)
    if (status === UNAUTHORIZED) {
      return onUnauthrorized()
    } else if (status === FOUND) {
      return onRedirect(result.response.data.message)
    } else if (status === NOT_FOUND) {
      return onNotFound()
    } else if (status === BAD_REQUEST) {
      return onBadRequest()
    } else {
      console.log('unexception handle : ')
      console.log(result)
    }
  }
}
