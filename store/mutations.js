export default {
  user_msg: (state, data) => {
    state.user = Object.assign({}, data);
  },
  login_msg: (state, data) => {
    state.login = Object.assign({}, data)
  },
  father_comments: (state, data) => {
    state.fatherComments = JSON.parse(JSON.stringify(data));
  },
  hot_article: (state, data) => {
    state.hotArticle = JSON.parse(JSON.stringify(data));
  },
  single_comment: (state, data) => {
    state.everyOne = Object.assign({}, data);
  },
  current_route: (state, data) => {
    state.current_route = data;
  }
}