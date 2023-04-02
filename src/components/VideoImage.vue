<template>
  <img class="video-image" :src="src" :alt="alt" />
</template>

<script>
export default {
  props: {
    src: {
      type: String
    },
    alt: {
      type: String
    }
  }
}
</script>

<style scoped>
.video-image {
  position: absolute;
  top: 1rem;
  right: 1rem;
  max-width: 50%;
  max-height: 70%;
}
</style>
