import $http from '~/plugins/axios';
import {
  setSession,
  removeSession
} from '~/common/mutils';
export default {
  USER_MSG: ({ commit }, data) => {
    commit('user_msg', data);
  }
}