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
});

window.addEventListener('resize', () => {
  setTimeout(arrangeRandomPhotos, 300); // Debounce slightly
});

function arrangeRandomPhotos() {
  const container = document.querySelector('.love-letter-wrapper');
  if (!container) return;

  // Wait for images to load
  const photos = document.querySelectorAll('.loveletter-bg-photos img');
  const containerRect = container.getBoundingClientRect();
  const containerStyle = window.getComputedStyle(container);
  
  // Account for container padding and border
  const padding = 30; // Increased padding for better spacing
  const containerPaddingLeft = parseFloat(containerStyle.paddingLeft) || 0;
  const containerPaddingTop = parseFloat(containerStyle.paddingTop) || 0;
  const containerPaddingRight = parseFloat(containerStyle.paddingRight) || 0;
  const containerPaddingBottom = parseFloat(containerStyle.paddingBottom) || 0;
  
  // Calculate available space considering padding
  const availableWidth = containerRect.width - containerPaddingLeft - containerPaddingRight;
  const availableHeight = containerRect.height - containerPaddingTop - containerPaddingBottom;
  
  const placedPhotos = [];

  // First ensure all images are loaded
  const loadPromises = Array.from(photos).map(img => {
    return new Promise(resolve => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = resolve;
        img.onerror = resolve;
      }
    });
  });

  Promise.all(loadPromises).then(() => {
    // Sort images by size (largest first) for better packing
    const sortedPhotos = Array.from(photos).sort((a, b) => {
      const aArea = a.clientWidth * a.clientHeight;
      const bArea = b.clientWidth * b.clientHeight;
      return bArea - aArea;
    });

    sortedPhotos.forEach(img => {
      img.style.width = 'auto';
      img.style.height = 'auto';
      img.style.maxWidth = '300px'; // Reduced max size for better fit
      img.style.maxHeight = '300px';
      
      const imgWidth = img.clientWidth;
      const imgHeight = img.clientHeight;
      
      // Skip if image failed to load or has no dimensions
      if (imgWidth === 0 || imgHeight === 0) return;
      
      let attempts = 0;
      let positionFound = false;
      let randomLeft, randomTop;
      let rotation = -15 + Math.random() * 30;

      // Calculate effective size considering rotation
      const rotatedWidth = Math.abs(imgWidth * Math.cos(rotation * Math.PI / 180)) + 
                          Math.abs(imgHeight * Math.sin(rotation * Math.PI / 180));
      const rotatedHeight = Math.abs(imgWidth * Math.sin(rotation * Math.PI / 180)) + 
                           Math.abs(imgHeight * Math.cos(rotation * Math.PI / 180));

      while (!positionFound && attempts < 100) { // Increased attempts
        const maxLeft = availableWidth - rotatedWidth - padding;
        const maxTop = availableHeight - rotatedHeight - padding;
        
        // Ensure we don't go negative
        if (maxLeft < 0 || maxTop < 0) {
          console.warn('Image too large for container:', img);
          return; // Skip this image entirely if it's too big
        }
        
        randomLeft = containerPaddingLeft + padding + Math.random() * maxLeft;
        randomTop = containerPaddingTop + padding + Math.random() * maxTop;
        
        const collides = placedPhotos.some(placedPhoto => {
          // Check collision with rotated bounds
          return (
            randomLeft < placedPhoto.right + padding &&
            randomLeft + rotatedWidth + padding > placedPhoto.left &&
            randomTop < placedPhoto.bottom + padding &&
            randomTop + rotatedHeight + padding > placedPhoto.top
          );
        });
        
        if (!collides) {
          positionFound = true;
          
          placedPhotos.push({
            left: randomLeft,
            top: randomTop,
            right: randomLeft + rotatedWidth,
            bottom: randomTop + rotatedHeight
          });
          
          img.style.position = 'absolute';
          img.style.left = `${randomLeft}px`;
          img.style.top = `${randomTop}px`;
          img.style.transform = `rotate(${rotation}deg)`;
          img.style.zIndex = Math.floor(Math.random() * 5);
          img.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        }
        
        attempts++;
      }

      if (!positionFound) {
        console.warn('Could not find non-overlapping position for:', img);
        // Skip this image rather than forcing it
      }
    });
  });
}


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





