<template>
  <div>
    <Dialog v-model:show="dialogVisible">
      <form @submit.prevent>
        <div class="dialog_header">
          <div class="add_document_title">Добавить документ</div>
          <div class="dialog_close">
            <close-button @click="this.dialogVisible = false"></close-button>
          </div>
        </div>
        <div class="add_dialog_types">
          <div class="add_dialog_types_item">Тип документа</div>
          <div class="add_dialog_types_item">
            <div class="radio_block">
              <form-radio-input
                id="dogovor"
                name="drone"
                value="Договор"
                @change="type = $event.target.value"
              />
              <label for="dogovor">Договор</label>
            </div>
            <div class="radio_block">
              <form-radio-input
                id="spravka"
                name="drone"
                value="Справка"
                @change="type = $event.target.value"
              />
              <label for="spravka">Справка</label>
            </div>
            <div class="radio_block">
              <form-radio-input
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
          <form-text-input
            @input="title = $event.target.value"
            v-bind:value="title"
            placeholder="Название документа"
          ></form-text-input>
          <form-text-input
            @input="id = $event.target.value"
            v-bind:value="id"
            placeholder="Номер"
          ></form-text-input>
        </div>
        <div class="add_dialog_date">
          Действует с
          <form-date-input
            @change="dateOne = $event.target.value"
            v-bind:value="dateOne"
          />
          по
          <form-date-input
            @change="dateTwo = $event.target.value"
            v-bind:value="dateTwo"
          />
        </div>
        <div class="add_dialog_checkboxes">
          <div>
            <form-checkbox-input id="checkbox_one" checked />
            <label for="checkbox_one">Оповещать об окончании</label>
          </div>
          <div>
            <form-checkbox-input id="checkbox_two" />
            <label for="checkbox_two">Создавать задачу при окончании</label>
          </div>
        </div>
        <div class="add_dialog_file">
          <form-file-input />
        </div>
        <div class="add_dialog_buttons">
          <yellow-button @click="addDocument">Добавить документ</yellow-button>
          <grey-button @click="this.dialogVisible = false">
            Отмена
          </grey-button>
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
        <yellow-button @click="showDialog"> Добавить документ </yellow-button>
      </div>
    </div>
    <div class="contracts_block">
      <contract-item v-for="contract in sortedContracts" :key="contract.id">
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
            <default-button>
              <img src="@/assets/icons/printer.png" />
            </default-button>
            <default-button>
              <img src="@/assets/icons/edit.png" />
            </default-button>
            <default-button @click="deleteDocument(contract.id)"
              ><img src="@/assets/icons/bin.png"
            /></default-button>
          </div>
        </div>
        <div class="contract_img">
          <img src="@/assets/icons/pdf.png" />
        </div>
      </contract-item>
    </div>
    <div class="server_title">Запросы с сервара</div>
    <div class="contracts_block">
      <contract-item
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
      </contract-item>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import UserInfo from "@/components/UI/UserInfo.vue";
import Dialog from "@/components/UI/dialogs/Dialog.vue";
import Select from "@/components/UI/selects/Select.vue";
import DefaultButton from "@/components/UI/buttons/DefaultButton.vue";
import CloseButton from "@/components/UI/buttons/CloseButoon.vue";
import YellowButton from "@/components/UI/buttons/YellowButton.vue";
import GreyButton from "@/components/UI/buttons/GreyButton.vue";
import FormTextInput from "@/components/UI/inputs/FormTextInput.vue";
import FormRadioInput from "@/components/UI/radios/FormRadioInput.vue";
import FormCheckboxInput from "@/components/UI/checkboxes/FormCheckboxInput.vue";
import FormDateInput from "@/components/UI/dates/FormDateInput.vue";
import FormFileInput from "@/components/UI/files/FormFileInput.vue";
import ContractItem from "@/components/UI/blocks/ContractItem.vue";

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
          id: 1,
          type: "Договор",
          date: "04.07.2021 - 04.07.2022",
          status: 1,
        },
        {
          id: 2,
          type: "Договор",
          date: "04.07.2021 - 04.07.2022",
          status: 2,
        },
        {
          id: 3,
          type: "Справка",
          date: "04.07.2021 - 04.07.2022",
          status: 0,
        },
        {
          id: 4,
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
  components: {
    UserInfo,
    Select,
    Dialog,
    DefaultButton,
    CloseButton,
    YellowButton,
    GreyButton,
    FormTextInput,
    FormRadioInput,
    FormCheckboxInput,
    FormDateInput,
    FormFileInput,
    ContractItem,
  },
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
.add_dialog_inputs {
  display: flex;
  flex-direction: column;
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
.radio_block {
  margin-left: 0px;
  font-size: 18px;
}
</style>