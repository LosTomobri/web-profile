const LINKS_FALLBACK = [
  {
    url: 'https://www.youtube.com/@entreacordesypixeles',
    title: 'Entre Acordes y Píxeles',
    image: './entreacordesypixeles.jpg'
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

  const icon = document.createElement('div');
  icon.className = 'link-icon';

  const img = document.createElement('img');
  img.alt = '';
  img.loading = 'lazy';
  img.decoding = 'async';
  img.src = image || './profile.jpg';

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
