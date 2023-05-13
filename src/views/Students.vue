<template>
  <div>
    <Dialog v-model:show="dialogVisible">
      <form @submit.prevent>
        <div class="dialog_header">
          <div class="add_document_title">Добавить документ</div>
          <div class="dialog_close" @click="this.dialogVisible = false">
            <button class="close_button">
              <img src="@/assets/icons/delete.png" />
            </button>
          </div>
        </div>
        <div class="add_dialog_types">
          <div class="add_dialog_types_item">Тип документа</div>
          <div class="add_dialog_types_item">
            <div class="radio_block">
              <input
                type="radio"
                id="dogovor"
                name="drone"
                value="Договор"
                @change="type = $event.target.value"
                checked
              />
              <label for="dogovor">Договор</label>
            </div>
            <div class="radio_block">
              <input
                type="radio"
                id="spravka"
                name="drone"
                value="Справка"
                @change="type = $event.target.value"
              />
              <label for="spravka">Справка</label>
            </div>
            <div class="radio_block">
              <input
                type="radio"
                id="anketa"
                name="drone"
                value="Анкета"
                @change="type = $event.target.value"
              />
              <label for="anketa">Анкета</label>
            </div>
          </div>
        </div>
        <div class="add_dialog_inputs">
          <input
            class="dialog_text_input"
            @input="title = $event.target.value"
            v-bind:value="title"
            type="text"
            placeholder="Название документа"
          />
          <input
            class="dialog_text_input"
            @input="id = $event.target.value"
            v-bind:value="id"
            type="text"
            placeholder="Номер"
          />
        </div>
        <div class="add_dialog_date">
          Действует с
          <input
            type="date"
            @change="dateOne = $event.target.value"
            v-bind:value="dateOne"
          />
          по
          <input
            type="date"
            @change="dateTwo = $event.target.value"
            v-bind:value="dateTwo"
          />
        </div>
        <div class="add_dialog_checkboxes">
          <div>
            <input type="checkbox" id="checkbox_one" checked />
            <label for="checkbox_one">Оповещать об окончании</label>
          </div>
          <div>
            <input type="checkbox" id="checkbox_two" />
            <label for="checkbox_two">Создавать задачу при окончании</label>
          </div>
        </div>
        <div class="add_dialog_file">
          <input type="file" />
        </div>
        <div class="add_dialog_buttons">
          <button @click="addDocument" class="yellow_button">
            Добавить документ
          </button>
          <button @click="this.dialogVisible = false" class="grey_button">
            Отмена
          </button>
        </div>
      </form>
    </Dialog>
    <user-info></user-info>
    <div class="status_none">invisible magic</div>
    <div class="contracts_settings">
      <div class="selects_block">
        <Select v-model="selectedTypeSort" :options="sortTypeOptions" />
        <Select v-model="selectedStatusSort" :options="sortStatusOptions" />
      </div>
      <div class="contracts_add_button">
        <button @click="showDialog" class="yellow_button">
          Добавить документ
        </button>
      </div>
    </div>
    <div class="contracts_block">
      <div
        class="contract_item"
        v-for="contract in sortedContracts"
        :key="contract.id"
      >
        <div class="contract_info">
          <div class="contract_title">
            {{ contract.type }} {{ contract.id }}
          </div>
          <div v-if="contract.status == 0" class="contract_status status_none">
            Без статуса
          </div>
          <div v-if="contract.status == 1" class="contract_status">
            <img src="@/assets/icons/status-green.png" />
            <div class="contract_status_text">Заключён</div>
          </div>
          <div v-if="contract.status == 2" class="contract_status">
            <img src="@/assets/icons/status-red.png" />
            <div class="contract_status_text">Расторгнут</div>
          </div>
          <div class="contract_date">{{ contract.date }}</div>
          <div class="contract_buttons">
            <button class="default_button">
              <img src="@/assets/icons/printer.png" />
            </button>
            <button class="default_button">
              <img src="@/assets/icons/edit.png" />
            </button>
            <button class="default_button" @click="deleteDocument(contract.id)">
              <img src="@/assets/icons/bin.png" />
            </button>
          </div>
        </div>
        <div class="contract_img">
          <img src="@/assets/icons/pdf.png" />
        </div>
      </div>
    </div>
    <div class="server_title">Запросы с сервара</div>
    <div class="contracts_block">
      <div
        class="contract_item"
        v-for="serverContract in serverContracts"
        :key="serverContract.id"
      >
        <div class="contract_info">
          <div class="contract_title">
            Договор с сервера {{ serverContract.id }}
          </div>
          <div class="server_contract_info">
            <div class="server_contract_text">
              {{ serverContract.name }}
            </div>
            <div class="server_contract_text">{{ serverContract.email }}</div>
            <div class="server_contract_text">{{ serverContract.phone }}</div>
          </div>
          <div class="contract_date">{{ serverContract.website }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/UI/UserInfo.vue";
import Dialog from "@/components/UI/Dialog.vue";
import axios from "axios";
import Select from "@/components/UI/Select.vue";
export default {
  data() {
    return {
      selectedTypeSort: "",
      selectedStatusSort: "",
      sortTypeOptions: [
        { value: "Договор", name: "Договор" },
        { value: "Справка", name: "Справка" },
        { value: "Анкета", name: "Анкета" },
      ],
      sortStatusOptions: [
        { value: 0, name: "Без статуса" },
        { value: 1, name: "Заключен" },
        { value: 2, name: "Расторгнут" },
      ],
      contracts: [
        {
          id: "001",
          type: "Договор",
          date: "04.07.2021 - 04.07.2022",
          status: 1,
        },
        {
          id: "002",
          type: "Договор",
          date: "04.07.2021 - 04.07.2022",
          status: 2,
        },
        {
          id: "003",
          type: "Справка",
          date: "04.07.2021 - 04.07.2022",
          status: 0,
        },
        {
          id: "004",
          type: "Анкета",
          date: "04.07.2021 - 04.07.2022",
          status: 0,
        },
      ],
      serverContracts: [],
      dialogVisible: false,
      title: "",
      id: "",
      dateOne: "",
      dateTwo: "",
      type: "",
    };
  },
  components: { UserInfo, Select, Dialog },
  methods: {
    async fetchContracts() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users/?_limit=4"
        );
        this.serverContracts = response.data;
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    showDialog() {
      this.dialogVisible = true;
    },
    addDocument() {
      const newDocument = {
        id: this.id,
        type: this.type,
        date: this.dateOne + " - " + this.dateTwo,
        status: 1,
      };
      this.contracts.push(newDocument);
      this.dialogVisible = false;
      (this.id = ""),
        (this.dateOne = ""),
        (this.dateTwo = ""),
        (this.title = "");
    },
    deleteDocument(key) {
      console.log(key);
      this.contracts = this.contracts.filter((p) => p.id !== key);
    },
  },
  computed: {
    sortedContracts() {
      return [...this.contracts].filter((item) => {
        if (this.selectedTypeSort && this.selectedStatusSort) {
          return (
            item.type == this.selectedTypeSort &&
            item.status == this.selectedStatusSort
          );
        }
        if (this.selectedTypeSort) {
          return item.type == this.selectedTypeSort;
        }
        if (this.selectedStatusSort) {
          return item.status == this.selectedStatusSort;
        }
        return item;
      });
    },
  },
  mounted() {
    this.fetchContracts();
  },
};
</script>

<style>
.contracts_settings {
  display: flex;
  margin: 80px 0px 40px 0px;
  justify-content: space-between;
}
.selects_block {
  margin: 0px;
}
.contracts_add_button {
  margin: 0px;
}
.contracts_block {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
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
.contract_title {
  font-weight: 700;
  font-size: 24px;
  color: #0d2839;
  text-align: left;
}
.contract_status {
  margin-top: 5px;
  display: flex;
  float: left;
  align-items: center;
}
.contract_status_text {
  color: #0d2839;
  font-weight: 400;
  font-size: 18px;
  margin-left: 10px;
}
.status_none {
  opacity: 0;
}
.contract_date {
  color: #86939c;
  margin-top: 30px;
  text-align: left;
  margin-right: 56px;
}
.contract_buttons {
  display: flex;
  float: left;
  margin-top: 15px;
}
.default_button {
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  margin-right: 30px;
}
.server_contract_info {
  margin-top: 5px;
}
.server_contract_text {
  margin-top: 5px;
  text-align: left;
}
.server_title {
  font-weight: 700;
  font-size: 32px;
  color: #0d2839;
  margin: 20px 0px;
}
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
.add_document_title {
  margin: 0px;
  font-weight: 700;
  font-size: 36px;
  color: #458afb;
  text-align: left;
}
.add_dialog_types {
  display: flex;
}
.add_dialog_types_item {
  margin: 50px 10px 0px 0px;
  font-size: 18px;
}
.radio_block {
  margin-left: 0px;
  font-size: 18px;
}
.add_dialog_inputs {
  display: flex;
  flex-direction: column;
}
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
.add_dialog_date {
  display: flex;
  margin: 50px 0px 0px 0px;
}
.add_dialog_checkboxes {
  display: flex;
  flex-direction: column;
  margin: 50px 0px 0px 0px;
}
.add_dialog_file {
  margin: 50px 0px;
}
.add_dialog_buttons {
  display: flex;
}
.dialog_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dialog_close {
  margin: 0px;
}
.close_button {
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
}
</style>