<template>
  <font-awesome-icon
    v-if="isPlaying"
    icon="fa-solid fa-pause"
    class="text-xl cursor-pointer"
    color="#FFF"
    @click="$emit('toggle-play')"
  />
  <font-awesome-icon
    v-else
    icon="fa-solid fa-play"
    class="text-xl cursor-pointer"
    color="#FFF"
    @click="$emit('toggle-play')"
  />
</template>

<script>
export default {
  props: {
    isPlaying: {
      type: Boolean
    }
  }
}
</script>
