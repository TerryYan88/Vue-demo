
import { reactive, watch, onMounted, onUnmounted, toRefs } from "vue";
export const useScroll = () => {
    const scrollStatus = reactive({
        scrolling: false,
        scrollTop: 0
    })


    watch([() => scrollStatus.scrolling, () => scrollStatus.scrollTop], ([newScrolling, newScrolltop], [oldScrolling, oldScrolltop]) => {
        scrollStatus.scrollTop = newScrolltop
    }, {
        immediate: true,
        deep: true,
    })
    const onScroll = (e:any) => {
        e = e || window.event;
        scrollStatus.scrollTop = e.target.documentElement.scrollTop;
        scrollStatus.scrolling = e.target.documentElement.scrollTop > scrollStatus.scrollTop
    }
    onMounted(() => {
        window.addEventListener("scroll", onScroll);
    })

    onUnmounted(() => {
        window.removeEventListener("scroll", onScroll);
    })



    return {
        ...toRefs(scrollStatus)
    }
}

