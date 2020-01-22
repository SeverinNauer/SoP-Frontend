<template>
  <div class="sidebar">
    <div>
      <h2 class="drawerTitle">Categories</h2>
      <Listbox
        class="listbox"
        :options="storedData.categories"
        optionLabel="title"
        v-model="storedData.selectedCategory"
      >
        <template #option="cat">
          <div @contextmenu="onItemClick" :id="cat.option.id">
            {{ cat.option.title }}
          </div>
        </template>
      </Listbox>
    </div>
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
    <ContextMenu class="contextMenu" ref="menu" :model="items" />
  </div>
</template>

<script lang="ts">
import { store } from "@/store/store";
import CustomInput from "@/components/form/CustomInput.vue";
import CustomTextArea from "@/components/form/CustomTextArea.vue";
import { post } from "../services/fetchservice";
import { fetchCategories } from "../services/categoryService";
import Vue from "vue";
import Component from "vue-class-component";

interface ICategoryCreate {
  categoryId: number;
  title: string;
  description: string;
}

@Component({
  components: {
    CustomInput: CustomInput,
    CustomTextArea: CustomTextArea
  }
})
export default class CategoryDrawer extends Vue {
  storedData = store.state;
  dialogOpen = false;
  newTitle = "";
  newDescription = "";
  contextItem = -1;
  get items() {
    return [
      {
        label: "Edit",
        icon: "pi pi-pencil",
        command: this.onEdit
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-trash"
      }
    ];
  }

  onOpenDialog() {
    this.dialogOpen = true;
  }
  async onDialogClose(result: boolean) {
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
  onItemClick(event: any) {
    (this.$refs.menu as any).show(event);
    this.contextItem = Number(event.target.id);
  }
  onEdit() {}
}
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

.drawerTitle {
  text-align: left;
  margin-left: 12px;
}

.addCatDialog {
  width: 250px;
}

.textAreaLabel {
  display: inline-block;
}

.contextMenu {
  text-align: left;
}
</style>
