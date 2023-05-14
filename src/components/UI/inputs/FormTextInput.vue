<template>
  <input type="text" class="dialog_text_input" />
</template>

<script>
export default {
  name: "form-text-input",
};
</script>

<style>
.dialog_text_input {
  outline: none;
  background-color: transparent;
  border: none;
  color: black;
  border-bottom: 1px solid #b9c2c9;
  font-size: 18px;
  padding-bottom: 12px;
  margin-top: 50px;
  width: 100%;
}
.dialog_text_input::placeholder {
  color: #b9c2c9;
}
</style>