<template>
  <div>
    <p class="textAreaLabel">{{ label }}</p>
    <InputText
      :type="inputType"
      v-model="inputVal"
      class="input"
      :disabled="disabled"
      :id="inputId"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    label: String,
    value: String,
    type: String,
    disabled: Boolean,
    inputId: String
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
#passwordInput {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border: 1px solid #a6a6a6;
}
</style>
