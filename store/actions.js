import $http from '~/plugins/axios';
import {
  setSession,
} from '~/common/mutils';
export default {
  USER_MSG: ({ commit }, data) => {
    setSession('user', data);
    commit('user_msg', data);
  },
  LOGIN_MSG: ({ commit }, data) => {
    setSession('login', data);
    commit('login_msg', data);
  },
  FATHER_COMMENTS: ({ commit }, data) => {
    setSession('fatherComments');
    commit('father_comments', data);
  }
}