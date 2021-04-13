<template>
  <v-app id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="!isLogin" to="/login">Login</router-link>
      <a class="logout" v-else @click="logout">Logout</a> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({ isLogin: (state) => state.user.isLogin }),
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .logout {
    text-decoration: underline;
  }
}
</style>
