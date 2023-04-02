<template>
  <h1 class="text-center">Hypervideo with HTML5 and Vue.js</h1>
  <VideoPlayer :videos="videos" />
</template>

<script setup>
import VideoPlayer from './components/VideoPlayer.vue'
const videos = {
  red: {
    path: 'https://raw.githubusercontent.com/phivk/hyper-video-template/main/src/static/videos/video-red.mp4',
    events: [
      {
        type: 'footnote',
        start: 1,
        end: 5,
        text: 'Hello RED Footnote!'
      },
      {
        type: 'overlay',
        start: 4,
        end: 6,
        component: 'VideoSelector'
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
        type: 'lower-third',
        start: 1,
        end: 4,
        title: 'Hello Lower Third',
        subTitle:
          'In the television industry, a lower third is a graphic overlay placed in the title-safe lower area of the screen, though not necessarily the entire lower third of it, as the name suggests.'
      },
      {
        type: 'image',
        start: 5,
        end: 9,
        src: 'https://placekitten.com/200/287',
        alt: 'a cute kitten'
      }
    ]
  }
}
</script>

<style scoped></style>
