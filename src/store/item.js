import is from "@/service/item";

export default {
  state: {
    items: [
      {
        coordinates: [151.2918732, -33.695088999999996],
        name: "item1",
        description: "desc1",
      },
      {
        coordinates: [151.2958732, -33.69208999999996],
        name: "item2",
        description: "desc1",
      },
    ],
  },
  getters: {
    mappedItems: state => {
      console.log('getting....')
      return state.items.map(item => {
        return {
          position: {
            lng: item.coordinates[0],
            lat: item.coordinates[1],
            name: item.name,
            description: item.description,
          }
        }
      })
    }
  },
  mutations: {
    createItem(state, item) {
      state.items.push(item);
    },
    setItems(state, items) {
      state.items = [...items];
    },
    emptyItems(state) {
      state.items = [];
    },
    redisplay(state) {
      state.items = [
        {
          coordinates: [151.2918732, -33.695088999999996],
          name: "item1",
          description: "desc1",
        },
        {
          coordinates: [151.2958732, -33.69208999999996],
          name: "item2",
          description: "desc1",
        },
      ];
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
    getAllItems: async function ({ commit }) {
      const res = await is.getAll();
      const { code, data } = res;
      if (code == 1) {
        console.log(data)
        commit("setItems", data);
      }
    }
  }
};
