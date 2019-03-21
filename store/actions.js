// import $http from '~/plugins/axios';
// import {
//   setSession,
//   setLocal,
//   getLocal
// } from '~/common/mutils';
export default {
  USER_MSG: ({ commit }, data) => {
    setSession('user', data);
    commit('user_msg', data);
  },
  LOGIN_MSG: ({ commit }, data) => {
    // setSession('login', data);
    commit('login_msg', data);
  },
  FATHER_COMMENTS: ({ commit }, data) => {
    // setSession('fatherComments', data);
    commit('father_comments', data);
  },
  HOT_ARTICLE: ({ commit }, data) => {
    // setSession('hotArticle', data);
    commit('hot_article', data);
  },
  SINGLE_COMMENT: ({ commit }, data) => {
    commit('single_comment', data);
  },
  CURRENT_ROUTE: ({ commit }, data) => {
    // setSession('currentRoute', data);
    commit('current_route', data)
  },
  BROWSER_HISTORY: ({ commit }, data) => {
    // setLocal('browser_history', data);
    commit('browser_history', data);
  }
}