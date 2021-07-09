<template>
  <div class="banner">
    <img :src="banner" alt="banner picture">
    <div class="bannar-bg">
      <img :src="font" alt="font picture" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent,reactive,toRefs } from "vue";
import "./style/banner.scss";
export default defineComponent({
  setup() {
    const data = reactive({
      banner:require("../../assets/image/banner.jpg"),
      font:require("../../assets/image/title.png")
    })
    return {
      ...toRefs(data),
    };
  },
});
</script>
