<template>
  <div class="sidebar">
    <Listbox
      class="listbox"
      :options="storedData.categories"
      optionLabel="title"
      v-model="storedData.selectedCategory"
    />
    <Button icon="pi pi-plus" class="addCatButton" v-on:click="onOpenDialog" />
    <Dialog
      header="Add Category"
      :visible.sync="dialogOpen"
      :modal="true"
      :closable="false"
      class="addCatDialog"
    >
      <CustomInput label="Title" v-model="newTitle" id="newTitle" />
      <CustomTextArea v-model="newDescription" label="Description" />
      <template #footer>
        <Button label="Add" v-on:click="onDialogClose(true)" />
        <Button
          label="Cancel"
          v-on:click="onDialogClose(false)"
          class="p-button-secondary"
        />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { store } from "@/store/store";
import CustomInput from "@/components/form/CustomInput.vue";
import CustomTextArea from "@/components/form/CustomTextArea.vue";
import { post } from "../services/fetchservice";
import { fetchCategories } from "../services/categoryService";
import Vue from "vue";

interface ICategoryCreate {
  categoryId: number;
  title: string;
  description: string;
}

export default Vue.extend({
  name: "CategoryDrawer",
  components: { CustomInput, CustomTextArea },
  data() {
    return {
      storedData: store.state,
      dialogOpen: false,
      newTitle: "",
      newDescription: ""
    };
  },
  methods: {
    onOpenDialog() {
      this.dialogOpen = true;
    },
    onDialogClose: async function(result: boolean) {
      if (result) {
        const response = await post<ICategoryCreate, string>(
          "Category/create",
          {
            categoryId: 0,
            title: this.newTitle,
            description: this.newDescription
          },
          true
        );
        this.newDescription = "";
        this.newTitle = "";
        if (response.type === "success") {
          fetchCategories();
        }
      }
      this.dialogOpen = false;
    }
  }
});
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

.addCatButton {
  margin-left: auto;
  margin-right: 10px;
  margin-bottom: 10px;
}

.addCatDialog {
  width: 250px;
}

.textAreaLabel {
  display: inline-block;
}
</style>
