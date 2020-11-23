<template>
  <div
    class="video-large-card"
    :class="{ 'video-large-card__mobile': isViewportMobile }"
  >
    <div class="player-container">
      <jw-player
        v-if="video"
        :autostart="isViewportMobile"
        :image="video.image"
        :sources="video.sources"
        @complete="onComplete"
        @pause="onPause"
        @play="onPlay"
      ></jw-player>
    </div>
    <div
      v-if="!isViewportMobile"
      class="text-container"
    >
      <div
        v-if="tags"
        class="tags-container"
      >
        <tags :tags="tags"></tags>
      </div>
      <h2
        class="video-title"
        v-text="video.title"
      ></h2>
    </div>
  </div>
</template>

<script>
import _$split from 'lodash/split'
import JwPlayer from '~/components/JwPlayer'
import Tags from '~/components/home/Tags'

export default {
  name: 'video-large-card',

  components: {
    JwPlayer,
    Tags
  },

  props: {
    video: {
      type: Object,
      required: true
    }
  },

  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    },

    tags () {
      const { tags } = this.video

      return tags === null ? null : _$split(tags, ',')
    }
  },

  methods: {
    onComplete () {
      this.$emit('complete')
    },

    onPause () {
      this.$emit('pause')
    },

    onPlay () {
      this.$emit('play')
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/components/home/_video-large-card.scss';
</style>
