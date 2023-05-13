<template>
  <div class="sidebar">
    <div class="sidbar_block">
      <img src="@/assets/logo.png" />
    </div>
    <div class="sidbar_block" v-for="link in links" :key="link.title">
      <router-link :to="link.link">
        <div class="sidebar_block_img">
          <img :src="link.img" />
        </div>
        <div class="sidebar_block_title">{{ link.title }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          link: "/",
          title: "Главная",
          img: require("../assets/icons/home.png"),
        },
        {
          link: "/timetable",
          title: "Расписание",
          img: require("../assets/icons/calendar.png"),
        },
        {
          link: "/students",
          title: "Ученики",
          img: require("../assets/icons/boy.png"),
        },
        {
          link: "/teachers",
          title: "Преподаватели",
          img: require("../assets/icons/teacher.png"),
        },
        {
          link: "/lessons",
          title: "Занятия",
          img: require("../assets/icons/lesson.png"),
        },
      ],
    };
  },
};
</script>

<style>
.sidebar {
  width: 140px;
  height: 100vh;
  background: #458afb;
  display: flex;
  flex-direction: column;
}
.sidbar_block {
  margin: 20px 0px;
  color: white;
}
.sidebar_block_title {
    font-weight: 400;
  color: white;
  text-decoration: none;
  margin-top: 5px;
}
a {
  text-decoration: none;
}
</style>