<template>
  <select :value="modelValue" @change="changeOption">
    <option value="">Не выбрано</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "my-select",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped>
select {
  background-color: transparent;
  color: #458afb;
  border: none;
  outline: none;
  font-size: 18px;
}

option {
  background-color: #f2f5f8;
  border: 1px solid red;
  outline: none;
  margin: 5px;
}
</style>