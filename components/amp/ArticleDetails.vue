<template>
  <div class="article-details">
    <amp-img
      :src="avatar"
      class="article-author"
      layout="fixed"
      alt="article-author"
      width="30"
      height="30"
    ></amp-img>
    <div class="artile-details-meta">
      <div class="meta-left">
        <span
          class="by"
        >
          by
        </span>
        <h4
          class="article-author-name"
        >
          {{ name }}
        </h4>
        <h4
          class="article-pub-date"
        >
          {{ getDate }}
        </h4>
        <!-- <span class="article-pub-date">| Today,</span> -->
        <h4
          class="article-pub-time"
        >
          {{ time }}
        </h4>
      </div>
      <div class="article-image-details">
        <span class="photo-credit">Photo credit:{{ caption }} </span>
        <span
          class="imgSrc"
        >{{ post.imageSrc }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'amp-article-details',
  props: {
    post: {
      type: Object,
      required: true
    },
    views: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      required: true
    }
  },

  computed: {
    nFormatter: function () {
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
      // let today = moment().format('MMMM DD YYYY')
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
      /*  eslint-disable */
      if (this.post._author.display_name == undefined || null || '') {
        return this.post._author.username
      } else if (! this.post._author.username && ! this.post._author.display_name) {
        return 'Blavity Team'
      } else { return this.post._author.display_name }
      /*  eslint-enable */
    },
    time () {
    //  return this.post.time
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
      // return this.post.author.avatar
      return this.post._author.gravatar
    },
    commentLength () {
      if (this.post.comments) {
        return this.post.comments.length
      } else {
        return 0
      }
    }
  }

  // TODO: Is the date supposed to only say Today and never yesterday? If so, write functionality to determine if it is today and print date if it is not
}
</script>
