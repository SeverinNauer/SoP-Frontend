<template>
  <div class="root">
    <div>
      <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <InputText placeholder="Username" />
        </div>
      </div>

      <div class="p-col-12 p-md-4 topMargin">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-lock"></i>
          </span>
          <Password v-model="password" placeholder="Password" />
        </div>
      </div>
      <div class="p-col-12 p-md-4 topMargin">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-lock"></i>
          </span>
          <Password v-model="passwordConfirm" placeholder="Confirm Password" />
        </div>
      </div>
      <div class="topMargin">
        <Button label="Register" class="p-button-raised" />
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
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      passwordConfirm: ""
    };
  }
};
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
