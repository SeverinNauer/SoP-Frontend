<template>
  <div>
    <p class="textAreaLabel">{{ label }}</p>
    <Textarea v-model="inputVal" class="input" :autoResize="true" rows="4" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "CustomTextArea",
  props: ["label", "value"] as [string, string],
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
});
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
