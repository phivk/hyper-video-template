<template>
  <div class="video-overlay-container">
    <div class="absolute top-0 right-0 m-4 flex flex-col text-center text-white">
      <font-awesome-icon
        icon="fa-solid fa-xmark"
        class="text-xl cursor-pointer"
        color="#FFF"
        @click="$emit('hide-overlay')"
      />
      <span class="cursor-default">{{ videoOverlayTimer }}</span>
    </div>
    <slot>
      <!-- child elements appear here -->
    </slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoOverlayTimer: undefined
    }
  },
  created() {
    this.videoOverlayTimer = 5
  },
  watch: {
    videoOverlayTimer: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.videoOverlayTimer--
          }, 1000)
        } else {
          this.$emit('hide-overlay')
        }
      }
    }
  }
}
</script>

<style scoped>
.video-overlay-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
</style>
