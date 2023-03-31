<template>
  <main>
    <div class="relative max-w-full">
      <video
        class="w-full"
        ref="video"
        controls
        :src="currentVideo.path"
        @timeupdate="onTimeUpdate"
      ></video>
      <div
        class="absolute w-full h-full top-0 left-0 bg-black-50 flex justify-center items-center"
        v-if="isOverlayShown"
      >
        <div class="absolute top-0 right-0 m-4 flex flex-col">
          <span class="" @click="hideOverlay()">X</span>
          <span class="video-overlay-timer">{{ videoOverlayTimer }}</span>
        </div>
        <div class="flex justify-center">
          <button class="m-2 bg-red" @click="setVideo('red')">red</button>
          <button class="m-2 bg-green" @click="setVideo('green')">green</button>
          <button class="m-2 bg-blue" @click="setVideo('blue')">blue</button>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
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
              type: 'overlay',
              start: 1,
              end: 5
            },
            {
              type: 'footnote',
              start: 4,
              end: 6,
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
      isOverlayShown: false,
      videoOverlayTimer: undefined
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
    enableEvent(event) {
      if (event.type === 'footnote') {
        this.footnoteText = event.text
      } else if (event.type === 'overlay') {
        this.showOverlay()
      }
    },
    disableEvent(event) {
      if (event.type === 'footnote') {
        this.footnoteText = undefined
      } else if (event.type === 'overlay') {
        this.hideOverlay()
      }
    },
    showOverlay() {
      this.isOverlayShown = true
      this.$refs.video.pause()
      this.videoOverlayTimer = 5
    },
    hideOverlay() {
      this.isOverlayShown = false
      this.$refs.video.play()
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
    },
    videoOverlayTimer: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.videoOverlayTimer--
          }, 1000)
        } else {
          this.hideOverlay()
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
  border-radius: 4px;
}
</style>
