import {
  getSession
} from '~/common/mutils';
let user =  {
  user_id: '',
  avatar: '',
  _id: '',
  token: '',
  user_name: '',
  isLogin: false
}

let fatherComments = [{
  _id: '',
  article_id: '',
  content: "",
  user: {
    user_id: "",
    user_name: "",
    user_avatar: "",
    isLike: false
  },
  isWhoLike: 'ME',
  reply_like: false,
  create_time: "",
  edit_time: "",
  likes: 0
}]

let route = '/'
try {
  user = JSON.parse(getSession('user')) || user;
  fatherComments = JSON.parse(getSession('fatherComments')) || fatherComments
  route = getSession('currentRoute') || route
} catch (e) {}


const login = JSON.parse(getSession('login')) || {
  showLogin: false,
  loginType: "login",
}

const singleComment = {
  type: Object,
  default: {
    _id: "",
    article_id: "",
    content: "",
    user: {
      user_id: "",
      user_name: "",
      user_avatar: "",
      isLike: false
    },
    create_time: "",
    edit_time: "",
    likes: 0,
  }
}
export default {
  user,
  login,
  fatherComments,
  everyOne: singleComment,
  currentRoute: route
}
