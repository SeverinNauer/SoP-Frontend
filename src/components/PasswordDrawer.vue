<template>
  <div class="sidebar">
    <Listbox
      v-if="storedData.selectedCategory"
      class="listbox"
      :options="storedData.selectedCategory.passwords"
      optionLabel="title"
      v-model="storedData.selectedPassword"
    />
    <Button
      v-if="storedData.selectedCategory"
      icon="pi pi-plus"
      class="addPasswordButton"
      v-on:click="onAddPassword"
    />
  </div>
</template>

<script lang="ts">
import { store } from "@/store/store";
import { Password } from "primevue/password";
import { IPasswordEntry } from "@/Models/IPasswordEntry.ts";

export default {
  name: "PasswordDrawer",
  components: {},
  data() {
    return {
      storedData: store.state
    };
  },
  methods: {
    onAddPassword: function() {
      store.setSelectedPassword({} as IPasswordEntry, true);
    }
  }
};
</script>

<style scoped>
.sidebar {
  border-right: solid rgba(0, 0, 0, 0.3) 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.listbox {
  border-style: none;
  width: 100%;
  text-align: left;
}
.addPasswordButton {
  margin-left: auto;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
