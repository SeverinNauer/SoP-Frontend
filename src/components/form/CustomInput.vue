<template>
  <span class="p-float-label input">
    <InputText :id="value" :type="inputType" v-model="inputVal" class="input" />
    <label :for="value">{{ label }}</label>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    label: String,
    value: String,
    id: String,
    type: String
  }
})
export default class CustomInput extends Vue {
  get inputVal() {
    return this.$props.value;
  }
  set inputVal(val: string) {
    this.$emit("input", val);
  }
  get inputType() {
    return this.$props.type || "text";
  }
}
</script>

<style scoped>
.input {
  width: 100%;
}
</style>
