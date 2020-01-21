<template>
  <div class="appRoot">
    <AppBar class="header" />
    <CategoryDrawer class="drawer" v-if="categoriesAreVisible" />
    <PasswordDrawer v-if="passwordsAreVisible" />
    <PasswordView v-if="storedData.selectedPassword" />
  </div>
</template>

<script lang="ts">
import { store } from "@/store/store";
import AppBar from "@/components/AppBar.vue";
import CategoryDrawer from "@/components/CategoryDrawer.vue";
import PasswordDrawer from "@/components/PasswordDrawer.vue";
import PasswordView from "@/components/PasswordView.vue";
import { get } from "../services/fetchservice";
import { ICategory } from "@/Models/ICategory";
import { fetchCategories } from "@/services/categoryService";
import Vue from "vue";

export default Vue.extend({
  name: "home",
  components: {
    AppBar,
    CategoryDrawer,
    PasswordDrawer,
    PasswordView
  },
  mounted() {
    fetchCategories();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  data() {
    return {
      storedData: store.state,
      windowWidth: window.innerWidth
    };
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  computed: {
    categoriesAreVisible: function() {
      const small = this.windowWidth <= 800;
      if (!small) {
        return true;
      }
      if (store.state.selectedCategory === null) {
        return true;
      }
      return false;
    },
    passwordsAreVisible: function() {
      const small = this.windowWidth <= 800;
      if (!small) {
        return true;
      }
      if (store.state.selectedPassword === null) {
        return true;
      }
      return false;
    }
  }
});
</script>

<style scoped>
.appRoot {
  display: grid;
  height: 100vh;
  grid-template-rows: 50px auto;
  grid-template-columns: 250px 250px auto;
}

.header {
  grid-column: 1/4;
  grid-row: 1/2;
}

.drawer {
  grid-column: 1/2;
  grid-row: 2/3;
}

@media screen and (max-width: 800px) {
  .appRoot {
    display: grid;
    height: 100vh;
    grid-template-rows: 50px auto;
    grid-template-columns: 1fr;
  }
}
</style>
