const LINKS_FALLBACK = [
  {
    url: 'https://www.youtube.com/@entreacordesypixeles',
    title: 'Entre Acordes y Píxeles',
    image: './entreacordesypixeles.png'
  },
  {
    url: 'https://www.youtube.com/@KaraokePartyES',
    title: 'KaraokePartyES',
    image: './karaokepartyes.jpg'
  },
  {
    url: 'https://github.com/LosTomobri',
    title: 'LosTomobri · GitHub',
    image: './github.png'
  }
];

function createLinkCard({ url, title, image }) {
  const a = document.createElement('a');
  a.className = 'link';
  a.href = url;
  a.target = '_blank';
  a.rel = 'noreferrer noopener';
  
  // Add click handler to try opening in apps first
  a.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Try to open in native app based on URL
    let appUrl = url;
    
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      // Try YouTube app
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/@)([^&\n?#]+)/);
      if (videoId) {
        appUrl = `vnd.youtube://${videoId[1]}`;
      }
    } else if (url.includes('github.com')) {
      // Try GitHub app
      appUrl = url.replace('https://github.com', 'github://');
    } else if (url.includes('instagram.com')) {
      // Try Instagram app
      appUrl = url.replace('https://www.instagram.com', 'instagram://user?username').replace('https://instagram.com', 'instagram://user?username');
    } else if (url.includes('twitter.com') || url.includes('x.com')) {
      // Try Twitter/X app
      appUrl = url.replace(/https:\/\/(www\.)?(twitter\.com|x\.com)/, 'twitter://user?screen_name');
    } else if (url.includes('tiktok.com')) {
      // Try TikTok app
      appUrl = url.replace('https://www.tiktok.com', 'tiktok://@').replace('https://tiktok.com', 'tiktok://@');
    }
    
    // Try to open in app, fallback to browser
    const startTime = Date.now();
    const timeout = setTimeout(() => {
      // If app doesn't open after 2 seconds, open in browser
      if (Date.now() - startTime < 2500) {
        window.open(url, '_blank');
      }
    }, 2000);
    
    // Try opening the app
    window.location.href = appUrl;
    
    // Clear timeout if user returns to page quickly (app opened successfully)
    window.addEventListener('blur', function() {
      clearTimeout(timeout);
    }, { once: true });
  });

  const icon = document.createElement('div');
  icon.className = 'link-icon';

  const img = document.createElement('img');
  img.alt = '';
  img.loading = 'lazy';
  img.decoding = 'async';
  img.src = image || './profile.png';

  icon.appendChild(img);

  const text = document.createElement('div');
  text.className = 'link-text-wrapper';

  const t = document.createElement('div');
  t.className = 'link-title';
  t.textContent = title;

  text.appendChild(t);

  a.appendChild(icon);
  a.appendChild(text);

  return a;
}

function loadCards() {
  const container = document.getElementById('links');
  container.replaceChildren();

  for (const c of LINKS_FALLBACK) {
    container.appendChild(createLinkCard(c));
  }
}

loadCards();
