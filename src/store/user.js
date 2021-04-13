import us from "@/service/user";

export default {
  state: {
    isLogin: localStorage.getItem("token") ? true : false
  },
  mutations: {
    setLoginState(state, b) {
      state.isLogin = b;
    }
  },
  actions: {
    login: async function ({ commit }, user) {
      // 登录请求
      const res = await us.login(user);
      const { code, token } = res;
      if (code) {
        // 登录成功
        commit("setLoginState", true);
        localStorage.setItem("token", token);
      }
      return res;
    },
    logout({ commit }) {
      // 清缓存
      localStorage.removeItem("token");
      // 重置状态
      commit("setLoginState", false);
    },
    register: async (context, user) => {
      const { code } = await us.register(user);
      return code;
    }
  }
};
