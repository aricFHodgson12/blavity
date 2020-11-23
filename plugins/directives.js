import Vue from 'vue'

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

Vue.directive('resize', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

Vue.directive('click-outside', {
  bind (el, binding, vnode) {
    el.event = (event) => {
      // eslint disable
      if (! (el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
      // eslint enable
    }

    document.body.addEventListener('click', el.event)
  },

  unbind (el) {
    document.body.removeEventListener('click', el.event)
  }
})
