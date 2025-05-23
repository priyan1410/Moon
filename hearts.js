// Background hearts creation
function createBackgroundHearts(count = 25) {
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

// Video controls
function setupVideoControls() {
  const lightboxVideo = document.querySelector('.lightbox-video');
  const videoThumbnail = document.querySelector('.gallery-video');
  
  if (lightboxVideo && videoThumbnail) {
    document.querySelector('a[href="#videopreview"]').addEventListener('click', function() {
      setTimeout(() => {
        lightboxVideo.muted = false;
        lightboxVideo.play();
      }, 300);
    });
    
    document.querySelector('a[href="#videopreview"]').addEventListener('click', function(e) {
      if (e.target === this && lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.currentTime = 0;
        videoThumbnail.muted = true;
      }
    });
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.currentTime = 0;
      }
    });
  }
}

// Photo arrangement
function arrangeRandomPhotos() {
  const container = document.querySelector('.love-letter-wrapper');
  if (!container) return;

  const photos = document.querySelectorAll('.loveletter-bg-photos img');
  const containerRect = container.getBoundingClientRect();
  const padding = 20;
  const placedPhotos = [];

  photos.forEach(img => {
    img.style.width = 'auto';
    img.style.height = 'auto';
    img.style.maxWidth = '400px';
    img.style.maxHeight = '400px';
    
    const imgWidth = img.clientWidth;
    const imgHeight = img.clientHeight;
    
    let attempts = 0;
    let positionFound = false;
    let randomLeft, randomTop;
    let rotation = -15 + Math.random() * 30;

    while (!positionFound && attempts < 50) {
      const maxLeft = containerRect.width - imgWidth - padding;
      const maxTop = containerRect.height - imgHeight - padding;
      
      randomLeft = padding + Math.random() * maxLeft;
      randomTop = padding + Math.random() * maxTop;
      
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
        
        placedPhotos.push({
          left: randomLeft,
          top: randomTop,
          right: randomLeft + imgWidth,
          bottom: randomTop + imgHeight
        });
        
        img.style.position = 'absolute';
        img.style.left = `${randomLeft}px`;
        img.style.top = `${randomTop}px`;
        img.style.transform = `rotate(${rotation}deg)`;
        img.style.zIndex = Math.floor(Math.random() * 5);
      }
      
      attempts++;
    }

    if (!positionFound) {
      img.style.position = 'absolute';
      img.style.left = `${randomLeft}px`;
      img.style.top = `${randomTop}px`;
      img.style.transform = `rotate(${rotation}deg)`;
      img.style.zIndex = Math.floor(Math.random() * 5);
    }
  });
}

// Feedback form handling
function setupFeedbackForm() {
  const form = document.getElementById('feedbackForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const message = document.getElementById('feedbackMessage').value;
    const email = document.getElementById('userEmail').value;
    const status = document.getElementById('feedbackStatus');

    // Basic validation
    if (!message || !email) {
      status.textContent = "Please fill in all fields";
      return;
    }

    fetch("https://formsubmit.co/ajax/ba3716d5a03e254094b30e484d499291", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        email: email,
        _subject: "❤️ New Feedback Received"
      })
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      status.textContent = "Thank you for your feedback!";
      form.reset();
    })
    .catch(error => {
      console.error("Feedback error:", error);
      status.textContent = "Oops! Something went wrong. Please try again later.";
    });
  });
}
