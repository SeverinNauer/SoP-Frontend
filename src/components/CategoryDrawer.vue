<template>
  <div class="sidebar">
    <div>
      <h2 class="drawerTitle">Categories</h2>
      <Listbox
        class="listbox"
        :options="storedData.categories"
        optionLabel="title"
        v-model="storedData.selectedCategory"
        data-key="id"
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
      <CustomInput label="Title" v-model="dialogItem.title" id="newTitle" />
      <CustomTextArea v-model="dialogItem.description" label="Description" />
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
import { post, getToastObj, httpDelete, put } from "../services/fetchservice";
import { fetchCategories } from "../services/categoryService";
import Vue from "vue";
import Component from "vue-class-component";
import { ICategory } from "../Models/ICategory";

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

  dialogItem = {} as ICategory;
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
        icon: "pi pi-fw pi-trash",
        command: this.onDelete
      }
    ];
  }

  onOpenDialog() {
    this.dialogOpen = true;
  }

  async createNew() {
    return await post<ICategoryCreate, string>(
      "Category/create",
      {
        categoryId: 0,
        title: this.dialogItem.title,
        description: this.dialogItem.title
      },
      true
    );
  }

  async saveItem() {
    return await put<ICategoryCreate, string>(
      "Category/update",
      {
        categoryId: this.dialogItem.id,
        title: this.dialogItem.title,
        description: this.dialogItem.title
      },
      true
    );
  }

  async onDialogClose(result: boolean) {
    if (result) {
      let response = null;
      if (this.dialogItem.id) {
        response = await this.saveItem();
      } else {
        response = await this.createNew();
      }
      if (response) {
        this.dialogItem = {} as ICategory;
        if (response.type === "success") {
          fetchCategories();
        }
        this.$toast.add(getToastObj(response));
      }
    }
    this.dialogOpen = false;
  }
  onItemClick(event: any) {
    (this.$refs.menu as any).show(event);
    this.contextItem = Number(event.target.id);
  }
  onEdit() {
    const listItem = this.storedData.categories.find(
      cat => cat.id === this.contextItem
    );
    if (listItem) {
      this.dialogItem = { ...listItem };
      this.dialogOpen = true;
    }
  }
  async onDelete() {
    if (this.contextItem > 0) {
      const res = await httpDelete<string>(
        "Category/delete?categoryId=" + this.contextItem,
        true
      );
      if (res.type === "success") {
        fetchCategories();
      }
      this.$toast.add(getToastObj(res));
    }
  }
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
