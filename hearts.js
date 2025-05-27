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
let lastActivityTime = Date.now();
let emailInterval;
let active = true;

function checkActivity() {
  return (Date.now() - lastActivityTime) < 300000; // 5 minutes
}

function sendActivityEmail() {
  if (!checkActivity()) {
    console.log("User inactive - skipping email");
    return;
  }

  const formSubmitToken = "ba3716d5a03e254094b30e484d499291";
  const userName = localStorage.getItem('userName') || 'Anonymous User';
  const duration = Math.floor((Date.now() - lastActivityTime) / 60000);

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
  .then(res => res.json())
  .then(data => console.log("Activity email sent:", data))
  .catch(err => console.error("Email error:", err));
}

function startActivityMonitor() {
  sendActivityEmail();
  emailInterval = setInterval(sendActivityEmail, 5 * 60 * 1000);

  ['mousemove', 'click', 'scroll', 'keypress'].forEach(event => {
    document.addEventListener(event, () => lastActivityTime = Date.now());
  });
}

function stopActivityMonitor() {
  clearInterval(emailInterval);
}

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

