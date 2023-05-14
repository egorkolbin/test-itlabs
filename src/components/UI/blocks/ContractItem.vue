<template>
  <div class="contract_item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "contract-item",
};
</script>

<style>
.contract_item {
  display: flex;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin: 0px 0px 20px 0px;
}
.contract_item:hover {
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
  transition: 0.17s;
}
</style>