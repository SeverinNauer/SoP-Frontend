<template>
  <div class="root">
    <div>
      <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <InputText placeholder="Username" v-model="username" />
        </div>
      </div>

      <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-lock"></i>
          </span>
          <Password
            v-model="password"
            placeholder="Password"
            :feedback="false"
          />
        </div>
      </div>
      <div class="topMargin">
        <Button label="Login" class="p-button-raised" v-on:click="login" />
      </div>
      <div>
        <p>
          Don't have an account?
          <router-link to="/register">Register</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { post, getToastObj } from "@/services/fetchservice";
import Vue from "vue";

interface IUser {
  username: string;
  password: string;
}
export default Vue.extend({
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const response = await post<IUser, string>(
        "Account/login",
        {
          username: this.username,
          password: this.password
        },
        false
      );
      if (response.type === "success") {
        localStorage.setItem("jwt", response.response as string);
        this.$router.push("/");
      } else {
        this.$toast.add(getToastObj(response));
      }
    }
  }
});
</script>

<style scoped>
.root {
  display: grid;
  place-items: center;
  height: 100vh;
}
.topMargin {
  margin-top: 10px;
}
</style>
