<template>
  <div class="top-stories-carousel">
    <no-ssr>
      <blavity-slick
        ref="topStoriesCarousel"
        :options="slickOptions"
        @beforeChange="handleBeforeChange"
        @setPosition="handleSetPosition"
      >
        <div
          v-for="(post, index) in articles"
          :key="index"
        >
          <div class="top-stories-carousel__middle-data__snap-3">
            <img
              v-lazy="image(post)"
              class="top-stories-carousel__middle-data__snap-3_img"
              :alt="decodeTitle(post.title)"
              @click="goToArticle(post)"
            >
            <div class="top-stories-carousel__caraousal-header">
            </div>
            <div class="top-stories-carousel__middle-data__snap-3__news">
              <div class="top-stories-carousel__middle-data__snap-3__news_img">
              </div>
              <p class="top-stories-carousel__middle-data__snap-3__news_p">
                <nuxt-link :to="'/'+post.slug">
                  {{ decodeTitle(post.title) }}
                </nuxt-link>
              </p>
              <label class="top-stories-carousel__middle-data__snap-3__news_label">
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
import he from 'he'
import { testArticles } from '~/utils/dataStructures.js'

export default {
  name: 'top-stories-carousel',

  components: {},

  props: {
    articles: {
      type: Array,
      required: false,
      default: () => ([
        ...testArticles
      ])
    }
  },

  data () {
    return {
      slickOptions: {
        slidesToShow: 1
      },
      details: null
    }
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
    goToArticle (post) {
      this.$router.push(`/${post.slug}`)
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/components/top-stories/_top-stories-carousel.scss';
</style>
