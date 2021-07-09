<template>
  <div id="display-list">
    <div class="display-container">
      <ul>
        <li
          v-for="item in displayList"
          :key="item.id"
          @click="handleModal(item.id)"
        >
          <div class="img-container">
            <img :src="item.image" :alt="item.name" />
          </div>
          <div class="details">
            <p class="name">Name:{{ item.name }}</p>
            <p class="gender">
              Gender:{{ item.gender === "unknown" ? "?" : item.gender }}
            </p>
            <p
              class="status"
              :class="
                item.status === 'Alive'
                  ? 'colorGreen'
                  : item.status === 'Dead'
                  ? 'colorRed'
                  : item.status === 'unknown'
                  ? 'colorGrey'
                  : ''
              "
            >
              Status:{{ item.status }}-{{ item.species }}
            </p>
            <p class="location">
              Location:{{
                item.location.name.slice(0, 5) === "Earth"
                  ? item.location.name.slice(0, 5)
                  : item.location.name
              }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <Pagination :info="info" :fetchData="fetchData" />
    <Modal :isOpen="isOpen" :role="role" :handleClose="handleClose" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, watch, reactive, toRefs ,computed } from "vue";
import "./style/displayList.scss";
import Pagination from "./pagination/Pagination.vue";
import Modal from "./modal/Modal.vue";
import axios from "axios";
export default defineComponent({
  components: {
    Pagination,
    Modal,
  },
  props: {
    displayList: {
      type: Array,
      isRequired: true,
    },
    fetchData: {
      type: Function,
      isRequired: true,
    },
    info: {
      type: Object,
      isRequired: true,
    },
  },
  setup(props) {

    watch([props.displayList], (newVal, oldVal) => {}, {
      immediate: true,
      deep: true,
    });

    const data = reactive({
      isOpen: false,
      role: null,
    });

    const handleModal = async (id: number) => {
      try {
        const result = await axios(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        data.isOpen = true;
        data.role = result.data;
      } catch (er) {
        throw new Error(er);
      }
    };

    const handleClose = () => (data.isOpen = false);
    return {
      ...toRefs(data),
      handleModal,
      handleClose
    };
  },
});
</script>
