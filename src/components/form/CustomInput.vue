<template>
  <div>
    <p class="textAreaLabel">{{ label }}</p>
    <InputText :type="inputType" v-model="inputVal" class="input" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    label: String,
    value: String,
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

.textAreaLabel {
  text-align: left;
  margin: 5px;
  margin-left: 0px;
  color: rgb(0, 0, 0, 0.55);
}
</style>
