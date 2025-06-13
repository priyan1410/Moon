// hearts.js

// ------------------ Background Heart Animation ------------------
function createBackgroundHearts(count = 30) {
  const colors = ['#ffb3c6', '#ffccd5', '#fff0f3', '#ff8fab'];

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "heart heart-back";

    const size = 5 + Math.random() * 50;
    const color = colors[Math.floor(Math.random() * colors.length)];

    heart.style.width = heart.style.height = `${size}px`;
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (15 + Math.random() * 15) + "s";
    heart.style.animationDelay = Math.random() * 1 + "s";
    heart.style.opacity = 0.2 + Math.random() * 0.7;
    heart.style.background = color;
    heart.style.setProperty('--heart-color', color);
    heart.style.setProperty('--heart-size', `${size}px`);
    heart.style.bottom = -size + "px";

    const xMovement = (Math.random() - 0.5) * 100;
    heart.style.setProperty('--x-movement', `${xMovement}vw`);

    document.body.appendChild(heart);
  }
}

// ------------------ Confetti (Assume you define it elsewhere) ------------------
function createConfetti() {
  // Dummy placeholder: implement your confetti code here if needed
  console.log("🎉 Confetti triggered!");
}

// ------------------ Background Photo Layout ------------------
function arrangeRandomPhotos() {
  const container = document.querySelector('.love-letter-wrapper');
  if (!container) return;

  const photos = document.querySelectorAll('.loveletter-bg-photos img');
  const containerRect = container.getBoundingClientRect();
  const containerStyle = window.getComputedStyle(container);

  const padding = 30;
  const availableWidth = containerRect.width - parseFloat(containerStyle.paddingLeft || 0) - parseFloat(containerStyle.paddingRight || 0);
  const availableHeight = containerRect.height - parseFloat(containerStyle.paddingTop || 0) - parseFloat(containerStyle.paddingBottom || 0);
  const placedPhotos = [];

  const loadPromises = Array.from(photos).map(img => new Promise(resolve => {
    img.complete ? resolve() : (img.onload = resolve, img.onerror = resolve);
  }));

  Promise.all(loadPromises).then(() => {
    const sortedPhotos = Array.from(photos).sort((a, b) => b.clientWidth * b.clientHeight - a.clientWidth * a.clientHeight);

    sortedPhotos.forEach(img => {
      img.style.width = 'auto';
      img.style.height = 'auto';
      img.style.maxWidth = '300px';
      img.style.maxHeight = '300px';

      const imgWidth = img.clientWidth;
      const imgHeight = img.clientHeight;
      if (imgWidth === 0 || imgHeight === 0) return;

      let attempts = 0, positionFound = false;
      let randomLeft, randomTop;
      const rotation = -15 + Math.random() * 30;
      const rotatedWidth = Math.abs(imgWidth * Math.cos(rotation * Math.PI / 180)) + Math.abs(imgHeight * Math.sin(rotation * Math.PI / 180));
      const rotatedHeight = Math.abs(imgWidth * Math.sin(rotation * Math.PI / 180)) + Math.abs(imgHeight * Math.cos(rotation * Math.PI / 180));

      while (!positionFound && attempts < 100) {
        const maxLeft = availableWidth - rotatedWidth - padding;
        const maxTop = availableHeight - rotatedHeight - padding;
        if (maxLeft < 0 || maxTop < 0) return;

        randomLeft = padding + Math.random() * maxLeft;
        randomTop = padding + Math.random() * maxTop;

        const collides = placedPhotos.some(p =>
          randomLeft < p.right + padding &&
          randomLeft + rotatedWidth + padding > p.left &&
          randomTop < p.bottom + padding &&
          randomTop + rotatedHeight + padding > p.top
        );

        if (!collides) {
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
          positionFound = true;
        }

        attempts++;
      }
    });
  });
}

// ------------------ Email Tracking ------------------
let sessionStartTime = Date.now(); // when the user entered
let lastActivityTime = Date.now(); // last time user interacted
let emailInterval;
let active = true;

function checkActivity() {
  // If user has interacted in last 5 minutes, they are active
  return (Date.now() - lastActivityTime) < 5 * 60 * 1000;
}

function sendActivityEmail() {
  if (!checkActivity()) {
    console.log("User inactive - skipping email");
    return;
  }

  const formSubmitToken = "ba3716d5a03e254094b30e484d499291";
  const userName = localStorage.getItem('userName') || 'Anonymous User';
  const duration = Math.floor((Date.now() - sessionStartTime) / 60000); // minutes since entry

  fetch(`https://formsubmit.co/ajax/${formSubmitToken}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: "User Activity Tracker",
      _subject: `❤️ ${userName} is still on your site`,
      message: `${userName} has been active for ${duration} minutes (since ${new Date(sessionStartTime).toLocaleTimeString()})`,
      _template: "table"
    })
  })
  .then(res => res.json())
  .then(data => console.log("✅ Activity email sent:", data))
  .catch(err => console.error("❌ Email error:", err));
}

function startActivityMonitor() {
  // Set the initial values
  sessionStartTime = Date.now();
  lastActivityTime = Date.now();

  sendActivityEmail(); // initial ping

  // Repeat every 5 minutes
  emailInterval = setInterval(sendActivityEmail, 5 * 60 * 1000);

  // On any interaction, update lastActivityTime
  ['mousemove', 'click', 'scroll', 'keypress'].forEach(event => {
    document.addEventListener(event, () => {
      lastActivityTime = Date.now();
    });
  });
}

function stopActivityMonitor() {
  clearInterval(emailInterval);
}

// Optional: mark user inactive when they switch tabs
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    active = false;
  } else {
    active = true;
    lastActivityTime = Date.now(); // treat tab switch back as activity
  }
});

// ------------------ Init on Page Load ------------------
document.addEventListener("DOMContentLoaded", () => {
  createBackgroundHearts();
  createConfetti();
  arrangeRandomPhotos();
  if (window.location.pathname.includes('bd.html')) {
    startActivityMonitor();
    window.addEventListener('beforeunload', stopActivityMonitor);
  }
});

// ------------------ Page Visibility Change ------------------
document.addEventListener('visibilitychange', () => {
  active = !document.hidden;
  if (active) lastActivityTime = Date.now();
});






function sendUserMessage() {
  const message = document.getElementById("userMessage").value.trim();
  const userName = localStorage.getItem("userName") || "Anonymous";
  const token = "ba3716d5a03e254094b30e484d499291"; // same token

  if (message === "") {
    alert("Please write a message first!");
    return;
  }

  fetch(`https://formsubmit.co/ajax/${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: userName,
      _subject: `💬 Message from ${userName}`,
      message: message,
      _template: "table"
    })
  })
  .then(response => response.json())
  .then(data => {
    alert("Message sent successfully!");
    document.getElementById("userMessage").value = ""; // Clear textarea
  })
  .catch(error => {
    alert("Failed to send message.");
    console.error("Email error:", error);
  });
}


// Add this to hearts.js
document.addEventListener("DOMContentLoaded", function() {
  // Get all thumbnail elements
  const thumbnails = document.querySelectorAll('.thumbnail');
  const lightbox = document.querySelector('.lightbox-slider');
  const sliderImage = document.getElementById('sliderImage');
  const closeBtn = document.querySelector('.close-btn');
  
  // Create array of all image sources
  const imageSources = Array.from(thumbnails).map(thumb => {
    return thumb.querySelector('img') ? thumb.querySelector('img').src : 
           thumb.querySelector('video') ? thumb.querySelector('video').querySelector('source').src : '';
  }).filter(src => src !== '');

  // Add click event to each thumbnail
  thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = index;
    updateSliderImage();
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // If it's a video, play it automatically
    const sliderVideo = document.getElementById('sliderVideo');
    if (sliderVideo.style.display === 'block') {
      sliderVideo.play().catch(e => console.log("Autoplay prevented:", e));
    }
  });
});

  // Close lightbox
  closeBtn.addEventListener('click', closeLightbox);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    }
  });

  // Touch events for swiping
  let touchStartX = 0;
  let touchEndX = 0;
  
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextImage(); // Swipe left
    if (touchEndX > touchStartX + 50) prevImage(); // Swipe right
  }

  let currentIndex = 0;
  
function updateSliderImage() {
  const currentThumbnail = thumbnails[currentIndex];
  const sliderImage = document.getElementById('sliderImage');
  const sliderVideo = document.getElementById('sliderVideo');
  const videoSource = sliderVideo.querySelector('source');

  // Hide both first
  sliderImage.style.display = 'none';
  sliderVideo.style.display = 'none';
  
  // Pause video if playing
  sliderVideo.pause();

  if (currentThumbnail.querySelector('img')) {
    // It's an image
    sliderImage.src = currentThumbnail.querySelector('img').src;
    sliderImage.style.display = 'block';
  } else if (currentThumbnail.querySelector('video')) {
    // It's a video
    videoSource.src = currentThumbnail.querySelector('video').querySelector('source').src;
    sliderVideo.load();
    sliderVideo.style.display = 'block';
    sliderVideo.play().catch(e => console.log("Autoplay prevented:", e));
  }
}

  function nextImage() {
  // Pause video before changing
  const sliderVideo = document.getElementById('sliderVideo');
  if (sliderVideo.style.display === 'block') {
    sliderVideo.pause();
  }
  
  currentIndex = (currentIndex + 1) % thumbnails.length;
  updateSliderImage();
  
  // Auto-play if new item is video
  if (sliderVideo.style.display === 'block') {
    sliderVideo.play().catch(e => console.log("Autoplay prevented:", e));
  }
}

function prevImage() {
  // Pause video before changing
  const sliderVideo = document.getElementById('sliderVideo');
  if (sliderVideo.style.display === 'block') {
    sliderVideo.pause();
  }
  
  currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
  updateSliderImage();
  
  // Auto-play if new item is video
  if (sliderVideo.style.display === 'block') {
    sliderVideo.play().catch(e => console.log("Autoplay prevented:", e));
  }
}

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Navigation buttons
  document.querySelector('.nav-btn.left').addEventListener('click', prevImage);
  document.querySelector('.nav-btn.right').addEventListener('click', nextImage);
});


// Add these variables at the top of your lightbox script
let currentScale = 1;
let isDragging = false;
let startPos = { x: 0, y: 0 };
let translate = { x: 0, y: 0 };
let startTouchDistance = 0;
let initialTouchPos = { x: 0, y: 0 };

// Add these functions to your existing lightbox code
function setupZoom() {
  const sliderVideo = document.getElementById('sliderVideo');
  
  // Pause video when changing slides
  sliderVideo.addEventListener('pause', function() {
    this.currentTime = 0; // Reset to start when paused
  });

  // Hide controls when video ends
  sliderVideo.addEventListener('ended', function() {
    this.style.display = 'none';
    document.getElementById('sliderImage').style.display = 'block';
  });
  
  // Pause video when changing slides
  sliderVideo.addEventListener('pause', function() {
    this.currentTime = 0; // Reset to start when paused
  });

  // Hide controls when video ends
  sliderVideo.addEventListener('ended', function() {
    this.style.display = 'none';
    document.getElementById('sliderImage').style.display = 'block';
  });
  const sliderImage = document.getElementById('sliderImage');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const resetZoomBtn = document.getElementById('resetZoomBtn');

  // Button controls
  zoomInBtn.addEventListener('click', () => zoomImage(1.2));
  zoomOutBtn.addEventListener('click', () => zoomImage(0.8));
  resetZoomBtn.addEventListener('click', resetZoom);

  // Mouse wheel zoom
  sliderImage.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.8 : 1.2;
    zoomImage(delta, e.clientX, e.clientY);
  });

  // Touch events for pinch zoom
  sliderImage.addEventListener('touchstart', handleTouchStart, { passive: false });
  sliderImage.addEventListener('touchmove', handleTouchMove, { passive: false });
  sliderImage.addEventListener('touchend', handleTouchEnd);

  // Mouse events for drag
  sliderImage.addEventListener('mousedown', startDrag);
  sliderImage.addEventListener('mousemove', dragImage);
  sliderImage.addEventListener('mouseup', endDrag);
  sliderImage.addEventListener('mouseleave', endDrag);
}

function zoomImage(scaleFactor, centerX, centerY) {
  const sliderImage = document.getElementById('sliderImage');
  
  // Only zoom if it's an image and visible
  if (sliderImage.style.display !== 'block') return;
  const container = document.querySelector('.lightbox-slider');
  
  // Calculate new scale
  const newScale = currentScale * scaleFactor;
  
  // Limit zoom levels
  if (newScale < 1) {
    resetZoom();
    return;
  }
  if (newScale > 5) return;
  
  currentScale = newScale;
  
  // If center coordinates provided (for wheel zoom)
  if (centerX && centerY) {
    const rect = sliderImage.getBoundingClientRect();
    const offsetX = centerX - rect.left;
    const offsetY = centerY - rect.top;
    
    // Adjust translate to zoom toward pointer
    translate.x = offsetX - (offsetX - translate.x) * scaleFactor;
    translate.y = offsetY - (offsetY - translate.y) * scaleFactor;
  }
  
  applyTransform();
  
  // Add/remove zoomed class for cursor style
  if (currentScale > 1) {
    sliderImage.classList.add('zoomed');
  } else {
    sliderImage.classList.remove('zoomed');
  }
}

function resetZoom() {
  currentScale = 1;
  translate = { x: 0, y: 0 };
  applyTransform();
  document.getElementById('sliderImage').classList.remove('zoomed');
}

function applyTransform() {
  const sliderImage = document.getElementById('sliderImage');
  sliderImage.style.transform = `translate(${translate.x}px, ${translate.y}px) scale(${currentScale})`;
}

function handleTouchStart(e) {
  const sliderVideo = document.getElementById('sliderVideo');
  if (sliderVideo.style.display === 'block') return;
  if (e.touches.length === 1) {
    // Single touch - prepare for drag
    initialTouchPos = {
      x: e.touches[0].clientX - translate.x,
      y: e.touches[0].clientY - translate.y
    };
  } else if (e.touches.length === 2) {
    // Two touches - prepare for pinch zoom
    e.preventDefault();
    startTouchDistance = getDistance(
      e.touches[0].clientX, e.touches[0].clientY,
      e.touches[1].clientX, e.touches[1].clientY
    );
  }
}

function handleTouchMove(e) {
  if (e.touches.length === 1 && currentScale > 1) {
    // Single touch drag
    e.preventDefault();
    translate.x = e.touches[0].clientX - initialTouchPos.x;
    translate.y = e.touches[0].clientY - initialTouchPos.y;
    applyTransform();
  } else if (e.touches.length === 2) {
    // Pinch zoom
    e.preventDefault();
    const currentDistance = getDistance(
      e.touches[0].clientX, e.touches[0].clientY,
      e.touches[1].clientX, e.touches[1].clientY
    );
    
    if (startTouchDistance) {
      const scaleFactor = currentDistance / startTouchDistance;
      zoomImage(scaleFactor);
      startTouchDistance = currentDistance;
    }
  }
}

function handleTouchEnd() {
  startTouchDistance = 0;
}

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function startDrag(e) {
  if (currentScale > 1) {
    e.preventDefault();
    isDragging = true;
    startPos = {
      x: e.clientX - translate.x,
      y: e.clientY - translate.y
    };
    document.getElementById('sliderImage').classList.add('grabbing');
  }
}

function dragImage(e) {
  if (isDragging) {
    e.preventDefault();
    translate.x = e.clientX - startPos.x;
    translate.y = e.clientY - startPos.y;
    applyTransform();
  }
}

function endDrag() {
  isDragging = false;
  document.getElementById('sliderImage').classList.remove('grabbing');
}

// Call setupZoom after your lightbox initialization
document.addEventListener("DOMContentLoaded", function() {
  // Your existing lightbox code...
  
  // Initialize zoom functionality
  setupZoom();
  
  // Reset zoom when changing images
  function updateSliderImage() {
    // Your existing updateSliderImage code...
    resetZoom(); // Add this line to reset zoom when changing images
  }
});