<template>
  <div class="video-lower-third-container">
    <h2>{{ title }}</h2>
    <p>{{ subTitle }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    title: {
      type: String
    },
    subTitle: {
      type: String
    }
  }
}
</script>

<style scoped>
.video-lower-third-container {
  position: absolute;
  width: 80%;
  bottom: 15%;
  left: 10%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  color: white;
}
</style>
