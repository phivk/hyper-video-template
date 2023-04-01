import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
/* see more icons https://fontawesome.com/icons/categories/media-playback */
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faPlay)
library.add(faPause)
library.add(faXmark)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
