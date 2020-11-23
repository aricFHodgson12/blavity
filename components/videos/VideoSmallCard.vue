<template>
  <div
    class="video-small-card"
    :class="{ 'video-small-card__active': active, 'video-small-card__playing': active && playing }"
  >
    <div
      v-if="isViewportMobile"
      class="video-small-card__mobile"
      @click="onClickPlay"
    >
      <div class="thumb-container">
        <img
          :src="thumb"
          :alt="title"
        >
      </div>
      <div class="content">
        <div class="content__header">
          <button
            class="btn-play"
          ></button>
          <h3>
            <b>blavity: </b>News
          </h3>
        </div>
        <div
          v-if="tagsArray"
          class="tags-container"
        >
          <tags :tags="tagsArray"></tags>
        </div>
        <p
          class="video-title"
          v-text="title"
        ></p>
      </div>
    </div>
    <div
      v-else
      class="video-small-card__desktop"
    >
      <div
        class="thumb-container"
        @click="onClickPlay"
      >
        <img
          :src="thumb"
          :alt="title"
        >
      </div>
    </div>
  </div>
</template>

<script>
import _$split from 'lodash/split'
import _$take from 'lodash/take'
import Tags from '~/components/home/Tags'

export default {
  name: 'video-small-card',

  components: {
    Tags
  },

  props: {
    active: {
      type: Boolean,
      required: false,
      default: false
    },

    description: {
      type: String,
      required: true
    },

    playing: {
      type: Boolean,
      required: false,
      default: false
    },

    tags: {
      required: true,
      validator: (value) => (typeof value === 'string' || value === null)
    },

    title: {
      type: String,
      required: true
    },

    thumb: {
      type: String,
      required: true
    },

    videoId: {
      type: String,
      required: true
    }
  },

  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    },

    tagsArray () {
      return this.tags === null ? [] : _$take(_$split(this.tags, ','), 2)
    }
  },

  methods: {
    onClickPlay () {
      this.$emit('play', this.videoId)
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/components/videos/_video-small-card.scss';
</style>
