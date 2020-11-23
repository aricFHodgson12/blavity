const ampScripts = {
  'global': '<script async src="https://cdn.ampproject.org/v0.js"></script>',
  'sidebar': '<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>',
  'ad': '<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>',
  'analytics': '<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>',
  'selector': '<script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"></script>'
}
const ampBoilerplate = '<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>'

module.exports = (html) => {
  // Add ⚡(amp) to html tag
  html = html.replace(/<html/gi, '<html amp')

  // Combine css into single tag
  let styleConcat = ''
  html = html.replace(/<style[^>]*data-vue-ssr[^>]*>([^]*?)??<\/style>/gi, (match, sub) => {
    styleConcat += (sub || '').replace(/\!important/gi, '') || ''
    return ''
  })
  html = html.replace('</head>', `<style amp-custom>${styleConcat}</style></head>`)

  // Remove preload and prefetch tags
  html = html.replace(/<link[^>]*rel="(?:preload|prefetch)?"[^>]*>/gi, '')

  // Remove amphtml tag
  // html = html.replace(/<link[^>]*rel="(?:amphtml)?"[^>]*>/gi, '')

  // Remove data attributes from tags
  // html = html.replace(/\s*data-(?:[^=>]*="[^"]*"|[^=>\s]*)/gi, '')

  // Remove JS script tags except for ld+json
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, (match) => {
    return (/application\/ld\+json/gi.test(match)) ? match : ''
  })

  // Replace img tags with amp-img
  // html = html.replace(/<img([^>]*)>/gi, (match, sub) => {
  //   return `<amp-img ${sub} layout=intrinsic></amp-img>`
  // })

  // replace twitter widget
  html = html.replace(/<blockquote([^>]*twitter-tweet[^>]*)>([^]*?)??<\/blockquote>/gi, (match, attr, content) => {
    let regStr = new RegExp('https?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0–9_.]+)\/status\/([0-9]+)')
    let result = regStr.exec(content)
    if (! result) return match
    let tweetID = result[2]
    if (! ampScripts.twitter) {
      ampScripts.twitter = '<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>'
    }
    return '<amp-twitter data-tweetid="' + tweetID + '" width="375" height="472" layout="responsive"><div placeholder>' + content + '</div></amp-twitter>'
  })

  // replace instagram widget
  html = html.replace(/<blockquote([^>]*instagram-media[^>]*)>([^]*?)??<\/blockquote>/gi, (match, attr, content) => {
    let regStr = new RegExp('(https?:\/\/(?:www\.)?instagram\.com\/p\/([^/?#&]+)).*', 'gi')
    let result = regStr.exec(attr)
    if (! result) return match
    let postID = result[2]
    let isCaptionted = /data-instgrm-captioned/gi.test(attr)
    if (! ampScripts.instagram) {
      ampScripts.instagram = '<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>'
    }
    return '<amp-instagram data-shortcode="' + postID + '" width="1" height="1" layout="responsive" ' + (isCaptionted ? 'data-captioned ' : '') + attr + '><div placeholder>' + content + '</div></amp-instagram>'
  })

  // replace iframe into amp-iframe
  html = html.replace(/<iframe([^>]*)>([^]*?)??<\/iframe>/gi, (match, attr, content) => {
    let regStr = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    let result = attr.match(regStr)
    let youtubeID = ''
    if (result && result[2].length >= 11) {
      youtubeID = result[2].slice(0, 11)
    }

    if (youtubeID) {
      if (! ampScripts.youtube) {
        ampScripts.youtube = '<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>'
      }
      let sizeAttr = attr.split(' ').filter((key) => key.includes('width=') || key.includes('height=')).join(' ')
      return '<amp-youtube data-videoid="' + youtubeID + '" layout="responsive" ' + sizeAttr + '></amp-youtube>'
    } else {
      if (! ampScripts.iframe) {
        ampScripts.iframe = '<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>'
      }
      attr = attr.replace(/\=\"true\"/gi, '')
      return '<amp-iframe sandbox="allow-scripts allow-same-origin" layout="responsive" ' + attr + '>' + (content || '') + '</amp-iframe>'
    }
  })

  // move amp-sticky-ad at the end of body
  let stickyAdHtml = ''
  html = html.replace(/<amp-sticky-ad\b[^<]*(?:(?!<\/amp-sticky-ad>)<[^<]*)*<\/amp-sticky-ad>/gi, (match) => {
    stickyAdHtml += match || ''
    if (! ampScripts.stickyAd) {
      ampScripts.stickyAd = '<script async custom-element="amp-sticky-ad" src="https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js"></script>'
    }
    return ''
  })
  html = html.replace('</body>', stickyAdHtml + '</body>')

  // Add amp-sidebar before the end of body
  let sidebarHtml = ''
  html = html.replace(/<amp-sidebar([^>]*)>([^]*?)??<\/amp-sidebar>/gi, (match, attr, content) => {
    sidebarHtml += match
    return ''
  })
  html = html.replace('</body>', sidebarHtml + '</body>')

  // Add googleanalytics before </body>
  html = html.replace('</body>', `
    <amp-analytics type="googleanalytics">
      <script type="application/json">
        {
          "vars": {
            "account": "UA-46971527-5"
          }
        }
      </script>
    </amp-analytics></body>
  `)

  // Add AMP script before </head>
  html = html.replace('</head>', Object.values(ampScripts).join('') + ampBoilerplate + '</head>')

  return html
}
