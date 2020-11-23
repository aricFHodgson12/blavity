module.exports = (html) => {
  // remove meta - og tags
  html = html.replace(/<meta[^>]*name="og:[^>]*>/gi, (match) => {
    return (/name\=\"og\:/gi.test(match)) ? '' : match
  })

  // remove script - connect.facebook.net/en_US/sdk.js
  // html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, (match) => {
  //   return (/connect.facebook.net\/en_US\/sdk.js/gi.test(match)) ? '' : match
  // })

  // remove script - //66c37c86af1b42cd94b050774081e5e2.js.ubembed.com
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, (match) => {
    return (/js.ubembed.com/gi.test(match)) ? '' : match
  })

  return html
}
