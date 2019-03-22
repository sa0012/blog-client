export default {
  USER_MSG: ({
    commit
  }, data) => {
    setSession('user', data);
    commit('user_msg', data);
  },
  LOGIN_MSG: ({
    commit
  }, data) => {
    commit('login_msg', data);
  },
  FATHER_COMMENTS: ({
    commit
  }, data) => {
    commit('father_comments', data);
  },
  HOT_ARTICLE: ({
    commit
  }, data) => {
    commit('hot_article', data);
  },
  SINGLE_COMMENT: ({
    commit
  }, data) => {
    commit('single_comment', data);
  },
  CURRENT_ROUTE: ({
    commit
  }, data) => {
    commit('current_route', data)
  },
  BROWSER_HISTORY: ({
    commit
  }, data) => {
    commit('browser_history', data);
  }
}
