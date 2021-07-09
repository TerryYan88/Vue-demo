import axios from "axios";
import {reactive,toRefs} from "vue";
export const useAxios = ()=>{
    const data = reactive({
        loading:false,
    })
    const startLoading = ()=>data.loading = true;
    const closedLoading = ()=>data.loading = false;
    axios.interceptors.request.use(config=>{
        startLoading();
        return config;
    })
    axios.interceptors.response.use(config=>{
        closedLoading();
        return config;
    })

    return {
        ...toRefs(data),
        axios,
    }
}