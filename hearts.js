// hearts.js
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







document.addEventListener("DOMContentLoaded", function() {
  const content = document.querySelector('.love-letter-content');
  const readMoreBtn = document.querySelector('.read-more-btn');
  let clickCount = 0;
  const totalChunks = 3; // Set based on your content length (e.g., 3 "Read more" clicks to show all)

  readMoreBtn.addEventListener('click', function() {
    clickCount++;
    
    // Last click - all content visible
    if (clickCount >= totalChunks) {
      console.log("User read everything!");
      readMoreBtn.textContent = "❤️ Completed! ❤️";
      readMoreBtn.style.background = "#ff69b4";
      
      // Trigger celebration effect
      triggerCompletionEffect();
    }
  });

  function triggerCompletionEffect() {
    // Example: Shoot hearts animation
    for (let i = 0; i < 50; i++) {
      createHeart(true); // Use your existing heart animation function
    }
    
    // Optional: Play a sound
    const audio = new Audio('notification.mp3');
    audio.play();
  }
});
