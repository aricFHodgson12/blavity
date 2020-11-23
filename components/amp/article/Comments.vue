<template>
  <div
    class="article-comments"
    :class="{ collapsed: collapsed }"
  >
    <hr style="margin-bottom:24px">
    <button
      class="btn-toggler"
      @click="toggle"
    >
      Leave a Comment <span></span>
    </button>
    <hr style="margin-top:24px">
    <div class="items">
      <div
        v-for="(comment, index) in comments"
        :key="index"
        v-text="comment"
      ></div>
      <no-ssr>
        <div
          :id="baseUrl"
          :permalink="permalink"
        >
          <div
            id="fb_thread"
            class="text-xs-center"
          >
            <div
              class="fb-comments"
              :data-href="baseUrl"
              data-numposts="5"
              data-width="100%"
            ></div>
          </div>
          <div
            :id="fbId"
          ></div>
          <script>
            window.fbAsyncInit = function() {
            FB.init({
            appId            : {{ $store.state.appId }},
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v3.3'
            });
            };
            FB.XFBML.parse(document.getElementById('{{ baseUrl }}'));
          </script>
          <!-- <script>
          //   (function (d, s, id) {
          //   var js
          //   var fjs = d.getElementsByTagName(s)[{{number}}]
          //   if (d.getElementById(id)) return
          //   js = d.createElement(s); js.id = id
          //   js.src = `//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.3&appId={{$store.state.appId}}`
          //   fjs.parentNode.insertBefore(js, fjs)
          // }(document, 'script', 'facebook-jssdk'))
        </script> -->
        </div>
      </no-ssr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'amp-comments',

  props: {
    comments: {
      type: Array,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    fbId: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      collapsed: true
    }
  },

  computed: {
    cntComments () {
      if (this.comments) {
        return this.comments.length
      } else {
        return 0
      }
    },
    baseUrl () {
      return `https://blavity.com/${this.url}`
    },
    permalink () {
      return `https://blavity.com/${this.url}`
    }
  },

  methods: {
    toggle () {
      this.collapsed = (! this.collapsed)
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/amp/components/_article-comments.scss'
</style>
