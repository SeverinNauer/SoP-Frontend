<template>
  <span class="p-float-label input">
    <InputText :id="value" :type="inputType" v-model="inputVal" class="input" />
    <label :for="value">{{ label }}</label>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "CustomInput",
  props: ["label", "value", "id", "type"] as [string, string, string, string],
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    inputType: function() {
      return this.type || "text";
    }
  }
});
</script>

<style scoped>
.input {
  width: 100%;
}
</style>
