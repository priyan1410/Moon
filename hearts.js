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
    const duration = Math.floor(5*((Date.now() - lastActivityTime) / 60000)); // Minutes
    
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
