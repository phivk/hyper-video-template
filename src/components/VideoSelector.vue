<template>
  <div class="flex justify-center">
    <div v-for="videoKey in Object.keys(videos)" :key="videoKey">
      <button
        v-if="videoKey !== currentVideo"
        :class="`m-2 bg-${videoKey}`"
        @click="$emit('setVideo', videoKey)"
      >
        {{ videoKey }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    videos: {
      type: Object
    },
    currentVideo: {
      type: String
    }
  }
}
</script>
<style scoped>
button {
  border: none;
  color: black;
  font-weight: bold;
  padding: 16px 32px;
  text-align: center;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
