import {
  getSession
} from '~/common/mutils';
const user = JSON.parse(getSession('user')) || {
  user_id: '',
  avatar: '',
  _id: '',
  token: '',
  user_name: '',
  isLogin: false
}

const login = JSON.parse(getSession('login')) || {
  showLogin: false,
  loginType: "login",
}
export default {
  user,
  login
}
