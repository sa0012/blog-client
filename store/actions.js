import $http from '~/plugins/axios';
import {
  setSession,
} from '~/common/mutils';
export default {
  USER_MSG: ({ commit }, data) => {
    setSession('user', data);
    commit('user_msg', data);
  }
}