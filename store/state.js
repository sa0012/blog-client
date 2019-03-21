// import {
//   getSession,
//   getLocal
// } from '~/common/mutils';
let user = {
  user_id: '',
  avatar: '',
  _id: '',
  token: '',
  address: null,
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
    address: null,
    isLike: false
  },
  isWhoLike: 'ME',
  reply_like: false,
  create_time: "",
  edit_time: "",
  likes: 0
}]

let route = '/'

const hotArticle = [{
  "user": {
    "user_name": "",
    "user_avatar": "",
    "address": null,
  },
  "tags": [],
  "article": "",
  "draft": "",
  "likes": 0,
  "browser_count": 0,
  "comments_count": 0,
  "_id": "",
  "user_id": "",
  "category": "",
  "title": "",
  "desc": "",
  "author": "",
  "create_time": "",
  "edit_time": "",
  "__v": 0
}, ];

let bsHistory = {
  prev: {
    title: '',
    id: ''
  },
  next: {
    title: '',
    id: ''
  }
};

// try {
//   user = JSON.parse(getSession('user')) || user;
//   fatherComments = JSON.parse(getSession('fatherComments')) || fatherComments
//   route = getSession('currentRoute') || route
//   hotArticle = JSON.parse(getSession('hotArticle')) || hotArticle
//   bsHistory = JSON.parse(getLocal('browser_history')) || bsHistory
// } catch (e) {}


const login = {
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
      address: null,
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
  hotArticle,
  everyOne: singleComment,
  currentRoute: route,
  browserHistory: bsHistory
}
