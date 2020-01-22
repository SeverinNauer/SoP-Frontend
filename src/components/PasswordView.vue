<template>
  <div class="root p-grid">
    <div class="p-col-12 p-md-12 p-lg-10 p-xl-6">
      <h2 class="title" v-if="storedData.passwordIsNew">New Password</h2>
      <div class="inputCont">
        <CustomInput
          label="Title"
          id="title"
          v-model="password.title"
          class="oneInput"
          :disabled="!editMode"
        />
        <CustomInput
          label="Username"
          id="username"
          v-model="password.username"
          class="oneInput"
          :disabled="!editMode"
        />
        <CustomInput
          label="Password"
          id="password"
          v-model="password.password"
          class="oneInput"
          :disabled="!editMode"
        />
        <CustomInput
          label="Url"
          id="url"
          v-model="password.url"
          class="oneInput"
          :disabled="!editMode"
        />
        <CustomTextArea
          label="Description"
          v-model="password.description"
          class="area"
          :disabled="!editMode"
        />
      </div>
      <Button
        v-if="editMode && !storedData.passwordIsNew"
        label="Delete"
        v-on:click="deletePw"
        class="deleteButton p-button-danger"
      />
      <Button
        v-if="!editMode"
        label="Edit"
        v-on:click="() => (editMode = true)"
        class="saveButton"
      />
      <Button v-else label="Save" v-on:click="save" class="saveButton" />
    </div>
  </div>
</template>

<script lang="ts">
import { store } from "@/store/store";
import CustomInput from "@/components/form/CustomInput.vue";
import CustomTextArea from "@/components/form/CustomTextArea.vue";
import { IPasswordEntry } from "@/Models/IPasswordEntry";
import Vue from "vue";
import Component from "vue-class-component";
import { post, getToastObj, httpDelete } from "@/services/fetchservice";

interface IPasswordEntryDto {
  id: number;
  username: string;
  password: string;
  title: string;
  description: string;
  url: string;
  expirationDate: number;
  categoryId: number;
}

const createDto = (pw: IPasswordEntry): IPasswordEntryDto => {
  return {
    id: pw.id,
    username: pw.username,
    password: pw.password,
    title: pw.title,
    description: pw.description,
    url: pw.url,
    expirationDate: pw.expirationDate ? pw.expirationDate.valueOf() : 0,
    categoryId: store.state.selectedCategory
      ? store.state.selectedCategory.id
      : -1
  };
};

@Component({
  components: {
    CustomInput: CustomInput,
    CustomTextArea: CustomTextArea
  }
})
export default class PasswordView extends Vue {
  storedData = store.state;
  editMode = this.storedData.passwordIsNew;

  mounted() {}

  async addNewPassword() {
    if (this.password && store.state.selectedCategory) {
      return await post<IPasswordEntryDto, string>(
        "PasswordEntry/create",
        createDto(this.password),
        true
      );
    }
  }
  async save() {
    if (this.storedData.passwordIsNew) {
      const res = await this.addNewPassword();
      if (res) {
        this.$toast.add(getToastObj(res));
        const updateRes = await store.updateCategory(
          this.storedData.selectedCategory!.id
        );
        if (updateRes) {
          if (updateRes.type !== "success") {
            this.$toast.add(getToastObj(updateRes as any));
          }
        }
      }
    }
    store.state.selectedPassword = this.password;
  }

  async deletePw() {
    if (!this.storedData.passwordIsNew && this.password) {
      const res = await httpDelete<string>(
        "passwordEntry/delete?passwordEntryId=" + this.password.id,
        true
      );
      this.$toast.add(getToastObj(res));
      if (res.type === "success") {
        store.updateCategory(this.storedData.selectedCategory!.id, false);
      }
    }
  }
  get password() {
    return this.storedData.selectedPassword;
  }
}
</script>

<style scoped>
.title {
  text-align: left;
}
.root {
  margin: 0px;
}
.inputCont {
  margin: 0px;
}

.oneInput {
  margin-top: 20px;
}

.saveButton {
  margin-top: 10px;
  float: right;
}

.area {
  margin-top: 20px;
}

.deleteButton {
  float: left;
  margin-top: 10px;
}
</style>
