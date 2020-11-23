<template>
  <div class="videos-header">
    <div class="container">
      <div
        v-if="isViewportMobile"
        class="videos-header__mobile"
      >
        <no-ssr>
          <div
            v-for="video in mobileVideos"
            :key="video._id"
            class="small-card-container"
          >
            <video-small-card
              :active="isActiveVideo(video)"
              :playing="playing"
              :description="video.description"
              :tags="video.tags"
              :title="video.title"
              :thumb="video.imgThumb"
              :video-id="video._id"
              @play="selectVideo"
            ></video-small-card>
          </div>
        </no-ssr>
        <video-large-card
          v-if="playing"
          :key="cardKey"
          :video="activeVideo"
          :vid-type="vidType(activeVideo)"
          @complete="onComplete"
          @pause="onPause"
          @play="onPlay"
        ></video-large-card>
        <div class="small-card__row">
          <div class="small-card__container--mobile">
            <no-ssr>
              <blavity-slick
                :key="key"
                ref="small-cards"
                :options="smallCardOptions"
              >
                <div
                  v-for="video in videos"
                  :key="video._id"
                  class="small-card-container__slick"
                >
                  <video-small-card
                    :active="isActiveVideo(video)"
                    :playing="playing"
                    :description="video.description"
                    :tags="video.tags"
                    :title="video.title"
                    :thumb="video.imgThumb"
                    :video-id="video._id"
                    @play="selectVideo"
                  ></video-small-card>
                </div>
              </blavity-slick>
            </no-ssr>
          </div>
        </div>
      </div>
      <div
        v-else
        class="videos-header__desktop"
      >
        <div class="grid-container">
          <div class="grid-row">
            <div
              class="large-card-container"
            >
              <video-large-card
                :key="cardKey+1"
                :video="activeVideo"
                :vid-type="vidType(activeVideo)"
                @complete="onComplete"
                @pause="onPause"
                @play="onPlay"
              ></video-large-card>
            </div>
            <div class="side-container">
              <h3>Advertisement</h3>
              <div class="ad-300by250">
                <slot name="ads"></slot>
              </div>
              <h2
                v-if="showTitle"
                class="title"
              >
                <span v-text="activeVideo.title"></span>
              </h2>
            </div>
          </div>
          <div class="small-card__row">
            <div class="small-card__container">
              <no-ssr>
                <blavity-slick
                  :key="key"
                  ref="small-cards"
                  :options="smallCardOptions"
                >
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
                      :thumb="video.imgThumb"
                      :video-id="video._id"
                      @play="selectVideo"
                    ></video-small-card>
                  </div>
                </blavity-slick>
              </no-ssr>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _$find from 'lodash/find'
import VideoLargeCard from '~/components/videos/VideoLargeCard'
import VideoSmallCard from '~/components/videos/VideoSmallCard'

export default {
  name: 'videos',

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
      mobileVideos: [this.videos[0]],
      playing: false,
      showTitle: true,
      activeVideo: this.videos[0],
      cardKey: 1,
      key: 1,
      slickOptions: {
        arrows: false,
        dots: false,
        infinite: false,
        slidesToShow: 1,
        variableWidth: true
      },
      smallCardOptions: {
        arrows: true,
        infinite: true,
        slidesToShow: 5,
        swipeToSlide: true,
        touchMove: true,
        dots: false,
        variableWidth: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              arrows: false,
              slidesToShow: 2
            }
          }
        ]
      }
    }
  },
  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    }
  },
  methods: {
    getThumb (video) {
      if (video.imgThumb) {
        return video.imgThumb
      } else if (! video.imgThumb && video.images[0].src) {
        return video.images[0].src
      } else {
        return 'https://storage.googleapis.com/blavitynews/assets/images/Blavity-News-White%402x.png'
      }
    },
    getVidId (video) {
      if (video.mediaid) {
        return video.mediaid
      } else if (! video.mediaid && video._id) {
        return video._id
      }
    },
    getVidTags (video) {
      if (typeof (video.tags) === 'string') {
        return video.tags
      } else {
        return video.tags.join(',')
      }
    },
    vidType (video) {
      if (video.type) {
        return video.type
      } else {
        return 'native'
      }
    },
    isActiveVideo (video) {
      return ((! this.isViewportMobile) && (this.activeVideo._id === video._id))
    },

    selectVideo (videoId) {
      this.activeVideo = _$find(this.videos, ['_id', videoId])

      if (this.isViewportMobile) {
        this.playing = true
      }
      this.cardKey ++
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
@import '~/stylesheets/components/videos/_video-header.scss';
</style>
