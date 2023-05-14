<template>
  <button class="grey_button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "grey-button",
};
</script>

<style>
.grey_button {
  cursor: pointer;
  width: 242px;
  padding: 17px 0px;
  background-color: #d5dadf;
  border-radius: 10px;
  border: none;
  outline: none;
  color: white;
  text-transform: uppercase;
  font-weight: 800;
}
.grey_button:hover {
  background: transparent;
  border: 2px solid #d5dadf;
  padding: 15px 0px;
  color: #d5dadf;
}
</style>