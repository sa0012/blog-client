export default {
  user_msg: (state, data) => {
    state.user = Object.assign({}, data);
  }
}