<template>
  <main>
    <div class="video-player">
      <video
        class="video"
        ref="video"
        controls
        :src="currentVideo.path"
        @timeupdate="onTimeUpdate"
      ></video>
      <div class="video-overlay" v-if="showOverlay">
        <div class="top-right m-4">
          <span class="" @click="closeOverlay()">X</span>
        </div>
        <div class="video-button-wrapper">
          <button class="m-2 bg-red" @click="setVideo('red')">red</button>
          <button class="m-2 bg-green" @click="setVideo('green')">green</button>
          <button class="m-2 bg-blue" @click="setVideo('blue')">blue</button>
        </div>
      </div>
    </div>
    <div class="video-button-wrapper">
      <button class="m-2 bg-red" @click="setVideo('red')">red</button>
      <button class="m-2 bg-green" @click="setVideo('green')">green</button>
      <button class="m-2 bg-blue" @click="setVideo('blue')">blue</button>
    </div>
    <div>{{ footnoteText }}</div>
  </main>
</template>

<script>
import CommunityIcon from './icons/IconCommunity.vue'
export default {
  data() {
    return {
      videoKey: 'red',
      videos: {
        red: {
          path: 'src/static/videos/video-red.mp4',
          events: [
            {
              type: 'footnote',
              start: 1,
              end: 3,
              text: 'Hello RED Footnote!'
            }
          ]
        },
        green: {
          path: 'src/static/videos/video-green.mp4',
          events: [
            {
              type: 'footnote',
              start: 1,
              end: 3,
              text: 'Hello GREEN Footnote!'
            }
          ]
        },
        blue: {
          path: 'src/static/videos/video-blue.mp4',
          events: [
            {
              type: 'footnote',
              start: 1,
              end: 3,
              text: 'Hello BLUE Footnote!'
            }
          ]
        }
      },
      currentTime: undefined,
      footnoteText: undefined,
      showOverlay: true
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
    },
    closeOverlay() {
      this.showOverlay = false
    }
  },
  computed: {
    currentVideo() {
      return this.videos[this.videoKey]
    }
  },
  watch: {
    currentTime: {
      handler(curVal, oldVal) {
        for (var i = 0; i < this.currentVideo.events.length; i++) {
          let isCurValIn =
            curVal >= this.currentVideo.events[i].start && curVal <= this.currentVideo.events[i].end
          let isOldValIn =
            oldVal >= this.currentVideo.events[i].start && oldVal <= this.currentVideo.events[i].end

          if (isCurValIn && !isOldValIn) {
            // entered timing
            this.enableEvent(this.currentVideo.events[i])
          } else if (!isCurValIn && isOldValIn) {
            // exited timing
            this.disableEvent(this.currentVideo.events[i])
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.video-player {
  max-width: 100%;
  position: relative;
}
.video {
  width: 100%;
}
button {
  border: none;
  color: black;
  font-weight: bold;
  padding: 16px 32px;
  text-align: center;
  font-size: 16px;
  border-radius: 4px;
}
.bg-red {
  background-color: #904140;
}
.bg-green {
  background-color: #287429;
}
.bg-blue {
  background-color: #465269;
}
.video-button-wrapper {
  display: flex;
  justify-content: center;
}
.m-2 {
  margin: 0.5rem;
}
.m-4 {
  margin: 1rem;
}
.p-2 {
  padding: 0.5rem;
}
.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.top-right {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
