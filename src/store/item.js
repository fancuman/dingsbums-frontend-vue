import is from "@/service/item";

export default {
  state: {
    items: []
  },
  mutations: {
    createItem(state, item) {
      state.items.push(item);
    }
  },
  actions: {
    create: async function ({ commit }, item) {
      // 登录请求
      const res = await is.create(item);
      const { code } = res;
      if (code) {
        // 登录成功
        commit("createItem", item);
      }
      return res;
    },
    getAll: async function ({ commit }, item) { 
      
    }
  }
};
