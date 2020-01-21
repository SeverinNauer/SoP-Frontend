<template>
  <Toolbar>
    <template slot="right">
      <Button
        v-if="storedData.token"
        label="Logout"
        style="margin-right: .25em"
        v-on:click="onLogoutClick"
      />
      <Button
        v-else
        label="Login"
        class="p-button-success"
        v-on:click="onLoginClick"
      />
    </template>
  </Toolbar>
</template>

<script>
import { store } from "@/store/store";

export default {
  name: "AppBar",
  components: {},
  mounted() {
    store.setToken(localStorage.getItem("jwt") || "");
    if (!store.state.token) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      storedData: store.state
    };
  },
  methods: {
    onLoginClick() {
      this.$router.push("/login");
    },
    onLogoutClick() {
      store.setToken("");
      this.$router.push("/login");
    }
  }
};
</script>
