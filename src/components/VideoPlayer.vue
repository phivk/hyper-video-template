<template>
  <header>
    <h1>Video Player</h1>
  </header>
  <main>
    <div class="player">
      <video ref="video" controls :src="videos[videoKey]" @timeupdate="onTimeUpdate"></video>
      <button class="bg-red" @click="setVideo('red')">red</button>
      <button class="bg-green" @click="setVideo('green')">green</button>
      <button class="bg-blue" @click="setVideo('blue')">blue</button>
    </div>
    <div>{{ footnoteText }}</div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      videoKey: 'red',
      videos: {
        red: 'src/static/videos/video-red.mp4',
        green: 'src/static/videos/video-green.mp4',
        blue: 'src/static/videos/video-blue.mp4'
      },
      currentTime: undefined,
      timedEvents: [
        {
          type: 'footnote',
          start: 1,
          end: 5,
          text: 'Hello Footnote!'
        }
      ],
      footnoteText: undefined
    }
  },
  created() {},
  methods: {
    setVideo(videoKey) {
      this.videoKey = videoKey
    },
    onTimeUpdate: function () {
      this.currentTime = this.$refs.video.currentTime
    },
    enableEvent(timedEvent) {
      if (timedEvent.type === 'footnote') {
        this.footnoteText = timedEvent.text
      }
    },
    disableEvent(timedEvent) {
      if (timedEvent.type === 'footnote') {
        this.footnoteText = undefined
      }
    }
  },
  watch: {
    currentTime: {
      handler(curVal, oldVal) {
        for (var i = 0; i < this.timedEvents.length; i++) {
          let isCurValIn = curVal >= this.timedEvents[i].start && curVal <= this.timedEvents[i].end
          let isOldValIn = oldVal >= this.timedEvents[i].start && oldVal <= this.timedEvents[i].end

          if (isCurValIn && !isOldValIn) {
            // entered timing
            this.enableEvent(this.timedEvents[i])
          } else if (!isCurValIn && isOldValIn) {
            // exited timing
            this.disableEvent(this.timedEvents[i])
          }
        }
      }
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
