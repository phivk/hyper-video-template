<template>
  <main>
    <div class="video-container">
      <video
        ref="video"
        :src="currentVideo.path"
        @timeupdate="onVideoTimeUpdate"
        @play="onVideoPlay"
        @pause="onVideoPause"
        :controls="!hasCustomControls"
        class="w-full"
      ></video>
      <div class="video-overlay" v-if="isOverlayShown">
        <div class="absolute top-0 right-0 m-4 flex flex-col text-center text-white">
          <font-awesome-icon
            icon="fa-solid fa-xmark"
            class="text-xl cursor-pointer"
            color="#FFF"
            @click="hideOverlay()"
          />
          <span class="cursor-default">{{ videoOverlayTimer }}</span>
        </div>
        <!-- dynamic component, set by the overlay event -->
        <component :is="overlayComponent" @set-video="setVideo"></component>
      </div>
      <div class="video-overlay" v-if="isImageShown">
        <img :src="image.src" :alt="image.alt" />
      </div>
      <div class="video-controls" v-if="hasCustomControls">
        <button @click="togglePlay">
          {{ isPlaying ? 'Pause' : 'Play' }}
        </button>
        <div class="time-display">{{ currentTimeString }} / {{ durationString }}</div>
      </div>
    </div>
    <div>{{ footnoteText }}</div>
    <VideoButtons @set-video="setVideo" />
  </main>
</template>

<script>
import VideoButtons from './VideoButtons.vue'
import HelloWorld from './HelloWorld.vue'
export default {
  components: {
    VideoButtons,
    HelloWorld
  },
  data() {
    return {
      isPlaying: false,
      isMuted: false,
      volume: 1,
      progress: 0,
      currentTimeString: '0:00',
      durationString: '0:00',
      hasCustomControls: false,
      videoKey: 'red',
      videos: {
        red: {
          path: 'src/static/videos/video-red.mp4',
          events: [
            {
              type: 'overlay',
              start: 1,
              end: 5,
              component: 'VideoButtons'
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
            },
            {
              type: 'overlay',
              start: 4,
              end: 7,
              component: 'HelloWorld'
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
            },
            {
              type: 'image',
              start: 4,
              end: 6,
              src: 'https://placekitten.com/200/287',
              alt: 'a cute kitten'
            }
          ]
        }
      },
      currentTime: undefined,
      footnoteText: undefined,
      isOverlayShown: false,
      videoOverlayTimer: undefined,
      overlayComponent: undefined,
      isImageShown: false,
      image: undefined
    }
  },
  created() {},
  methods: {
    setVideo(videoKey) {
      this.hideOverlay()
      this.videoKey = videoKey
    },
    enableEvent(event) {
      if (event.type === 'footnote') {
        this.footnoteText = event.text
      } else if (event.type === 'overlay') {
        this.showOverlay(event)
      } else if (event.type === 'image') {
        this.showImage(event)
      }
    },
    disableEvent(event) {
      if (event.type === 'footnote') {
        this.footnoteText = undefined
      } else if (event.type === 'overlay') {
        this.hideOverlay()
      } else if (event.type === 'image') {
        this.hideImage()
      }
    },
    showOverlay(event) {
      this.isOverlayShown = true
      this.$refs.video.pause()
      this.videoOverlayTimer = 5
      this.overlayComponent = event.component
    },
    hideOverlay() {
      this.isOverlayShown = false
      this.$refs.video.play()
    },
    showImage(event) {
      this.image = {
        src: event.src,
        alt: event.alt
      }
      this.isImageShown = true
    },
    hideImage() {
      this.image = undefined
      this.isImageShown = false
    },
    /* video playback methods */
    onVideoTimeUpdate: function () {
      const video = this.$refs.video
      this.currentTime = video.currentTime

      const minutes = Math.floor(video.currentTime / 60)
      const seconds = Math.floor(video.currentTime % 60)
      this.currentTimeString = `${minutes}:${seconds.toString().padStart(2, '0')}`

      const durationMinutes = Math.floor(video.duration / 60)
      const durationSeconds = Math.floor(video.duration % 60)
      this.durationString = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`

      this.progress = (video.currentTime / video.duration) * 100
    },
    togglePlay() {
      if (this.isPlaying) {
        this.$refs.video.pause()
      } else {
        this.$refs.video.play()
      }
      this.isPlaying = !this.isPlaying
    },
    onVideoPlay() {
      this.isPlaying = true
    },
    onVideoPause() {
      this.isPlaying = false
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
.video-container {
  position: relative;
  max-width: 100%;
}

.video-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}

.video-controls button {
  background: none;
  border: none;
  color: white;
  font-size: 1em;
  cursor: pointer;
  margin-right: 10px;
}
</style>
