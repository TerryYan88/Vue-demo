<template>
  <!-- empty div for stand position -->
  <div v-if="scrollTop > 0" style="height: 1.6rem"></div>
  <div
    id="navbar"
    :class="scrollTop > 0 ? 'fixed-active' : ''"
    ref="navbarHeight"
  >
    <div class="navbar-container">
      <div class="navbar-center">
        <input
          type="text"
          placeholder="Click for search"
          v-model="ipt"
        />
        <ul v-if="isShow" class="searchList">
          <li v-for="item in arrName" :key="item.id" @click="handleClick(item)">
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>
    <Modal :isOpen="isOpen" :role="role" :handleClose="handleClose" />
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, reactive, toRefs, watch } from "vue";
import "./style/Navbar.scss";
import { useScroll } from "@/hooks/useScorll";
import Modal from "@/components/DisplayList/modal/Modal.vue";
import axios from "axios";
export default defineComponent({
  props: {
    displayList: {
      type: Array,
      isRequired: true,
    },
  },
  components: {
    Modal,
  },
  emits: ["changeName"],
  setup(props, ctx) {
    const data = reactive({
      link: "The Rick and Morty API",
      img: require("../../assets/image/logo.png"),
      ipt: "",
      isShow: false,
      isOpen:false,
      role:null,
    });
    const { scrollTop } = useScroll();

    const arrName = computed(() => {
      const filterArrayName = props.displayList?.filter(
        (item: any) =>
          item.name.toLowerCase().indexOf(data.ipt.toLowerCase().trim()) !== -1
      );
      return filterArrayName;
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
    const handleClick = (item: any) => {
      data.isShow = false;
      data.ipt = "";
      handleModal(item.id);
    };

    watch([props.displayList], () => {}, {
      deep: true,
      immediate: true,
    });
    watch(
      () => data.ipt,
      (newVal, oldVal) => {
        if (newVal.length > 0) {
          data.isShow = true;
        } else {
          data.isShow = false;
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );
     const handleClose = () => (data.isOpen = false);
    return {
      ...toRefs(data),
      scrollTop,
      arrName,
      handleClick,
      handleClose
    };
  },
});
</script>
