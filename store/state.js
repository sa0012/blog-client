import { getSession } from '~/common/mutils';
const user = JSON.parse(getSession('user')) || {
  user_id: '',
  avatar: '',
  _id: '',
  token: '',
  user_name: '',
  isLogin: false
}

export default {
  user
}