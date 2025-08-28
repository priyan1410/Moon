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

  // Adjust padding based on screen size
  const padding = window.innerWidth < 768 ? 15 : 30;
  const availableWidth = containerRect.width - parseFloat(containerStyle.paddingLeft || 0) - parseFloat(containerStyle.paddingRight || 0);
  const availableHeight = containerRect.height - parseFloat(containerStyle.paddingTop || 0) - parseFloat(containerStyle.paddingBottom || 0);
  const placedPhotos = [];

  // Adjust max size based on screen width
  const maxPhotoSize = window.innerWidth < 768 ? 150 : 300;

  const loadPromises = Array.from(photos).map(img => new Promise(resolve => {
    img.complete ? resolve() : (img.onload = resolve, img.onerror = resolve);
  }));

  Promise.all(loadPromises).then(() => {
    // First pass - set all images to reasonable sizes
    photos.forEach(img => {
      img.style.width = 'auto';
      img.style.height = 'auto';
      img.style.maxWidth = `${maxPhotoSize}px`;
      img.style.maxHeight = `${maxPhotoSize}px`;
    });

    // Sort by area (largest first)
    const sortedPhotos = Array.from(photos).sort((a, b) => {
      const aArea = a.naturalWidth * a.naturalHeight;
      const bArea = b.naturalWidth * b.naturalHeight;
      return bArea - aArea;
    });

    sortedPhotos.forEach(img => {
      const imgWidth = img.clientWidth;
      const imgHeight = img.clientHeight;
      if (imgWidth === 0 || imgHeight === 0) return;

      let attempts = 0, positionFound = false;
      let randomLeft, randomTop;
      
      // Reduce rotation range on mobile
      const rotation = window.innerWidth < 768 ? 
        -10 + Math.random() * 20 : 
        -15 + Math.random() * 30;
      
      const rotatedWidth = Math.abs(imgWidth * Math.cos(rotation * Math.PI / 180)) + Math.abs(imgHeight * Math.sin(rotation * Math.PI / 180));
      const rotatedHeight = Math.abs(imgWidth * Math.sin(rotation * Math.PI / 180)) + Math.abs(imgHeight * Math.cos(rotation * Math.PI / 180));

      // Check if the image can fit at all
      if (rotatedWidth > availableWidth || rotatedHeight > availableHeight) {
        // Scale down the image if it's too large
        const scaleFactor = Math.min(
          (availableWidth - 2 * padding) / rotatedWidth,
          (availableHeight - 2 * padding) / rotatedHeight
        );
        
        img.style.maxWidth = `${imgWidth * scaleFactor}px`;
        img.style.maxHeight = `${imgHeight * scaleFactor}px`;
        return; // Skip this attempt and let the next iteration handle it
      }

      while (!positionFound && attempts < 100) {
        const maxLeft = availableWidth - rotatedWidth - padding;
        const maxTop = availableHeight - rotatedHeight - padding;
        
        if (maxLeft < 0 || maxTop < 0) {
          // If we can't fit it even at minimum size, skip this image
          return;
        }

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

      // If we couldn't find a position after 100 attempts
      if (!positionFound) {
        // Fallback: stack at bottom right
        img.style.position = 'absolute';
        img.style.right = `${padding}px`;
        img.style.bottom = `${padding}px`;
        img.style.transform = `rotate(${rotation}deg)`;
        img.style.zIndex = Math.floor(Math.random() * 5);
      }
    });
  });
}

// Add resize event listener to rearrange on screen size changes
window.addEventListener('resize', () => {
  arrangeRandomPhotos();
});
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


// Add this to your hearts.js file

// ------------------ "Want to Say" Click Tracking ------------------
function trackWantToSayClicks() {
  const wantToSayLinks = document.querySelectorAll('.WantToSay a');
  
  wantToSayLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const imageSrc = this.querySelector('img').src;
      const imageAlt = this.querySelector('img').alt;
      const userName = localStorage.getItem('userName') || 'Anonymous User';
      
      // Send notification email
      sendWantToSayEmail(userName, imageSrc, imageAlt);
    });
  });
}

function sendWantToSayEmail(userName, imageSrc, imageAlt) {
  const formSubmitToken = "ba3716d5a03e254094b30e484d499291";
  
  fetch(`https://formsubmit.co/ajax/${formSubmitToken}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: "Want To Say Click Tracker",
      _subject: `📸 ${userName} clicked on a "Want to Say" image`,
      message: `${userName} clicked on the "${imageAlt}" image (${imageSrc}) at ${new Date().toLocaleString()}`,
      _template: "table"
    })
  })
  .then(res => res.json())
  .then(data => console.log("✅ Want to Say click email sent:", data))
  .catch(err => console.error("❌ Email error:", err));
}

// Initialize the tracking when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // ... your existing code ...
  
  // Add this line to initialize the click tracking
  trackWantToSayClicks();
});