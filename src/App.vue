<template>
  <div id="root">
    <Loading v-show="loading" />
    <nav>
      <NavBar :displayList="displayList"/>
    </nav>
    <main>
      <section>
        <Banner />
      </section>
      <section>
        <DisplayList
          :displayList="displayList"
          :fetchData="fetchData"
          :info="info"
        />
      </section>
    </main>
    <footer></footer>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import "@/assets/styles/app.scss";
import NavBar from "@/components/NavBar/NavBar.vue";
import Banner from "@/components/Banner/Banner.vue";
import DisplayList from "@/components/DisplayList/DisplayList.vue";
import Loading from "@/components/Loading/Loading.vue";
import { useAxios } from "@/service/useAxios";
interface Data {
  displayList: {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    img: string;
    url: string;
  }[];
  info: {};
}
export default defineComponent({
  components: {
    NavBar,
    Banner,
    DisplayList,
    Loading,
  },
  setup() {
    const data = reactive<Data>({
      displayList: [],
      info: {},
    });
    const { axios, loading } = useAxios();
    const fetchData = async (pageSize: number) => {
      try {
        const result = await axios(
          `https://rickandmortyapi.com/api/character?page=${pageSize}`
        );
        data.displayList = result.data.results;
        data.info = result.data.info;
      } catch (e) {
        throw new Error(e);
      }
    };
    onMounted(() => {
      fetchData(1);
    });
    return {
      ...toRefs(data),
      fetchData,
      loading,
    };
  },
});
</script>
