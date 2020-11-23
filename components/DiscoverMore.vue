<template>
  <div class="discover-more-component">
    <div class="section2">
      <div class="heading-content">
        <h2>Discover More ‘Current Events’</h2>
      </div>
      <div
        :class="classObject"
      >
        <div
          v-for="(item, index) in articles"
          :key="index"
          class="events-card"
        >
          <div class="card-img">
            <nuxt-link :to="'/'+item.slug">
              <img
                v-lazy="`https://res.cloudinary.com/blavity/image/upload/c_fit,g_center,w_600,q_auto:best,g_south_east,x_0/${item.wp_featuredImage}`"
                class="img-fluid"
                :alt="decodeTitle(item.title)"
              >
            </nuxt-link>
          </div>
          <div class="mob-text">
            <div>
              <span
                v-for="(category, catindex) in item.categories.slice(0, 1)"
                :key="catindex"
              >
                <nuxt-link
                  to="#"
                >
                  <span :style="tagName">
                    {{ category.name }}
                  </span>
                </nuxt-link>
              </span>
            </div>
            <div class="card-content-text">
              <nuxt-link
                :to="'/'+item.slug"
              >
                <p>
                  {{ decodeTitle(item.title) }}
                </p>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import he from 'he'

export default {
  name: 'discover-more',
  props: {
    articles: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      errorMessage: {},
      tagName: {
        color: '#FF542F',
        textTransform: 'capitalize'
      },
      count: null
    }
  },

  computed: {
    classObject () {
      if (this.$mq === 'mobile') {
        return {
          cardwrapper: false,
          'cardwrapper-mobile': true
        }
      } else {
        return {
          cardwrapper: true,
          'cardwrapper-mobile': false
        }
      }
    }
  },

  methods: {
    decodeTitle (title) {
      return he.decode(title)
    }
  }
}
</script>

<style lang="scss">
  @import '~/stylesheets/components/_discover-more-component.scss';
</style>
