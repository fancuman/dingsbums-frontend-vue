// intercept request and response
const axios = require('axios')

export default function(vm){
    // intercept request
    axios.interceptors.request.use(config => {
        // get token
        const token = localStorage.getItem('token')
        console.log('token:',token)
        if (token) { // add token header
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    })

    // intercept response
    // parameter1 is for success response
    // parameter2 is for error response
    axios.interceptors.response.use(null, err => {
        if (err.response.status === 401) { // 没有登录或者令牌过期
          // 清空vuex和localstorage
          vm.$store.dispatch("logout");
          // 跳转login
          vm.$router.push("/login");
        }
        return Promise.reject(err);
      });
}