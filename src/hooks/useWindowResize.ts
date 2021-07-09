import {reactive,watch,onMounted,onUnmounted,toRefs} from "vue";

export const useWindowResize = ()=>{
    const size = reactive({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        flag:false,
    })
    const onResize = ()=>{
        size.width =  document.documentElement.clientWidth;
        size.height = document.documentElement.clientHeight;
    }
    watch(()=>size.width,(newVal,oldVal)=>{
        if(newVal < 960){
            size.flag = true;
        }
     },{
         immediate:true,
         deep:true,
     })
    onMounted(()=>{
        window.addEventListener("resize",onResize);
    })
    onUnmounted(()=>{
        window.removeEventListener("resize",onResize);
    })
    return {
        ...toRefs(size),
    }
}