<template>
  <div>
    <p class="textAreaLabel">{{ label }}</p>
    <Textarea v-model="inputVal" class="input" :autoResize="true" rows="4" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  props: {
    label: String,
    value: String
  }
})
export default class CustomTextArea extends Vue {
  get inputVal() {
    return this.$props.value;
  }
  set(val: string) {
    this.$emit("input", val);
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
