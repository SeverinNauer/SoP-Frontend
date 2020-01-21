<template>
  <Toolbar>
    <template slot="left" v-if="categoryIsVisible">
      <div class="moveBackCont">
        <Button icon="pi pi-angle-left" v-on:click="onGoBack" />
        <p class="lastElem">{{ lastElement }}</p>
      </div>
    </template>
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

<script lang="ts">
import { store } from "@/store/store";
import Component from "vue-class-component";
import Vue from "vue";

@Component({
  props: {
    isMobile: Boolean
  }
})
export default class AppBar extends Vue {
  mounted() {
    store.setToken(localStorage.getItem("jwt") || "");
    if (!store.state.token) {
      this.$router.push("/login");
    }
  }

  storedData = store.state;

  onLoginClick() {
    this.$router.push("/login");
  }
  onLogoutClick() {
    store.setToken("");
    this.$router.push("/login");
  }

  onGoBack() {
    if (store.state.selectedPassword) {
      store.state.selectedPassword = null;
    } else {
      store.state.selectedCategory = null;
    }
  }

  get lastElement() {
    if (store.state.selectedPassword) {
      return store.state.selectedPassword.title;
    }

    return store.state.selectedCategory
      ? store.state.selectedCategory.title
      : "";
  }

  get categoryIsVisible() {
    return !!store.state.selectedCategory && this.$props.isMobile;
  }
}
</script>

<style scoped>
.moveBackCont {
  display: flex;
  flex-direction: row;
  margin: 0px;
  max-height: 100%;
}

.lastElem {
  margin: auto 10px;
}
</style>
