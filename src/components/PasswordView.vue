<template>
  <div class="root p-grid">
    <div class=" p-col-12 p-md-12 p-lg-10 p-xl-6">
      <h2 class="title">
        {{ storedData.passwordIsNew ? "New Password" : password.title }}
      </h2>
      <div class="inputCont">
        <CustomInput
          label="Title"
          id="title"
          v-model="password.title"
          class="oneInput"
        />
        <CustomInput
          label="Username"
          id="username"
          v-model="password.username"
          class="oneInput"
        />
        <CustomInput
          label="Password"
          id="password"
          v-model="password.password"
          class="oneInput"
          type="password"
        />
        <CustomInput
          label="Url"
          id="url"
          v-model="password.url"
          class="oneInput"
        />
        <CustomTextArea
          label="Description"
          v-model="password.description"
          class="area"
        />
        <CustomInput
          label="Expiration date"
          id="date"
          v-model="password.expirationDate"
          class="oneInput"
        />
      </div>
      <Button label="Save" v-on:click="save" class="saveButton" />
    </div>
  </div>
</template>

<script>
import { store } from "@/store/store";
import CustomInput from "@/components/form/CustomInput.vue";
import CustomTextArea from "@/components/form/CustomTextArea.vue";

export default {
  name: "PasswordView",
  components: {
    CustomInput,
    CustomTextArea
  },
  data() {
    return {
      storedData: store.state
    };
  },
  methods: {
    save: function() {
      store.state.selectedPassword = this.password;
    }
  },
  computed: {
    password() {
      return this.storedData.selectedPassword;
    }
  }
};
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
  margin-top: 30px;
}

.saveButton {
  margin-top: 10px;
  float: right;
}

.area {
  margin-top: 20px;
}
</style>
