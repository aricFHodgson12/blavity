<template>
  <div class="carousel-mobile-view">
    <no-ssr>
      <blavity-slick
        ref="blavitySlick"
        :options="slickOptions"
        @beforeChange="handleBeforeChange"
        @setPosition="handleSetPosition"
      >
        <div
          v-for="(post, index) in articles"
          :key="index"
        >
          <div class="carousel-mobile-view__middle-data__snap-3">
            <img
              v-lazy="image(post)"
              class="carousel-mobile-view__middle-data__snap-3_img"
              :alt="post.title"
              @click="goToArticle(post)"
            >
            <div class="carousel-mobile-view__caraousal-header">
              <div class="carousel-mobile-view__caraousal-header__logo">
                <img
                  src="https://storage.googleapis.com/blavitynews/assets/images/Blavity%20Original%20Logo.png"
                  alt="Blavity Original Logo"
                >
              </div>
            </div>
            <div class="carousel-mobile-view__middle-data__snap-3__news">
              <div class="carousel-mobile-view__middle-data__snap-3__news_img">
                <!-- for Video icon -->
                <!--<img
                  src="https://storage.googleapis.com/blavitynews/assets/images/video-icon-white.png"
                >-->
              </div>
              <p class="carousel-mobile-view__middle-data__snap-3__news_p">
                <nuxt-link :to="'/blavity-original/'+post.slug">
                  {{ post.title }}
                </nuxt-link>
              </p>
              <label class="carousel-mobile-view__middle-data__snap-3__news_label">
                <nuxt-link :to="`/author/${getName(post)}`">
                  By {{ getName(post) }}
                </nuxt-link>
              </label>
            </div>
          </div>
        </div>
      </blavity-slick>
    </no-ssr>
  </div>
</template>

<script>
export default {
  name: 'mobile-blavity-original-carousel-component',

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
        slidesToShow: 1,
        dots: true,
        dotsClass: 'slick-dots',
        variableWidth: false
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
  @import '~/stylesheets/components/_mobile-blavity-original-carousel-component.scss';
</style>
