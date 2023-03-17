<template>
  <header>
    <h1>Video Player</h1>
  </header>
  <main>
    <div class="player">
      <video controls :src="videoSrc"></video>
      <button class="bg-red" @click="setVideoSrc('red')">red</button>
      <button class="bg-green" @click="setVideoSrc('green')">green</button>
      <button class="bg-blue" @click="setVideoSrc('blue')">blue</button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      videoSrc: undefined,
      videos: {
        red: 'src/static/videos/video-red.mp4',
        green: 'src/static/videos/video-green.mp4',
        blue: 'src/static/videos/video-blue.mp4'
      }
    }
  },
  created() {
    this.videoSrc = this.videos.red
  },
  methods: {
    setVideoSrc(video) {
      this.videoSrc = this.videos[video]
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
}
button.bg-red {
  background-color: #904140;
}
button.bg-green {
  background-color: #287429;
}
button.bg-blue {
  background-color: #465269;
}
</style>
