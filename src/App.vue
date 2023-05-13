<template>
  <div class="wrapper">
    <Sidebar />
    <div class="right_side">
      <Navbar />
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
export default {
  components: {
    Navbar,
    Sidebar,
  },
};
</script>


<style>
/* @import url('https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@700&family=Inter&display=swap'); */
* {
  margin: 0px auto;
}

body {
  background-color: #f2f5f8;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  /* font-family: 'Azeret Mono', monospace; */
}

nav {
  padding: 30px;
}

.wrapper {
  display: flex;
  float: left;
  width: 100%;
}

.right_side {
  width: 100%;
}

.content {
  margin: 26px 90px;
}
</style>
