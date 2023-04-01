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
        <div class="absolute top-0 right-0 m-4 flex flex-col text-center">
          <font-awesome-icon
            icon="fa-solid fa-xmark"
            class="text-xl cursor-pointer"
            @click="hideOverlay()"
          />
          <span class="cursor-default">{{ videoOverlayTimer }}</span>
        </div>
        <!-- dynamic component, set by the overlay event -->
        <component :is="overlayComponent" @set-video="setVideo"></component>
      </div>
      <div
        class="absolute w-full h-full top-0 left-0 bg-black-50 flex justify-center items-center"
        v-if="isImageShown"
      >
        <img :src="image.src" :alt="image.alt" />
      </div>
    </div>
    <VideoButtons @set-video="setVideo" />
    <div>{{ footnoteText }}</div>
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
    onTimeUpdate: function () {
      this.currentTime = this.$refs.video.currentTime
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

<style scoped></style>
