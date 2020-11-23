import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    mobile: 1024,
    desktop: Infinity
  },
  defaultBreakpoint: 'mobile'
})
