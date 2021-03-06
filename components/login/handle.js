import {
  setSession,
  removeSession
} from '~/common/mutils';
import SqTabs from "~/components/tabs/src";
import SqTabpane from "~/components/tabpane/src";
export default {
  async asyncData() {},
  computed: {
    loginMsg() {
      return this.$store.state.login
    }
  },
  data() {
    return {
      showLogin: false,
      loginForm: {
        user_id: '',
        user_pwd: '',
        code: '',
        code_token: ''
      },
      registerForm: {
        user_id: '',
        user_pwd: '',
        re_user_pwd: '',
        code: '',
        code_token: ''
      },
      img_base64: '',
      rules: {
        user_id: [{
          required: true,
          message: '请输入用户账号',
          trigger: 'blur'
        }, ],
        user_pwd: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        code: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }, ],
      },
      registerRules: {
        user_id: [{
          required: true,
          message: '请输入用户账号',
          trigger: 'blur'
        }, ],
        user_pwd: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        re_user_pwd: [{
          required: true,
          message: '请确认密码',
          trigger: 'blur'
        }],
        code: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }, ],
      }
    }
  },
  watch: {
    loginMsg: {
      handler(newVal, oldVal) {
        if (newVal && newVal.showLogin) {
          this.get_check_code();
        }
      },
      deep: true
    }
  },
  methods: {
    close() {
      // this.$emit("update:showLogin", false);
      this.loginMsg.showLogin = false;
      this.$store.dispatch('LOGIN_MSG', this.loginMsg);
      removeSession('user');
    },
    githubLogin() {
      this.$axios.$get('/api/github/client').then(res => {
        this.$store.dispatch('CURRENT_ROUTE', this.$route.path)
        window.location.href = res;
        window.localStorage.setItem('GITHUB_LOGIN_REDIRECT_URL', `${this.$route.path}?comment=new`);
      })
      // window.location.href = 'https://github.com/login/oauth/authorize?client_id=1f08860dca3e7b4499a5&redirect_uri=http://192.168.31.230:8080/login&scope=User';

    },
    async submitForm() {
      if (!this.loginForm.user_id) {
        return false;
      } else if (!this.loginForm.user_pwd) {
        return false;
      } else if (!this.loginForm.code) {
        return false;
      }
      this.$axios.$post('/api/user/login', this.loginForm).then(res => {
        // if (res.code == 200) {
          res.isLogin = true;
          this.$store.dispatch('USER_MSG', res);
          this.$message.success('登陆成功')
          this.loginMsg.showLogin = false;
          this.$store.dispatch('LOGIN_MSG', this.loginMsg)
        // } else {
        //   this.get_check_code()
        // }
      })
    },
    async register() {
      if (this.registerForm.user_id == "" || this.registerForm.user_pwd == "") {
        alert('注册失败，请填写完整表单');
        return;
      }
      if (this.registerForm.user_pwd.length < 5) {
        alert("注册失败，密码最少为5位");
        return;
      }

      if (this.registerForm.user_pwd != this.registerForm.re_user_pwd) {
        alert('注册失败，2次密码输入不一致!');
        return;
      }

      this.$axios.$post('/api/user/register', this.registerForm).then(res => {
        if (res.code == 200) {
          res.isLogin = true;
          this.$store.dispatch('USER_MSG', res);
          this.$message.success('注册成功')
          // this.$emit("update:showLogin", false);
          this.loginMsg.showLogin = false;
          this.$store.dispatch('LOGIN_MSG', this.loginMsg)
        } else {
          this.get_check_code();
        }
      })
    },
    async get_check_code() {
      this.$axios.$get('/api/other/checkcode').then(res => {
        this.img_base64 = res.img
        this.loginForm.code_token = res.token
        this.registerForm.code_token = res.token
      })
    }
  },
  created() {
  },
  components: {
    SqTabs,
    SqTabpane
  },
}
