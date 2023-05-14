<template>
  <button class="yellow_button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "yellow-button",
};
</script>

<style scoped>
.yellow_button {
  cursor: pointer;
  width: 242px;
  padding: 17px 0px;
  background-color: #ffbd27;
  border-radius: 10px;
  border: none;
  outline: none;
  color: white;
  text-transform: uppercase;
  font-weight: 800;
}
.yellow_button:hover {
  background: transparent;
  border: 2px solid #ffbd27;
  padding: 15px 0px;
  color: #ffbd27;
}
</style>