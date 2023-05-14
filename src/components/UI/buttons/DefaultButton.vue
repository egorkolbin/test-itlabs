<template>
  <button class="default_button ">
    <slot></slot>
  </button>
</template>

<script>
export default {
    name: "default-button",
}
</script>

<style>
.default_button {
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  margin-right: 30px;
}
</style>