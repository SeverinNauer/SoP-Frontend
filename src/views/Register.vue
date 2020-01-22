<template>
  <div class="root">
    <div>
      <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <InputText v-model="username" placeholder="Username" />
        </div>
      </div>

      <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-lock"></i>
          </span>
          <Password v-model="password" placeholder="Password" />
        </div>
      </div>
      <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-lock"></i>
          </span>
          <Password v-model="passwordConfirm" placeholder="Confirm Password" />
        </div>
      </div>
      <div class="topMargin">
        <Button
          label="Register"
          class="p-button-raised"
          v-on:click="onRegisterClicked"
        />
      </div>
      <div>
        <p>
          Already have an account?
          <router-link to="/login">Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { post, IResponse, getToastObj } from "../services/fetchservice";

interface IUserCreate {
  username: string;
  password: string;
}

@Component
export default class Register extends Vue {
  username = "";
  password = "";
  passwordConfirm = "";

  async onRegisterClicked() {
    if (this.password !== this.passwordConfirm) {
      this.$toast.add({
        severity: "error",
        detail: "Passwords don't match",
        life: 3000
      });
      return;
    }
    const response = await post<IUserCreate, string>(
      "Account/create",
      {
        username: this.username,
        password: this.password
      },
      false
    );
    this.$toast.add(getToastObj(response));
    if (response.type === "success") {
      this.$router.push("/login");
    }
  }
}
</script>

<style scoped>
.root {
  display: grid;
  place-items: center;
  height: 100vh;
}
.topMargin {
  margin-top: 5px;
}
</style>
