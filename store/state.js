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

let fatherComments = [{
  _id: '',
  article_id: '',
  content: "",
  user: {
    user_id: "",
    user_name: "",
    user_avatar: ""
  },
  create_time: "",
  edit_time: "",
}]
try {
  fatherComments = JSON.parse(getSession('fatherComments')) || fatherComments
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
      user_avatar: ""
    },
    create_time: "",
    edit_time: "",
    likes: 0,
    isLike: false
  }
}
export default {
  user,
  login,
  fatherComments,
  everyOne: singleComment
}
