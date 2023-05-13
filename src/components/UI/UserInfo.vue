<template>
  <div class="user_info_block">
    <div class="student_img">
      <img src="@/assets/img/students/avatar.png" />
    </div>
    <div class="student_info_block">
      <div class="student_name_block">
        <div class="student_name">Абрамова Екатерина</div>
        <div class="student_name_icon">
          <img src="@/assets/icons/girl.png" />
        </div>
      </div>
      <div class="student_name_block under_block">
        <div class="student_links">
          <div class="student_link_icon_block">
            <img src="@/assets/icons/whatsapp.png" />
          </div>
          <div class="student_link_icon_block">
            <img src="@/assets/icons/viber.png" />
          </div>
          <div class="student_link_icon_block">
            <img src="@/assets/icons/telegram.png" />
          </div>
        </div>
        <div class="student_comments">Комментарии</div>
      </div>
    </div>
    <div class="student_status_block">
      <div class="status_title">Статус</div>
      <div class="status_condition_block">
        <div class="status_icon">
          <img src="@/assets/icons/status-green.png" />
        </div>
        <div class="status_text">Активен</div>
      </div>
    </div>
    <div class="student_info_block info_block">
      <div class="info_block_item">
        <div class="student_info_text">Телефон</div>
        <div class="student_info_text_bold">8-900-000-00-00</div>
      </div>
      <div class="info_block_item">
        <div class="student_info_text">Телефон родителей</div>
        <div class="student_info_text_bold">8-900-000-00-00</div>
      </div>
    </div>
    <div class="student_info_block info_block">
      <div class="info_block_item item_left">
        <div class="student_info_text">Дата рождения</div>
        <div class="student_info_text_bold">25.04.2004 (17 лет)</div>
      </div>
      <div class="info_block_item">
        <div class="student_info_text">Адрес</div>
        <div class="student_info_text_bold">
          г. Краснодар, ул. Советская 24, кв. 208
        </div>
      </div>
    </div>
    <div class="student_block_buttons">
      <div><img src="@/assets/icons/edit.png" /></div>
      <div><img src="@/assets/icons/bin.png" /></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.user_info_block {
  display: flex;
  float: left;
  background-color: white;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px 0px;
}
.student_img {
  margin-left: 20px;
}
.student_name_block {
  margin-left: 40px;
  display: flex;
  align-items: center;
}
.student_name {
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  color: #458afb;
  -webkit-text-stroke: 1px black;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.student_name_icon {
  position: absolute;
  margin-left: 405px;
}
.under_block {
  float: left;
  margin-top: 40px;
}
.student_links {
  display: flex;
}
.student_link_icon_block {
  margin-right: 10px;
}
.student_comments {
  margin-left: 20px;
  color: #458afb;
  font-size: 18px;
  border-bottom: 1px solid #458afb;
}
.student_status_block {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-right: 60px;
}
.status_title {
  margin-left: 0px;
  font-weight: 400;
  font-size: 14px;
  color: #86939c;
}
.status_condition_block {
  display: flex;
}
.status_text {
  color: #0d2839;
  font-size: 18px;
  margin-left: 10px;
}
.student_info_block {
  margin-right: 150px;
}
.info_block {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.student_info_text_bold {
  margin-left: 0px;
  font-weight: 400;
  color: #0d2839;
  line-height: 22px;
}
.student_info_text {
  margin-left: 0px;
  font-weight: 400;
  font-size: 14px;
  color: #86939c;
}
.info_block_item {
  display: flex;
  flex-direction: column;
}
.item_left {
  margin-left: 0px;
}
.student_block_buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;
}
</style>