/* eslint-disable */

export default ({ app }) => {
  const fireBeacon = function() {
    window._comscore = window._comscore || []
    window._comscore.push({ c1: "2", c2: "22819004" })

    var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
    s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
    el.parentNode.insertBefore(s, el);
  }

  fireBeacon() // Record initial impression

  // Watch the URL for changes and record additional impressions
  var currentLocation = window.location.href

  setInterval(function() {
    if (currentLocation !== window.location.href) {
      fireBeacon()
      currentLocation = window.location.href
    }
  }, 1000)
}
