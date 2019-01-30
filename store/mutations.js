export default {
  user_msg: (state, data) => {
    state.user = Object.assign({}, data);
  },
  login_msg: (state, data) => {
    state.login = Object.assign({}, data)
  }
}