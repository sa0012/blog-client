import {
  setSession,
  setLocal,
} from '~/common/mutils';
export default {
  USER_MSG: ({
    commit
  }, data) => {
    if (process.browser) setSession('user', data);
    commit('user_msg', data);
  },
  LOGIN_MSG: ({
    commit
  }, data) => {
    if (process.browser) setSession('login', data);
    commit('login_msg', data);
  },
  FATHER_COMMENTS: ({
    commit
  }, data) => {
    if (process.browser) setSession('fatherComments', data);
    commit('father_comments', data);
  },
  HOT_ARTICLE: ({
    commit
  }, data) => {
    if (process.browser) setSession('hotArticle', data);
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
    if (process.browser) setSession('currentRoute', data);
    commit('current_route', data)
  },
  BROWSER_HISTORY: ({
    commit
  }, data) => {
    if (process.browser) setLocal('browser_history', data);
    commit('browser_history', data);
  }
}
