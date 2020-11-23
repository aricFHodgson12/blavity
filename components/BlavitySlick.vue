<template>
  <slick
    ref="slick"
    :options="slickOptions"
    @afterChange="onAfterChange"
    @beforeChange="onBeforeChange"
    @breakpoint="onBreakpoint"
    @destroy="onDestroy"
    @edge="onEdge"
    @init="onInit"
    @reInit="onReInit"
    @setPosition="onSetPosition"
    @swipe="onSwipe"
  >
    <slot></slot>
  </slick>
</template>

<script>
import Slick from 'vue-slick'

export default {
  components: {
    Slick
  },

  props: {
    options: {
      default: () => ({}),
      required: false,
      type: Object
    }
  },

  computed: {
    slick () {
      return this.$refs.slick
    },

    slickOptions () {
      return this.options
    }
  },

  methods: {
    next: function () {
      this.$refs.slick.next()
    },

    prev: function () {
      this.$refs.slick.prev()
    },

    pause: function () {
      this.$refs.slick.pause()
    },

    play: function () {
      this.$refs.slick.play()
    },

    goTo: function (index, dontAnimate) {
      this.$refs.slick.goTo(index, dontAnimate)
    },

    currentSlide: function () {
      return this.$refs.slick.currentSlide()
    },

    add: function (element, index, addBefore) {
      this.$refs.slick.add(element, index, addBefore)
    },

    remove: function (index, removeBefore) {
      this.$refs.slick.remove(index, removeBefore)
    },

    filter: function (filterData) {
      this.$refs.slick.filter(filterData)
    },

    unfilter: function () {
      this.$refs.slick.unfilter()
    },

    getOption: function (option) {
      this.$refs.slick.getOption(option)
    },

    setOption: function (option, value, refresh) {
      this.$refs.slick.setOption(option, value, refresh)
    },

    setPosition: function () {
      this.$refs.slick.setPosition()
    },

    // Events
    onAfterChange: function (event, slick, currentSlide) {
      this.$emit('afterChange', event, slick, currentSlide)
    },

    onBeforeChange: function (event, slick, currentSlide, nextSlide) {
      this.$emit('beforeChange', event, slick, currentSlide, nextSlide)
    },

    onBreakpoint: function (event, slick, breakpoint) {
      this.$emit('breakpoint', event, slick, breakpoint)
    },

    onDestroy: function (event, slick) {
      this.$emit('destroy', event, slick)
    },

    onEdge: function (event, slick, direction) {
      this.$emit('edge', event, slick, direction)
    },

    onInit: function (event, slick) {
      this.$emit('init', event, slick)
    },

    onReInit: function (event, slick) {
      this.$emit('reInit', event, slick)
    },

    onSetPosition: function (event, slick) {
      this.$emit('setPosition', event, slick)
    },

    onSwipe: function (event, slick, direction) {
      this.$emit('swipe', event, slick, direction)
    }
  }
}
</script>

<style lang="scss">
@import 'slick-carousel/slick/slick.css';
</style>
