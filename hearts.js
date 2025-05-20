// hearts (1).js - updated

// First include the heart canvas animation from script.js
window.requestAnimationFrame =
    window.__requestAnimationFrame ||
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        (function () {
            return function (callback, element) {
                var lastTime = element.__lastTime;
                if (lastTime === undefined) {
                    lastTime = 0;
                }
                var currTime = Date.now();
                var timeToCall = Math.max(1, 33 - (currTime - lastTime));
                window.setTimeout(callback, timeToCall);
                element.__lastTime = currTime + timeToCall;
            };
        })();

window.isDevice = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(((navigator.userAgent || navigator.vendor || window.opera)).toLowerCase()));
var loaded = false;
var init = function () {
    if (loaded) return;
    loaded = true;
    var mobile = window.isDevice;
    var koef = mobile ? 0.5 : 1;
    var canvas = document.getElementById('heart');
    var ctx = canvas.getContext('2d');
    var width = canvas.width = koef * innerWidth;
    var height = canvas.height = koef * innerHeight;
    var rand = Math.random;
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, width, height);

    var heartPosition = function (rad) {
        return [Math.pow(Math.sin(rad), 3), -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad))];
    };
    var scaleAndTranslate = function (pos, sx, sy, dx, dy) {
        return [dx + pos[0] * sx, dy + pos[1] * sy];
    };

    window.addEventListener('resize', function () {
        width = canvas.width = koef * innerWidth;
        height = canvas.height = koef * innerHeight;
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, width, height);
    });

    var traceCount = mobile ? 20 : 50;
    var pointsOrigin = [];
    var i;
    var dr = mobile ? 0.3 : 0.1;
    for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
    for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0));
    for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));
    var heartPointsCount = pointsOrigin.length;

    var targetPoints = [];
    var pulse = function (kx, ky) {
        for (i = 0; i < pointsOrigin.length; i++) {
            targetPoints[i] = [];
            targetPoints[i][0] = kx * pointsOrigin[i][0] + width / 2;
            targetPoints[i][1] = ky * pointsOrigin[i][1] + height / 2;
        }
    };

    var e = [];
    for (i = 0; i < heartPointsCount; i++) {
        var x = rand() * width;
        var y = rand() * height;
        e[i] = {
            vx: 0,
            vy: 0,
            R: 2,
            speed: rand() + 5,
            q: ~~(rand() * heartPointsCount),
            D: 2 * (i % 2) - 1,
            force: 0.2 * rand() + 0.7,
            f: "hsla(0," + ~~(40 * rand() + 60) + "%," + ~~(60 * rand() + 20) + "%,.3)",
            trace: []
        };
        for (var k = 0; k < traceCount; k++) e[i].trace[k] = {x: x, y: y};
    }

    var config = {
        traceK: 0.4,
        timeDelta: 0.01
    };

    var time = 0;
    var loop = function () {
        var n = -Math.cos(time);
        pulse((1 + n) * .5, (1 + n) * .5);
        time += ((Math.sin(time)) < 0 ? 9 : (n > 0.8) ? .2 : 1) * config.timeDelta;
        ctx.fillStyle = "rgba(0,0,0,.1)";
        ctx.fillRect(0, 0, width, height);
        for (i = e.length; i--;) {
            var u = e[i];
            var q = targetPoints[u.q];
            var dx = u.trace[0].x - q[0];
            var dy = u.trace[0].y - q[1];
            var length = Math.sqrt(dx * dx + dy * dy);
            if (10 > length) {
                if (0.95 < rand()) {
                    u.q = ~~(rand() * heartPointsCount);
                }
                else {
                    if (0.99 < rand()) {
                        u.D *= -1;
                    }
                    u.q += u.D;
                    u.q %= heartPointsCount;
                    if (0 > u.q) {
                        u.q += heartPointsCount;
                    }
                }
            }
            u.vx += -dx / length * u.speed;
            u.vy += -dy / length * u.speed;
            u.trace[0].x += u.vx;
            u.trace[0].y += u.vy;
            u.vx *= u.force;
            u.vy *= u.force;
            for (k = 0; k < u.trace.length - 1;) {
                var T = u.trace[k];
                var N = u.trace[++k];
                N.x -= config.traceK * (N.x - T.x);
                N.y -= config.traceK * (N.y - T.y);
            }
            ctx.fillStyle = u.f;
            for (k = 0; k < u.trace.length; k++) {
                ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1);
            }
        }

        window.requestAnimationFrame(loop, canvas);
    };
    loop();
};

var s = document.readyState;
if (s === 'complete' || s === 'loaded' || s === 'interactive') init();
else document.addEventListener('DOMContentLoaded', init, false);

// Then include the existing hearts (1).js content
function createBackgroundHearts(count = 25) {
    const colors = ['#ffb3c6', '#ffccd5', '#fff0f3', '#ff8fab'];
    [... rest of the existing hearts (1).js content ...]







// hearts.j
function createBackgroundHearts(count = 25) {
    const colors = ['#ffb3c6', '#ffccd5', '#fff0f3', '#ff8fab']; // Softer, more pastel colors
  
    for (let i = 0; i < count; i++) {
      const heart = document.createElement("div");
      heart.className = "heart heart-back"; // Always in background
      
      // Smaller sizes for subtle background effect
      const size = 5 + Math.random() * 50;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      heart.style.width = heart.style.height = `${size}px`;
      heart.style.left = Math.random() * 100 + "vw";
      // Slower movement for background elements
      heart.style.animationDuration = (15 + Math.random() * 15) + "s";
      heart.style.animationDelay = Math.random() * 1 + "s";
      // Lower opacity for background
      heart.style.opacity = 0.2 + Math.random() * 0.7;
      heart.style.background = color;
      heart.style.setProperty('--heart-color', color);
      heart.style.setProperty('--heart-size', `${size}px`);
      
      // Start below viewport
      heart.style.bottom = -size + "px";
      
      // Gentle sway
      const xMovement = (Math.random() - 0.5) * 100;
      heart.style.setProperty('--x-movement', `${xMovement}vw`);
      
      document.body.appendChild(heart);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    createBackgroundHearts(30);
  });
  // Video audio control
document.addEventListener('DOMContentLoaded', function() {
    const lightboxVideo = document.getElementById('lightbox-video');
    const videoThumbnail = document.querySelector('.gallery-video');
    
    // When lightbox opens
    document.querySelector('a[href="#videopreview"]').addEventListener('click', function() {
      // Unmute and play when lightbox opens
      setTimeout(() => {
        if (lightboxVideo) {
          lightboxVideo.muted = false;
          lightboxVideo.play();
        }
      }, 300); // Small delay to allow lightbox to open
    });
    
    // When lightbox closes
    document.querySelector('a[href="#videopreview"]').addEventListener('click', function(e) {
      if (e.target === this) {
        if (lightboxVideo) {
          lightboxVideo.pause();
          lightboxVideo.currentTime = 0;
        }
        if (videoThumbnail) {
          videoThumbnail.muted = true;
        }
      }
    });
    
    // Pause video when closing lightbox with escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.currentTime = 0;
      }
    });
  });
// Update DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  createBackgroundHearts(30);
  createConfetti(); // Add confetti for birthday
});function arrangeRandomPhotos() {
  const container = document.querySelector('.love-letter-wrapper');
  const photos = document.querySelectorAll('.loveletter-bg-photos img');
  const containerRect = container.getBoundingClientRect();
  const padding = 20; // Minimum space between photos
  const placedPhotos = []; // Track placed photos for collision detection

  photos.forEach(img => {
    // Set initial dimensions (needed for collision detection)
    img.style.width = 'auto';
    img.style.height = 'auto';
    img.style.maxWidth = '400px';
    img.style.maxHeight = '400px';
    
    // Get actual image dimensions after setting styles
    const imgWidth = img.clientWidth;
    const imgHeight = img.clientHeight;
    
    let attempts = 0;
    let positionFound = false;
    let randomLeft, randomTop;

    // Try to find a non-overlapping position (max 50 attempts)
    while (!positionFound && attempts < 50) {
      // Calculate max positions to keep images fully visible
      const maxLeft = containerRect.width - imgWidth - padding;
      const maxTop = containerRect.height - imgHeight - padding;
      
      // Random position within container bounds
      randomLeft = padding + Math.random() * maxLeft;
      randomTop = padding + Math.random() * maxTop;
      
      // Random rotation (-15 to 15 degrees)
      const rotation = -15 + Math.random() * 30;
      
      // Check for collisions with existing photos
      const collides = placedPhotos.some(placedPhoto => {
        return (
          randomLeft < placedPhoto.right + padding &&
          randomLeft + imgWidth + padding > placedPhoto.left &&
          randomTop < placedPhoto.bottom + padding &&
          randomTop + imgHeight + padding > placedPhoto.top
        );
      });
      
      if (!collides) {
        positionFound = true;
        
        // Store this photo's position for future checks
        placedPhotos.push({
          left: randomLeft,
          top: randomTop,
          right: randomLeft + imgWidth,
          bottom: randomTop + imgHeight
        });
        
        // Apply styles
        img.style.position = 'absolute';
        img.style.left = `${randomLeft}px`;
        img.style.top = `${randomTop}px`;
        img.style.transform = `rotate(${rotation}deg)`;
        
        // Random z-index for layering
        img.style.zIndex = Math.floor(Math.random() * 5);
      }
      
      attempts++;
    }

    // If no position found after attempts, place it anyway (might overlap)
    if (!positionFound) {
      img.style.position = 'absolute';
      img.style.left = `${randomLeft}px`;
      img.style.top = `${randomTop}px`;
      img.style.transform = `rotate(${rotation}deg)`;
      img.style.zIndex = Math.floor(Math.random() * 5);
    }
  });
}
// Call on load and window resize
document.addEventListener("DOMContentLoaded", arrangeRandomPhotos);
window.addEventListener('resize', arrangeRandomPhotos);




// Email notification system for user activity
document.addEventListener("DOMContentLoaded", function() {
  // Only run on bd.html page
  if (!window.location.pathname.includes('bd.html')) return;

  let lastActivityTime = Date.now();
  let emailInterval;
  const userName = localStorage.getItem('userName') || 'Anonymous User';

  // Function to send email notification
  function sendActivityEmail() {
    const formSubmitToken = "ba3716d5a03e254094b30e484d499291"; // Your FormSubmit token
    const duration = Math.floor((Date.now() - lastActivityTime) / 60000); // Minutes
    
    fetch(`https://formsubmit.co/ajax/${formSubmitToken}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: "User Activity Tracker",
        _subject: `❤️ ${userName} is still on your site`,
        message: `${userName} has been active for ${duration} minutes (since ${new Date(lastActivityTime).toLocaleTimeString()})`,
        _template: "table"
      })
    })
    .then(response => response.json())
    .then(data => console.log("Activity email sent:", data))
    .catch(error => console.error("Email error:", error));
  }

  // Start monitoring
  function startActivityMonitor() {
    // Send initial email
    sendActivityEmail();
    
    // Set interval for subsequent emails (10 minutes)
    emailInterval = setInterval(sendActivityEmail, 5 * 60 * 1000);
    
    // Update last activity on any user interaction
    ['mousemove', 'click', 'scroll', 'keypress'].forEach(event => {
      document.addEventListener(event, () => {
        lastActivityTime = Date.now();
      });
    });
  }

  // Stop monitoring
  function stopActivityMonitor() {
    clearInterval(emailInterval);
  }

  // Start when page loads
  startActivityMonitor();
  
  // Stop when user leaves
  window.addEventListener('beforeunload', stopActivityMonitor);
});






// In hearts.js
let active = true;

function checkActivity() {
  const now = Date.now();
  // Consider inactive if no activity for 5 minutes
  active = (now - lastActivityTime) < 300000; 
  return active;
}

function sendActivityEmail() {
  if (!checkActivity()) {
    console.log("User inactive - skipping email");
    return;
  }
  // Rest of email sending code...
}

// Add visibility change detection
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    active = false;
  } else {
    active = true;
    lastActivityTime = Date.now();
  }
});


// This would require server-side code or a proxy to fetch thumbnails
async function loadReelThumbnails() {
  const reelLinks = [
    'https://www.instagram.com/reel/DICAu3GtZzO/',
    'https://www.instagram.com/reel/DHoCVFnS3fs/',
    // Add all reel URLs
  ];
  
  const reelGrid = document.querySelector('.reels-grid');
  
  for (const url of reelLinks) {
    try {
      const thumbnailUrl = await getThumbnailUrl(url); // You'd need to implement this
      const reelItem = document.createElement('div');
      reelItem.className = 'reel-item';
      reelItem.innerHTML = `
        <a href="${url}" target="_blank">
          <img src="${thumbnailUrl}" alt="Reel thumbnail">
          <div class="reel-overlay">▶️</div>
        </a>
      `;
      reelGrid.appendChild(reelItem);
    } catch (error) {
      console.error('Error loading reel:', error);
    }
  }
}

// Call when page loads
document.addEventListener('DOMContentLoaded', loadReelThumbnails);


const puppeteer = require('puppeteer');

async function getReelThumbnail(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Look for Open Graph meta tag
  const thumbnail = await page.evaluate(() => {
    const ogImage = document.querySelector('meta[property="og:image"]');
    return ogImage ? ogImage.getAttribute('content') : null;
  });

  await browser.close();
  return thumbnail;
}

// Example usage
getReelThumbnail('https://www.instagram.com/reel/DICAu3GtZzO/')
  .then(url => console.log('Thumbnail URL:', url))
  .catch(console.error);

