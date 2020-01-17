<template>
  <div style="display: inline-block;">
    <div class="p-col-12 p-md-4" style="padding-top: 55%">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
        </span>
        <InputText placeholder="Username" />
      </div>
    </div>

    <div class="p-col-12 p-md-4" style="padding-top: 2%">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-lock"></i>
        </span>
        <Password v-model="password" placeholder="Password" />
      </div>
    </div>
    <div style="padding-top: 8%">
      <Button label="Login" class="p-button-raised" />
    </div>
    <div>
      <p>Don't have an account? <a>Register</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  }
};
</script>

<style scoped></style>
