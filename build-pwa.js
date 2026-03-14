/**
 * Builds PWA index.html from Combination 3 books app.
 * Run: node build-pwa.js
 */
const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '..', 'Combination 3 books', 'Mafaheemintelligent Combined 3 Books.html');
const outPath = path.join(__dirname, 'index.html');

let html = fs.readFileSync(sourcePath, 'utf8');

// PWA meta + manifest (after charset, before </head>)
const pwaHead = `
    <meta name="theme-color" content="#2c3e50">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Mafaheem">
    <link rel="manifest" href="manifest.json">
    <link rel="apple-touch-icon" href="icons/icon-192.png">`;

html = html.replace(/<meta charset="UTF-8">/, '<meta charset="UTF-8">' + pwaHead);

// Update banner + service worker with update detection (before </body>)
const updateBanner = `
<div id="update-banner" style="display:none; position:fixed; bottom:20px; left:50%; transform:translateX(-50%); max-width:420px; width:calc(100% - 40px); background:#1e3a5f; color:white; padding:12px 18px; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.25); z-index:9999; align-items:center; gap:14px; box-sizing:border-box;">
  <span style="flex:1; min-width:0;">A new update is available for Mafaheem!</span>
  <button onclick="prepareUpdate()" style="background:#2d8a5e; color:white; border:none; padding:8px 16px; border-radius:8px; cursor:pointer; font-weight:600; flex-shrink:0;">Update Now</button>
</div>`;
const swScript = `
<script>
(function() {
  var newWorker;
  window.prepareUpdate = function() {
    var b = document.getElementById('update-banner');
    if (!b) return;
    if (location.protocol === 'file:') {
      b.style.display = 'none';
      return;
    }
    if (typeof newWorker !== 'undefined' && newWorker) {
      newWorker.postMessage({ action: 'skipWaiting' });
    } else {
      b.style.display = 'none';
    }
  };
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js').then(function(reg) {
        reg.addEventListener('updatefound', function() {
          newWorker = reg.installing;
          newWorker.addEventListener('statechange', function() {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              var el = document.getElementById('update-banner');
              if (el) { el.style.display = 'flex'; el.style.flexDirection = 'row'; el.style.justifyContent = 'space-between'; el.style.flexWrap = 'wrap'; }
            }
          });
        });
      }).catch(function() {});
    });
    var refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', function() {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  }
})();
</script>`;
html = html.replace('</body>', updateBanner + '\n' + swScript + '\n</body>');

fs.writeFileSync(outPath, html, 'utf8');
console.log('Built: index.html');
