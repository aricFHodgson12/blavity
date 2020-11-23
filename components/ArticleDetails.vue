<template>
  <div class="article-details">
    <div class="meta-left">
      <nuxt-link
        :to="{name: 'author-name', params: {name: username} }"
        style="text-decoration: none; color: black;"
      >
        <img
          v-if="$mq!=='mobile'"
          v-lazy="avatar"
          class="article-author"
          :alt="name"
        >
      </nuxt-link>
      <span
        v-if="$mq!=='mobile'"
        class="by"
      >
        by
      </span>
      <nuxt-link
        :to="{name: 'author-name', params: {name: username} }"
        style="text-decoration: none; color: black;"
      >
        <h4
          class="article-author-name"
        >
          {{ name }}
        </h4>
      </nuxt-link>
      <h4
        class="article-pub-date"
      >
        {{ getDate }}
      </h4>
      <h4
        class="article-pub-time"
      >
        {{ time }}
      </h4>
      <h4
        v-if="$mq === 'desktop'"
        class="article-author-name"
      >
        <slot name="loginbutton"></slot>
      </h4>
    </div>
    <div
      v-if="!isViewportMobile"
      class="meta-right"
    >
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import _$startsWith from 'lodash/startsWith'

export default {
  name: 'article-details',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  // data () {
  //   return {
  //     name: null
  //   }
  // },

  computed: {
    nFormatter: function () {
      if (this.post.virtual) return ''
      let postViews = parseInt(this.views.replace(/,/g, ''), 10)
      //  console.log(postViews)
      if (postViews >= 1000000) {
        return (postViews / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
      } else if (postViews >= 1000) {
        return (postViews / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
      } else return this.views
    },
    // TODO: Add shares and comments to nFormatter and abstract this functionality away from the component if called for

    getDate () {
      if (this.post.virtual) return ''
      let today = moment()
      let pubDate
      if (this.post.publish_on) {
        pubDate = this.post.publish_on
      } else {
        pubDate = this.post.created_at
      }
      if (pubDate === today) {
        return '| Today,'
      } else return ' | ' + moment(pubDate).format('MMMM DD YYYY') + ','
    },
    name () {
      if (this.post.virtual) return ''
      /*  eslint-disable */
      if (this.post._author.display_name == undefined || null || '') {
        return this.post._author.username
      } else if (! this.post._author.username && ! this.post._author.display_name) {
        return 'Blavity Team'
      } else { return this.post._author.display_name }
      /*  eslint-enable */
    },
    username () {
      if (this.post.virtual) return 'test'
      return this.post._author.username
    },
    time () {
      if (this.post.virtual) return ''
      if (this.post.time) {
        const theTime = new Date(this.post.publish_on).toString().split(' ')
        let returnTime
        if (theTime[4].split(':')[0] > 12) {
          let hour = (theTime[4].split(':')[0] - 12)
          returnTime = theTime[4].split(':').slice(1)
          returnTime.unshift(hour)
          returnTime.pop()
          returnTime = returnTime.join(':') + ' pm'
        } else {
          returnTime = theTime[4].split(':')
          returnTime.pop()
          returnTime = returnTime.join(':') + ' am'
        }
        return returnTime
      } else {
        const theTime = new Date(this.post.created_at).toString().split(' ')
        let returnTime
        if (theTime[4].split(':')[0] > 12) {
          let hour = (theTime[4].split(':')[0] - 12)
          returnTime = theTime[4].split(':').slice(1)
          returnTime.unshift(hour)
          returnTime.pop()
          returnTime = returnTime.join(':') + ' pm'
        } else {
          returnTime = theTime[4].split(':')
          returnTime.pop()
          returnTime = returnTime.join(':') + ' am'
        }
        return returnTime
      }
    },
    avatar () {
    /*  eslint-disable */
      if (this.post.virtual) return ''
      // return this.post.author.avatar
      if (this.post._author.profileImagePreference === null || undefined) {
        return 'https://www.gravatar.com/avatar/18af7cc36f95260c805b2daf843c459c?d=&s=200'
      } else if (this.post._author.profileImagePreference === 'gravatar') {
        return this.post._author.gravatar
      } else if (_$startsWith(this.post._author.profileImagePreference, 'https')) {
        return this.post._author.profileImagePreference
      } else {
        return `https://res.cloudinary.com/blavity/image/upload/c_thumb,g_center,w_40,h_40,q_auto:best,g_south_east,x_0/${this.post._author.profileImagePreference}`
      }
    /*  eslint-enable */
    },

    isViewportMobile () {
      return (this.$mq === 'mobile')
    },
    commentLength () {
      if (this.post.virtual) return ''
      if (this.post.comments) {
        return this.post.comments.length
      } else {
        return 0
      }
    }
  }
}
</script>
