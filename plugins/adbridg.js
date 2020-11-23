/* eslint-disable */
export default ({ app }) => {
  // Load Google
  window.googletag = window.googletag || {};
  var googletag = window.googletag;
  googletag.cmd = googletag.cmd || [];
  (function () {
    var gads = document.createElement('script');
    gads.async = true;
    gads.type = 'text/javascript';
    gads.src = 'https://www.googletagservices.com/tag/js/gpt.js';
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(gads, node);
  })();

  // Load AdBridg
  window.AdBridg = window.AdBridg || {};
  var AdBridg = window.AdBridg;
  AdBridg.cmd = AdBridg.cmd || [];
  (function() {
    var adb = document.createElement('script');
    adb.async = true;
    adb.type = 'text/javascript';
    adb.src = '//prod.adspsp.com/adb.2716080.min.js';
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(adb, node);

    // Return control to GPT if the AdBridg library fails to load.
    adb.onerror = function() {
      if (AdBridg.exists) { return; }
      document.createElement('IMG').src = 'http://adspsp.com/pt/2716080/3/1/?e=0';
      var dq = [], es;
      dq.process = function() { while(dq.length) { googletag.display(dq.shift()); }}
      AdBridg.defineSlot = function(p, s, d) { return googletag.defineSlot(p, s, d).addService(googletag.pubads()); }
      AdBridg.defineOutOfPageSlot = function(p, d) { return googletag.defineOutOfPageSlot(p, d).addService(googletag.pubads()); }
      AdBridg.destroySlots = function(s) { return googletag.destroySlots(s); }
      AdBridg.display = function(d) { dq.push(d); if (es) { dq.process(); }}
      AdBridg.refresh = function(s, o) { googletag.pubads().refresh(s, o); }
      AdBridg.render = function() { }
      AdBridg.serve = function() { googletag.enableServices(); es=1; dq.process(); }
      AdBridg.sizeMapping = function() { return googletag.sizeMapping(); }
      AdBridg.useSizeMapping = function() { }
      AdBridg.lock = function(s) {if(ls[s]){ls[s]=null;return;}l.push(s);pl()}
      AdBridg.unlock = function(s) {var f=0; for(var i=0;i<l.length;++i){if(l[i]==s){l.splice(i,1);f=1}}; if(!f){ls[s]=1} pl()}
      AdBridg.cmd.push = function(f) {
        if (typeof(f)=='object') {
          var api_fallback = function(o) {
            googletag.cmd.push(function() {
              var u=AdBridg.defineSlot(o.gpt_path,o.size||[],o.dom_id);
              if(o.size_map) {
                var m = googletag.sizeMapping();
                for(var oi=0;oi<o.size_map.length;oi++){m=m.addSize(o.size_map[oi].viewport, o.size_map[oi].sizes);}
                u.defineSizeMapping(m.build());
              }
              if(o.events) {
                if(o.events["gpt.defined"]){o.events["gpt.defined"](u);}
                var fl = function(a,b){if(o.events[a]){googletag.pubads().addEventListener(b,function(e){if(e.slot===u){o.events[a](u,e)}})}}
                fl("gpt.rendered",'slotRenderEnded');
                fl("gpt.viewed",'impressionViewable');
                fl("gpt.visibilityChanged",'slotVisibilityChanged');
              }
            });
          }
          if(f.length){for(var i=0;i<f.length;++i){api_fallback(f[i]);}}else{api_fallback(f);}
          f=function(){AdBridg.serve()}
        }
        return googletag.cmd.push(f);
      }
      while (AdBridg.cmd.length) { AdBridg.cmd.push(AdBridg.cmd.shift()); }
    }
  })();

  AdBridg.cmd.push(function () {
    AdBridg.serve();
  });
}
