<template>
  <div id="pagination">
    <ul v-if="width > 800">
      <li @click="preBtn" v-if="currentIdx !== 1">&laquo;</li>
      <li v-else class="standLi"></li>
      <li
        v-for="(item, idx) in info.pages"
        :key="idx"
        @click="currentBtn(idx)"
        :class="currentIdx - 1 === idx ? 'active' : ''"
      >
        {{ idx + 1 }}
      </li>
      <li @click="nextBtn" v-if="currentIdx !== 34">&raquo;</li>
      <li v-else class="standLi"></li>
    </ul>
    <ul v-else>
      <li @click="preBtn">&laquo;</li>
      <li class='active'>{{currentIdx}}</li>
      <li @click="nextBtn">&raquo;</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, watch, toRefs } from "vue";
import { useWindowResize } from "@/hooks/useWindowResize";
import "./style/pagination.scss";
export default defineComponent({
  props: {
    info: {
      type: Object,
      isRequired: true,
    },
    fetchData: {
      type: Function,
      isRequired: true,
    },
    handleIsShow: {
      type: Function,
      isRequired: true,
    },
  },
  setup(props) {
    watch([props.info], (newVal) => {}, {
      deep: true,
      immediate: true,
    });
    const data = reactive({
      currentIdx: 1,
    });
    const preBtn = () => {
      if (data.currentIdx < 0) {
        data.currentIdx = 1;
      } else {
        data.currentIdx--;
        props.fetchData!(data.currentIdx);
      }
    };
    const nextBtn = () => {
      if (data.currentIdx > 34) {
        data.currentIdx = 34;
      } else {
        data.currentIdx++;
        props.fetchData!(data.currentIdx);
      }
    };
    const currentBtn = (idx: number) => {
      data.currentIdx = idx + 1;
      props.fetchData!(data.currentIdx);
    };

    const { width } = useWindowResize();
    return {
      ...toRefs(data),
      preBtn,
      nextBtn,
      currentBtn,
      width
    };
  },
});
</script>
