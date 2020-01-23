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
        <div class="p-inputgroup">
          <CustomInput
            label="Password"
            id="password"
            v-model="password.password"
            class="oneInput"
            :disabled="!editMode"
            type="password"
            inputId="passwordInput"
          />
          <Button icon="pi pi-copy" class="copyButton" v-on:click="copyPasswordToClipboard" />
        </div>

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
        class="editButton"
      />
      <div v-else class="buttonCont">
        <Button
          v-if="editMode"
          label="Cancel"
          class="p-button-secondary cancelButton"
          v-on:click="() => (editMode = false)"
        />
        <Button label="Save" v-on:click="save" />
      </div>
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
import { post, getToastObj, httpDelete, put } from "@/services/fetchservice";

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

const removeSelection = () => {
  if (window.getSelection && window.getSelection()) {
    if (window.getSelection()!.empty) {
      // Chrome
      window.getSelection()!.empty();
    } else if (window.getSelection()!.removeAllRanges) {
      // Firefox
      window.getSelection()!.removeAllRanges();
    }
  }
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

  mounted() {

  }

  copyPasswordToClipboard() {
    let passwordInput = document.getElementById("passwordInput");
    if (passwordInput) {
      passwordInput.removeAttribute("disabled");
      passwordInput.setAttribute("type", "text");
      (passwordInput as HTMLInputElement).select();
      (passwordInput as HTMLInputElement).setSelectionRange(0, 99999); //For mobile devices/;

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        this.$toast.add({
          severity: "info",
          summary: "Info",
          detail: "copied password to clipboard",
          life: 5000
        });
      } catch (err) {
        this.$toast.add({
          severity: "error",
          summary: "error",
          detail: "copy failed",
          life: 5000
        });
      }
      removeSelection();
      (passwordInput as HTMLInputElement).setSelectionRange(0, 0);
      passwordInput.blur();
      passwordInput.setAttribute("disabled", "disabled");
      passwordInput.setAttribute("type", "password");
    }
  }

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
    let res = null;
    if (this.storedData.passwordIsNew) {
      res = await this.addNewPassword();
    } else {
      if (this.password) {
        res = await put<IPasswordEntryDto, string>(
          "PasswordEntry/update",
          createDto(this.password),
          true
        );
      }
    }
    if (res) {
      this.$toast.add(getToastObj(res));
      const pwId = this.password ? this.password.id : -1;
      const updateRes = await store.updateCategory(
        this.storedData.selectedCategory!.id,
        store.state.passwordIsNew
      );
      console.log(store.state.selectedCategory);
      if (updateRes) {
        if (updateRes.type !== "success") {
          this.$toast.add(getToastObj(updateRes as any));
        } else {
          store.state.selectedPassword =
            store.state.selectedCategory!.passwords.find(
              pw => (pw.id = pwId)
            ) || null;
        }
      }
    }
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

.buttonCont {
  margin-top: 10px;
  float: right;
}

.editButton {
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

.cancelButton {
  margin-right: 10px;
}

.copyButton {
  margin-top: auto;
}

#password {
  width: 100%;
}
</style>
