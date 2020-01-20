<template>
  <AppBar />
</template>

<script>
import { store } from "@/store/store";
import AppBar from "@/components/AppBar.vue";

export default {
  name: "home",
  components: {
    AppBar
  },
  mounted() {
    const token = localStorage.getItem("jwt");
    store.setToken(token);
    if (!token) {
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
    }
  }
};
</script>
