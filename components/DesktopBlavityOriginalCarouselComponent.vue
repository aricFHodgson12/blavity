<template>
  <div class="carousel-desk-view">
    <div class="carousel-desk-view__caraousal-header">
      <div class="carousel-desk-view__caraousal-header__logo">
        <img
          src="https://storage.googleapis.com/blavitynews/assets/images/Blavity%20Original%20Logo.png"
          alt="Blavity Original Logo"
        >
      </div>
    </div>
    <no-ssr>
      <div class="carousel-desk-view__caraousal-wrapper">
        <div class="carousel-desk-view__caraousal-wrapper_caraousal-wrapper-prev">
          <button
            ref="prevArrow"
            type="button"
            class="carousel-desk-view__caraousal-wrapper_caraousal-wrapper-prev_slick-prev slick-previous"
          >
            <img
              src="https://storage.googleapis.com/blavitynews/assets/images/arrow-left-white%402x.png"
              alt="Navigate Left Icon"
            >
          </button>
        </div>
        <div class="carousel-desk-view__caraousal-wrapper_caraousal-wrapper-area">
          <blavity-slick
            ref="blavitySlick"
            :options="slickOptions"
            @beforeChange="handleBeforeChange"
            @setPosition="handleSetPosition"
          >
            <div
              v-for="(post, index) in articles"
              :key="index"
              class="carousel-desk-view__middle-data"
            >
              <div class="carousel-desk-view__middle-data__snap-3">
                <img
                  v-lazy="image(post)"
                  class="carousel-desk-view__middle-data__snap-3_img"
                  :alt="decodeTitle(post.title)"
                  @click="goToArticle(post)"
                >
                <div class="carousel-desk-view__middle-data__snap-3__news">
                  <div class="carousel-desk-view__middle-data__snap-3__news_img">
                    <!-- for Video icon -->
                    <!--<img
                      src="https://storage.googleapis.com/blavitynews/assets/images/video-icon-white.png"
                    >-->
                  </div>
                  <p class="carousel-desk-view__middle-data__snap-3__news_p">
                    <nuxt-link :to="'/blavity-original/'+post.slug">
                      {{ decodeTitle(post.title) }}
                    </nuxt-link>
                  </p>
                  <label class="carousel-desk-view__middle-data__snap-3__news_label">
                    <nuxt-link
                      v-if="post._author"
                      :to="`/author/${getName(post)}`"
                    >
                      By {{ getName(post) }}
                    </nuxt-link>
                    <nuxt-link
                      v-else
                      to="/"
                    >
                      By Blavity Team
                    </nuxt-link>
                  </label>
                </div>
              </div>
            </div>
          </blavity-slick>
        </div>
        <div class="carousel-desk-view__caraousal-wrapper_caraousal-wrapper-next">
          <button
            ref="nextArrow"
            type="button"
            class="carousel-desk-view__caraousal-wrapper_caraousal-wrapper-next_slick-next slick-nextone"
          >
            <img
              src="https://storage.googleapis.com/blavitynews/assets/images/arrow-right-white%402x.png"
              alt="Navigate Right Icon"
            >
          </button>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import he from 'he'

export default {
  name: 'desktop-blavity-original-carousel-component',

  components: {},

  props: {
    count: {
      type: Number,
      required: true
    },
    articles: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      slickOptions: {
        slidesToShow: 3,
        arrows: true,
        prevArrow: '.slick-previous',
        nextArrow: '.slick-nextone',
        swipeToSlide: true,
        touchMove: true
      },
      details: null
    }
  },

  created () {
  },

  methods: {
    next () {
      this.$refs.slick.next()
    },

    prev () {
      this.$refs.slick.prev()
    },

    reInit () {
      this.$nextTick(() => {
        this.$refs.slick.reSlick()
      })
    },

    handleBeforeChange (event, slick, currentSlide, nextSlide) {
      this.details = {
        name: 'handleBeforeChange',
        event,
        slick,
        currentSlide,
        nextSlide
      }
    },

    handleSetPosition (event, slick) {
      this.details = {
        name: 'handleSetPosition',
        event,
        slick
      }
    },

    decodeTitle (title) {
      return he.decode(title)
    },
    getName (post) {
      /*  eslint-disable */
        // eslint is disbled because we need to use double equals
        if  (!post._author) {
          return 'Blavity'
        }
        if (post._author.display_name == undefined || null || '') {
          return post._author.username
        } else if (! post._author.username && ! this.post._author.display_name) {
          return 'Blavity Team'
        } else { return post._author.display_name }
        /*  eslint-enable */
    },
    image (post) {
      // return this.post.image
      return `https://res.cloudinary.com/blavity/image/upload/c_fit,g_center,h_512,q_auto:best,g_south_east,x_0/${post.wp_featuredImage}`
    },
    goToArticle (post) {
      this.$router.push(`/blavity-original/${post.slug}`)
    }
  }
}
</script>

<style lang="scss">
  @import '~/stylesheets/components/_desktop-blavity-original-carousel-component.scss';
</style>
