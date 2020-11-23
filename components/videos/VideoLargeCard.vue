<template>
  <div
    class="video-large-card"
    :class="{ 'video-large-card__mobile': isViewportMobile }"
  >
    <div class="player-container">
      <jw-player
        v-if="video && vidType ==='native'"
        :type="vidType"
        :autostart="isViewportMobile"
        :image="video.image"
        :file="video.sources[1].file"
        :sources="video.sources"
        @complete="onComplete"
        @pause="onPause"
        @play="onPlay"
      ></jw-player>
      <jw-player
        v-else-if="video && vidType ==='embed'"
        :autostart="isViewportMobile"
        :image="video.image"
        :file="video.sources[0].file"
        :type="vidType"
        @complete="onComplete"
        @pause="onPause"
        @play="onPlay"
      ></jw-player>
    </div>
  </div>
</template>

<script>
import _$split from 'lodash/split'
import JwPlayer from '~/components/JwPlayer'

export default {
  name: 'video-large-card',

  components: {
    JwPlayer
  },

  props: {
    vidType: {
      type: String,
      required: false,
      default: 'native'
    },
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
@import '~/stylesheets/components/videos/_video-large-card.scss';
</style>
