import Vue from 'vue'
import VToolTip from 'v-tooltip'
import VueInfiniteScroll from 'vue-infinite-scroll'
import VueLazyload from 'vue-lazyload'

Vue.use(VToolTip)
Vue.use(VueInfiniteScroll)
Vue.use(VueLazyload, {
  error: 'https://storage.googleapis.com/blavitynews/images/placeholder.webp',
  observer: true
})
