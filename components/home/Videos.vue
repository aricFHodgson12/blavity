<template>
  <div class="home-videos">
    <div class="container">
      <h2 class="section-title">
        {{ title }}
      </h2>
      <div
        v-if="isViewportMobile"
        class="home-videos__mobile"
      >
        <no-ssr>
          <blavity-slick
            ref="slick"
            :options="slickOptions"
          >
            <div
              v-for="video in videos"
              :key="video.mediaid"
              class="small-card-container"
            >
              <video-small-card
                :active="isActiveVideo(video)"
                :playing="playing"
                :description="video.description"
                :tags="video.tags"
                :title="video.title"
                :thumb="video.images[0].src"
                :video-id="video.mediaid"
                @play="selectVideo"
              ></video-small-card>
            </div>
          </blavity-slick>
        </no-ssr>
        <video-large-card
          v-if="playing"
          :video="activeVideo"
          @complete="onComplete"
          @pause="onPause"
          @play="onPlay"
        ></video-large-card>
      </div>
      <div
        v-else
        class="home-videos__desktop"
      >
        <div class="grid-container">
          <div class="grid-row">
            <div
              class="large-card-container"
            >
              <video-large-card
                :video="activeVideo"
                @complete="onComplete"
                @pause="onPause"
                @play="onPlay"
              ></video-large-card>
            </div>
            <div class="small-cards-container">
              <div
                v-for="video in videos"
                :key="video._id"
                class="small-card-container"
              >
                <video-small-card
                  :active="isActiveVideo(video)"
                  :playing="playing"
                  :description="video.description"
                  :tags="video.tags"
                  :title="video.title"
                  :thumb="video.images[0].src"
                  :video-id="video.mediaid"
                  @play="selectVideo"
                ></video-small-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _$find from 'lodash/find'
import VideoLargeCard from '~/components/home/VideoLargeCard'
import VideoSmallCard from '~/components/home/VideoSmallCard'

export default {
  name: 'home-videos',

  components: {
    VideoLargeCard,
    VideoSmallCard
  },

  props: {
    videos: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      playing: false,
      activeVideo: this.videos[0],
      slickOptions: {
        arrows: false,
        dots: false,
        infinite: false,
        slidesToShow: 1,
        variableWidth: true
      }
    }
  },

  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    }
  },

  methods: {
    isActiveVideo (video) {
      return ((! this.isViewportMobile) && (this.activeVideo.mediaid === video.mediaid))
    },

    selectVideo (videoId) {
      this.activeVideo = _$find(this.videos, ['mediaid', videoId])

      if (this.isViewportMobile) {
        this.playing = true
      }
    },

    onComplete () {
      this.playing = false
    },

    onPause () {
      this.playing = false
    },

    onPlay () {
      this.playing = true
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/components/home/_videos.scss';
</style>
