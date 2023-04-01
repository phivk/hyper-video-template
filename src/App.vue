<template>
  <h1 class="text-center">Hypervideo with HTML5 and Vue.js</h1>
  <VideoPlayer :videos="videos" />
</template>

<script setup>
import VideoPlayer from './components/VideoPlayer.vue'
const videos = {
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
        end: 9,
        src: 'https://placekitten.com/200/287',
        alt: 'a cute kitten'
      }
    ]
  }
}
</script>

<style scoped></style>
