<template>
  <Teleport to="body">
    <transition name="fade">
      <div id="teleport" v-if="isOpen">
        <div class="teleport-container">
          <div class="img-container">
            <img :src="role.image" :alt="role.name" />
          </div>
          <div class="details">
            <p class="name">Name:{{ role.name }}</p>
            <p class="gender">
              Gender:{{ role.gender === "unknown" ? "?" : role.gender }}
            </p>
            <p
              class="status"
              :class="
                role.status === 'Alive'
                  ? 'colorGreen'
                  : role.status === 'Dead'
                  ? 'colorRed'
                  : role.status === 'unknown'
                  ? 'colorGrey'
                  : ''
              "
            >
              Status:{{ role.status }}-{{ role.species }}
            </p>
            <p class="location">
              location:{{
                role.location.name.slice(0, 5) === "Earth"
                  ? role.location.name.slice(0, 5)
                  : role.location.name
              }}
            </p>
          </div>
        </div>
        <button class='button' @click="handleClose">
          X
        </button>
      </div>
    </transition>
  </Teleport>
</template>

<script lang='ts'>
import { defineComponent, watch } from "vue";
import "./style/modal.scss";
export default defineComponent({
  props: {
    role: {
      type: Object,
      isRequired: true,
    },
    isOpen: {
      type: Boolean,
      isRequired: true,
    },
    handleClose:{
      type:Function,
      isRequired: true,
    }
  },
  setup(props) {
    watch([props.isOpen], (newVal,oldVal) => {
    }, {
      deep: true,
      immediate: true,
    });

    return {

    };
  },
});
</script>
