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
      <VideoOverlay v-if="isOverlayShown" @hide-overlay="hideOverlay">
        <!-- insert child elements of VideoOverlay here -->
        <!-- the one below is a dynamic component, set by the overlay event -->
        <component
          :is="overlayComponent"
          @set-video="setVideo"
          :videos="videos"
          :currentVideo="videoKey"
        ></component>
      </VideoOverlay>
      <VideoImage :src="imageSrc" :alt="imageAlt" v-if="isImageShown" />
      <VideoLowerThird
        v-if="isLowerThirdShown"
        :title="lowerThirdTitle"
        :subTitle="lowerThirdSubTitle"
      ></VideoLowerThird>
      <div class="video-controls" v-if="hasCustomControls">
        <font-awesome-icon
          v-if="isPlaying"
          icon="fa-solid fa-pause"
          class="text-xl cursor-pointer"
          color="#FFF"
          @click="togglePlay()"
        />
        <font-awesome-icon
          v-else
          icon="fa-solid fa-play"
          class="text-xl cursor-pointer"
          color="#FFF"
          @click="togglePlay()"
        />
        <div class="time-display">{{ currentTimeString }} / {{ durationString }}</div>
      </div>
    </div>
    <VideoSelector :videos="videos" :currentVideo="videoKey" @set-video="setVideo" />
    <div>{{ footnoteText }}</div>
  </main>
</template>

<script>
import VideoSelector from './VideoSelector.vue'
import VideoOverlay from './VideoOverlay.vue'
import VideoLowerThird from './VideoLowerThird.vue'
import VideoImage from './VideoImage.vue'
import HelloWorld from './HelloWorld.vue'
export default {
  components: {
    VideoSelector,
    VideoOverlay,
    VideoLowerThird,
    VideoImage,
    HelloWorld
  },
  props: {
    videos: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      videoKey: Object.keys(this.videos)[0],
      isPlaying: false,
      isMuted: false,
      volume: 1,
      progress: 0,
      currentTimeString: '0:00',
      durationString: '0:00',
      hasCustomControls: false,
      currentTime: undefined,
      footnoteText: undefined,
      videoOverlayTimer: undefined,
      overlayComponent: undefined,
      isOverlayShown: false,
      isImageShown: false,
      isLowerThirdShown: false,
      imageSrc: undefined,
      imageAlt: undefined,
      lowerThirdTitle: undefined,
      lowerThirdSubTitle: undefined
    }
  },
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
      } else if (event.type === 'lower-third') {
        this.showLowerThird(event)
      }
    },
    disableEvent(event) {
      if (event.type === 'footnote') {
        this.footnoteText = undefined
      } else if (event.type === 'overlay') {
        this.hideOverlay()
      } else if (event.type === 'image') {
        this.hideImage()
      } else if (event.type === 'lower-third') {
        this.hideLowerThird()
      }
    },
    showOverlay(event) {
      this.isOverlayShown = true
      this.$refs.video.pause()
      this.overlayComponent = event.component
    },
    hideOverlay() {
      this.isOverlayShown = false
      this.$refs.video.play()
    },
    showImage(event) {
      this.imageSrc = event.src
      this.imageAlt = event.alt
      this.isImageShown = true
    },
    hideImage() {
      this.imageSrc = undefined
      this.imageAlt = undefined
      this.isImageShown = false
    },
    showLowerThird(event) {
      this.lowerThirdTitle = event.title
      this.lowerThirdSubTitle = event.subTitle
      this.isLowerThirdShown = true
    },
    hideLowerThird() {
      this.lowerThirdTitle = undefined
      this.lowerThirdSubTitle = undefined
      this.isLowerThirdShown = false
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
    }
  }
}
</script>

<style scoped>
.video-container {
  position: relative;
  max-width: 100%;
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
