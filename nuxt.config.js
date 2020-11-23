const axios = require('axios')
const he = require('he')
// const webpack = require('webpack')

const pkg = require('./package.json')

const ampify = require('./plugins/ampify')
const nativo = require('./plugins/nativo')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    __dangerouslyDisableSanitizers: ['noscript'],
    titleTemplate: (titlePart) => {
      const _$isNull = require('lodash/isNull')
      const _$isUndefined = require('lodash/isUndefined')

      const brandName = 'Blavity News'

      let title

      if (_$isUndefined(titlePart) ||
          _$isNull(titlePart)) {
        title = brandName
      } else {
        title = `${titlePart} - ${brandName}`
      }

      return title
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, minimum-scale=1, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preload', href: 'https://storage.googleapis.com/blavitynews/assets/fonts/TT+Norms/stylesheet.css', as: 'style', onload: "this.onload=null;this.rel='stylesheet'", crossorigin: 'anonymous' },
      { rel: 'preload', href: 'https://storage.googleapis.com/blavitynews/assets/fonts/Miller-Display/stylesheet.css', as: 'style', onload: "this.onload=null;this.rel='stylesheet'", crossorigin: 'anonymous' }
    ],
    script: [
      { src: '//66c37c86af1b42cd94b050774081e5e2.js.ubembed.com', async: true },
      { src: '//platform.instagram.com/en_US/embeds.js', async: true },
      { src: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.3&appId=198373173604740&autoLogAppEvents=1', async: true, defer: true, crossorigin: 'anonymous' },
      { src: '//s.ntv.io/serve/load.js', async: true }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff', height: '1rem' },

  /*
  ** Global CSS
  */
  css: [
    { src: '~stylesheets/common/_global.scss', lang: 'scss' }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/global-components.js' },
    { src: '~/plugins/directives.js' },
    { src: '~/plugins/global-components.no-ssr.js', ssr: false },
    { src: '~/plugins/third-party-packages.js' },
    { src: '~/plugins/third-party-packages.no-ssr.js', ssr: false },
    { src: '~/plugins/adbridg.js', ssr: false },
    { src: '~/plugins/comscore.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    ['@nuxtjs/google-analytics', { id: 'UA-46971527-1' }],
    ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }],
    '@nuxtjs/proxy',
    'nuxt-compress',
    '~/modules/feed',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: process.env.VUE_APP_API_URL || 'https://api.engineering.blavity.com'
    baseURL: process.env.VUE_APP_API_URL || 'https://api1.blavity.com/v1'
  },
  /*
  ** Nuxt PWA module configuration
  */
  pwa: {
    manifest: {
      name: 'Blavity News & Politics',
      short_name: 'Blavity News',
      author: 'Blavity Engineering Team'
    },
    meta: {
      theme_color: '#35212E'
    },
    icon: {
      iconFileName: 'blavity-icon.png'
    }
  },
  /*
  ** Nuxt.js env Property
  */
  env: {
    // See https://nuxtjs.org/api/configuration-env
    HOST_URL: process.env.HOST_URL || 'https://blavity.com/'
  },
  /*
  ** NuxtJS Auth module configuration
  */

  /*
   ** Proxy configuration
   */
  proxy: {
    // See https://github.com/nuxt-community/proxy-module#proxy
    '/ads.txt': 'https://storage.googleapis.com/blavity-media/assets',
    '/robots.txt': 'https://storage.googleapis.com/blavitynews'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  /*
  ** Hooks configuration
  */
  hooks: {
    // This hook is called before saving the html to flat file
    'generate:page': (page) => {
      if (/^\/amp\//gi.test(page.route)) {
        page.html = ampify(page.html)
      }
      if (/\/sponsoredcontent/gi.test(page.route)) {
        page.html = nativo(page.html)
      }
      if (/\/clp/gi.test(page.route)) {
        page.html = nativo(page.html)
      }
    },
    // This hook is called before serving the html to the browser
    'render:route': (url, page, { req, res }) => {
      if (/^\/amp\//gi.test(url)) {
        page.html = ampify(page.html)
      }
      if (/\/sponsoredcontent/gi.test(url)) {
        page.html = nativo(page.html)
      }
      if (/\/clp/gi.test(url)) {
        page.html = nativo(page.html)
      }
    }
  },

  'nuxt-compress': {
    gzip: {
      cache: true
    },
    brotli: {
      threshold: 10240
    }
  },

  feed: [
    {
      path: '/rss',
      async create (feed) {
        const HOST_URL = process.env.HOST_URL || 'https://blavity.com/'
        const AXIOS_BASE_URL = process.env.VUE_APP_API_URL || 'https://api1.blavity.com/v1'

        feed.options = {
          title: 'Blavity News',
          link: HOST_URL,
          description: pkg.description,
          copyright: 'Blavity, Inc.',
          image: HOST_URL + 'favicon.ico'
        }

        const { data } = await axios.get(AXIOS_BASE_URL + '/articles/10')
        data.forEach((post) => {
          let imageUrl = ''
          if (post.wp_featuredImage.includes('//blavity.com/')) {
            imageUrl = post.wp_featuredImage.replace('blavity.com', 'legacy.blavity.com')
          } else if (post.wp_featuredImage.includes('http')) {
            imageUrl = post.wp_featuredImage
          } else {
            imageUrl = 'https://res.cloudinary.com/blavity/image/upload/' + post.wp_featuredImage
          }

          feed.addItem({
            title: he.decode(post.title),
            link: HOST_URL + post.slug,
            guid: HOST_URL + post.slug,
            description: post.excerpt,
            date: new Date(post.createdAt), // will be converted into "pubDate",
            content: post.body, // will be converted into "content:encoded"
            mediaThumbnail: imageUrl,
            advertisement: `
              <script src='https://www.googletagservices.com/tag/js/gpt.js'>
                googletag.pubads().definePassback('/11462305847/bla/passback', [[320, 50], [300, 250]]).setTargeting('psource', ['smartnews']).display();
              </script>
            `
          })
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'smart',
      data: {
        attr: {
          content: 'http://purl.org/rss/1.0/modules/content/',
          dc: 'http://purl.org/dc/elements/1.1/',
          snf: 'http://www.smartnews.be/snf'
        }
      }
    }
  ]
}
