/* ============================
   AUTOPREMIUM — app.js
   ============================ */

const CAR_COLORS = {
  berline: '#CC0000', suv: '#AA0000', citadine: '#FF2233',
  break: '#990000', coupe: '#DD1111', utilitaire: '#771111'
};

function carSVG(type) {
  const c = CAR_COLORS[type] || '#CC0000';
  if (type === 'suv') return `<svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="400" cy="270" rx="360" ry="16" fill="rgba(0,0,0,0.3)"/>
    <path d="M40 210 L80 120 L180 75 L620 75 L720 130 L760 210 L760 245 L40 245 Z" fill="#1a0505" stroke="${c}44" stroke-width="1.5"/>
    <rect x="145" y="82" width="510" height="36" rx="2" fill="${c}15" stroke="${c}44" stroke-width="1.2"/>
    <circle cx="185" cy="248" r="44" fill="#0d0000" stroke="${c}" stroke-width="3.5"/>
    <circle cx="185" cy="248" r="27" fill="#160000"/><circle cx="185" cy="248" r="9" fill="${c}"/>
    <circle cx="615" cy="248" r="44" fill="#0d0000" stroke="${c}" stroke-width="3.5"/>
    <circle cx="615" cy="248" r="27" fill="#160000"/><circle cx="615" cy="248" r="9" fill="${c}"/>
    <rect x="720" y="170" width="28" height="13" rx="3" fill="${c}99"/>
    <rect x="50" y="172" width="22" height="11" rx="3" fill="${c}66"/>
  </svg>`;
  if (type === 'citadine') return `<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="350" cy="235" rx="290" ry="13" fill="rgba(0,0,0,0.28)"/>
    <path d="M60 195 L100 145 L190 100 L510 100 L600 145 L640 195 L640 220 L60 220 Z" fill="#1a0505" stroke="${c}44" stroke-width="1.5"/>
    <path d="M160 145 L200 105 L500 105 L550 145 Z" fill="${c}12" stroke="${c}44" stroke-width="1.2"/>
    <circle cx="175" cy="222" r="38" fill="#0d0000" stroke="${c}" stroke-width="3"/>
    <circle cx="175" cy="222" r="23" fill="#160000"/><circle cx="175" cy="222" r="7" fill="${c}"/>
    <circle cx="525" cy="222" r="38" fill="#0d0000" stroke="${c}" stroke-width="3"/>
    <circle cx="525" cy="222" r="23" fill="#160000"/><circle cx="525" cy="222" r="7" fill="${c}"/>
    <ellipse cx="615" cy="162" rx="14" ry="8" fill="${c}88"/>
  </svg>`;
  return `<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="400" cy="248" rx="340" ry="15" fill="rgba(0,0,0,0.3)"/>
    <path d="M60 200 L120 140 L200 100 L320 82 L480 82 L600 100 L700 150 L740 200 L740 225 L60 225 Z" fill="#1a0505" stroke="${c}44" stroke-width="1.5"/>
    <path d="M160 140 L210 95 L310 82 L490 82 L580 95 L630 140 Z" fill="${c}12" stroke="${c}44" stroke-width="1.2"/>
    <circle cx="200" cy="225" r="42" fill="#0d0000" stroke="${c}" stroke-width="3.5"/>
    <circle cx="200" cy="225" r="26" fill="#160000"/><circle cx="200" cy="225" r="8" fill="${c}"/>
    <circle cx="590" cy="225" r="42" fill="#0d0000" stroke="${c}" stroke-width="3.5"/>
    <circle cx="590" cy="225" r="26" fill="#160000"/><circle cx="590" cy="225" r="8" fill="${c}"/>
    <ellipse cx="718" cy="174" rx="16" ry="9" fill="${c}88"/>
    <ellipse cx="82" cy="174" rx="13" ry="8" fill="${c}66"/>
  </svg>`;
}

// ---- DONNÉES ----
let cars = JSON.parse(localStorage.getItem('ap_cars3') || '[]');
if (cars.length === 0) {
  cars = [
    { id:1, marque:'Mercedes-Benz', modele:'Classe C 220d', type:'berline', statut:'disponible', prix:320000, annee:2021, km:38000, carburant:'Diesel', trans:'Automatique', couleur:'Gris Anthracite', desc:'Excellent état, entretien à jour, cuir noir, toit panoramique, navigation.', images:[] },
    { id:2, marque:'Toyota', modele:'RAV4 Hybride', type:'suv', statut:'disponible', prix:265000, annee:2022, km:22000, carburant:'Hybride', trans:'Automatique', couleur:'Blanc Perle', desc:'Hybride rechargeable, faible consommation, caméra 360°, carplay.', images:[] },
    { id:3, marque:'Volkswagen', modele:'Golf 8 GTI', type:'berline', statut:'vendu', prix:210000, annee:2021, km:41000, carburant:'Essence', trans:'Manuelle', couleur:'Rouge Racing', desc:'Version sportive GTI, échappement sport, sièges baquet, parfait état.', images:[] },
    { id:4, marque:'Dacia', modele:'Duster 4x4', type:'suv', statut:'disponible', prix:98000, annee:2020, km:67000, carburant:'Diesel', trans:'Manuelle', couleur:'Orange Atacama', desc:'4x4 robuste, idéal pour tous terrains, climatisation, bluetooth.', images:[] },
    { id:5, marque:'Renault', modele:'Clio 5 RS Line', type:'citadine', statut:'reserve', prix:115000, annee:2022, km:18000, carburant:'Essence', trans:'Automatique', couleur:'Bleu Iron', desc:'Finition sportive RS Line, écran 9.3 pouces, aide au stationnement.', images:[] },
    { id:6, marque:'BMW', modele:'Série 5 530i', type:'berline', statut:'disponible', prix:450000, annee:2020, km:55000, carburant:'Essence', trans:'Automatique', couleur:'Noir Saphir', desc:'M-Sport, full options, sellerie cuir, son premium Harman Kardon.', images:[] }
  ];
  saveData();
}

function saveData() { localStorage.setItem('ap_cars3', JSON.stringify(cars)); }

// ---- CARROUSEL STATE ----
let currentCarousel = { id: null, index: 0 };

// ---- RENDU CATALOGUE ----
function renderCars(filter = 'tous') {
  const grid = document.getElementById('cars-grid');
  const noRes = document.getElementById('no-results');
  grid.querySelectorAll('.car-card').forEach(el => el.remove());
  const filtered =
    filter === 'tous' ? cars :
    filter === 'disponible' ? cars.filter(c => c.statut === 'disponible') :
    cars.filter(c => c.type === filter);
  noRes.classList.toggle('show', filtered.length === 0);

  filtered.forEach(car => {
    const hasImg = car.images && car.images.length > 0;
    const thumbHTML = hasImg
      ? `<img src="${car.images[0]}" alt="${car.modele}" style="width:100%;height:100%;object-fit:cover;display:block;">`
      : carSVG(car.type);

    const div = document.createElement('div');
    div.className = 'car-card';
    div.innerHTML = `
      <div class="car-img">
        ${thumbHTML}
        <div class="car-img-overlay"></div>
        <span class="car-badge badge-${car.statut}">
          ${car.statut === 'disponible' ? '✓ Disponible' : car.statut === 'vendu' ? 'Vendu' : 'Réservé'}
        </span>
        <span class="car-type-badge">${car.type.toUpperCase()}</span>
        ${hasImg ? `<span class="photo-count">📷 ${car.images.length}</span>` : ''}
      </div>
      <div class="car-info">
        <div class="car-brand">${car.marque}</div>
        <div class="car-name">${car.modele}</div>
        <div class="car-specs">
          <span class="spec"><span class="spec-icon">📅</span>${car.annee}</span>
          <span class="spec"><span class="spec-icon">⛽</span>${car.carburant}</span>
          <span class="spec"><span class="spec-icon">⚙</span>${car.trans}</span>
          <span class="spec"><span class="spec-icon">🛣</span>${car.km.toLocaleString('fr-FR')} km</span>
        </div>
        <div class="car-footer">
          <div class="car-price">${car.prix.toLocaleString('fr-FR')} <span>MAD</span></div>
          <button class="btn-detail" onclick="openModal(${car.id})">Voir détails →</button>
        </div>
      </div>`;
    grid.appendChild(div);
  });
  updateStats();
}

function updateStats() {
  document.getElementById('total-count').textContent = cars.length;
  document.getElementById('dispo-count').textContent = cars.filter(c => c.statut === 'disponible').length;
  document.getElementById('admin-count').textContent = cars.length;
}

// ---- FILTRES ----
document.getElementById('filters').addEventListener('click', e => {
  if (!e.target.classList.contains('filter-btn')) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  renderCars(e.target.dataset.filter);
});

// ---- MODAL ----
function openModal(id) {
  const car = cars.find(c => c.id === id);
  if (!car) return;
  currentCarousel = { id: car.id, index: 0 };

  document.getElementById('modal-brand').textContent = car.marque;
  document.getElementById('modal-title').textContent = car.modele;

  const statEl = document.getElementById('modal-status');
  statEl.textContent = car.statut === 'disponible' ? '✓ Disponible' : car.statut === 'vendu' ? '✗ Vendu' : '⏳ Réservé';
  statEl.className = `modal-status badge-${car.statut}`;

  document.getElementById('modal-desc').textContent = car.desc || 'Aucune description.';
  renderCarousel(car);

  document.getElementById('modal-specs').innerHTML = `
    <div class="modal-spec-item"><div class="modal-spec-label">Année</div><div class="modal-spec-value">${car.annee}</div></div>
    <div class="modal-spec-item"><div class="modal-spec-label">Kilométrage</div><div class="modal-spec-value">${car.km.toLocaleString('fr-FR')} km</div></div>
    <div class="modal-spec-item"><div class="modal-spec-label">Carburant</div><div class="modal-spec-value">${car.carburant}</div></div>
    <div class="modal-spec-item"><div class="modal-spec-label">Transmission</div><div class="modal-spec-value">${car.trans}</div></div>
    <div class="modal-spec-item"><div class="modal-spec-label">Couleur</div><div class="modal-spec-value">${car.couleur}</div></div>
    <div class="modal-spec-item"><div class="modal-spec-label">Type</div><div class="modal-spec-value">${car.type.charAt(0).toUpperCase() + car.type.slice(1)}</div></div>`;

  document.getElementById('modal-price').innerHTML = `${car.prix.toLocaleString('fr-FR')} <small>MAD</small>`;
  document.getElementById('modal-action').innerHTML = car.statut === 'disponible'
    ? `<a class="btn-primary" href="https://wa.me/212648589461" target="_blank" rel="noopener" style="text-decoration:none;display:inline-block">💬 Nous contacter</a>`
    : `<span style="color:var(--gris);font-size:0.85rem;">Non disponible à la vente</span>`;

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ---- CARROUSEL ----
function renderCarousel(car) {
  const container = document.getElementById('modal-img');
  const imgs = car.images || [];

  if (imgs.length === 0) {
    container.innerHTML = `<div class="carousel-svg-wrap">${carSVG(car.type)}</div>`;
    return;
  }

  container.innerHTML = `
    <div class="carousel">
      <div class="carousel-track" id="carousel-track">
        ${imgs.map((src, i) => `<div class="carousel-slide"><img src="${src}" alt="Photo ${i+1}"></div>`).join('')}
      </div>
      ${imgs.length > 1 ? `
      <button class="carousel-btn carousel-prev" onclick="carouselNav(-1)">&#8249;</button>
      <button class="carousel-btn carousel-next" onclick="carouselNav(1)">&#8250;</button>
      <div class="carousel-dots">
        ${imgs.map((_, i) => `<span class="carousel-dot ${i===0?'active':''}" onclick="carouselGoto(${i})"></span>`).join('')}
      </div>` : ''}
      <div class="carousel-counter">${imgs.length > 1 ? `1 / ${imgs.length}` : ''}</div>
    </div>`;
}

function carouselNav(dir) {
  const car = cars.find(c => c.id === currentCarousel.id);
  if (!car || !car.images) return;
  const total = car.images.length;
  currentCarousel.index = (currentCarousel.index + dir + total) % total;
  carouselGoto(currentCarousel.index);
}

function carouselGoto(idx) {
  currentCarousel.index = idx;
  const track = document.getElementById('carousel-track');
  if (track) track.style.transform = `translateX(-${idx * 100}%)`;
  document.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  const counter = document.querySelector('.carousel-counter');
  const car = cars.find(c => c.id === currentCarousel.id);
  if (counter && car) counter.textContent = car.images.length > 1 ? `${idx + 1} / ${car.images.length}` : '';
}

function closeModalDirect() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
function closeModal(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModalDirect();
}

// ---- ADMIN ----
function toggleAdmin() {
  document.getElementById('admin-panel').classList.toggle('open');
  renderAdminList();
}

function renderAdminList() {
  document.getElementById('admin-car-list').innerHTML = cars.map(car => `
    <div class="admin-car-item">
      <div class="admin-car-thumb">
        ${car.images && car.images.length > 0
          ? `<img src="${car.images[0]}" alt="">`
          : `<div class="admin-car-thumb-svg">${carSVG(car.type)}</div>`}
      </div>
      <div style="flex:1;min-width:0">
        <div class="admin-car-name">${car.marque} ${car.modele} (${car.annee})</div>
        <div style="font-size:0.7rem;color:var(--gris);margin-top:2px">${car.statut.toUpperCase()} · ${car.prix.toLocaleString('fr-FR')} MAD</div>
        <div style="font-size:0.68rem;color:var(--rouge-vif);margin-top:2px">${car.images ? car.images.length : 0} photo(s)</div>
      </div>
      <div class="admin-car-actions">
        <button class="btn-photos" onclick="openPhotoManager(${car.id})" title="Gérer photos">📷</button>
        <button class="btn-toggle-dispo" onclick="toggleDispo(${car.id})" title="Changer statut">⇄</button>
        <button class="btn-delete" onclick="deleteCar(${car.id})">✕</button>
      </div>
    </div>`).join('');
  document.getElementById('admin-count').textContent = cars.length;
}

function addCar() {
  const marque = document.getElementById('f-marque').value.trim();
  const modele = document.getElementById('f-modele').value.trim();
  const prix   = parseInt(document.getElementById('f-prix').value);
  const annee  = parseInt(document.getElementById('f-annee').value);
  const km     = parseInt(document.getElementById('f-km').value);
  if (!marque || !modele || !prix || !annee || !km) { alert('Remplissez : marque, modèle, prix, année, kilométrage.'); return; }
  cars.unshift({
    id: Date.now(), marque, modele, prix, annee, km,
    type:      document.getElementById('f-type').value,
    statut:    document.getElementById('f-statut').value,
    carburant: document.getElementById('f-carburant').value,
    trans:     document.getElementById('f-trans').value,
    couleur:   document.getElementById('f-couleur').value || 'Non précisé',
    desc:      document.getElementById('f-desc').value.trim(),
    images: []
  });
  saveData();
  ['f-marque','f-modele','f-prix','f-annee','f-km','f-couleur','f-desc'].forEach(id => document.getElementById(id).value = '');
  renderCars(document.querySelector('.filter-btn.active').dataset.filter);
  renderAdminList();
}

function deleteCar(id) {
  if (!confirm('Supprimer ce véhicule ?')) return;
  cars = cars.filter(c => c.id !== id);
  saveData();
  renderCars(document.querySelector('.filter-btn.active').dataset.filter);
  renderAdminList();
}

function toggleDispo(id) {
  const car = cars.find(c => c.id === id);
  if (!car) return;
  const s = ['disponible', 'reserve', 'vendu'];
  car.statut = s[(s.indexOf(car.statut) + 1) % 3];
  saveData();
  renderCars(document.querySelector('.filter-btn.active').dataset.filter);
  renderAdminList();
}

// ---- GESTIONNAIRE DE PHOTOS ----
let photoManagerId = null;

function openPhotoManager(id) {
  photoManagerId = id;
  const car = cars.find(c => c.id === id);
  if (!car) return;
  document.getElementById('pm-title').textContent = `${car.marque} ${car.modele}`;
  renderPhotoGrid(car);
  document.getElementById('photo-manager').classList.add('open');
}

function closePhotoManager() {
  document.getElementById('photo-manager').classList.remove('open');
  photoManagerId = null;
}

function renderPhotoGrid(car) {
  const imgs = car.images || [];
  const grid = document.getElementById('pm-grid');
  grid.innerHTML = '';

  imgs.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'pm-photo-item';
    div.innerHTML = `
      <img src="${src}" alt="Photo ${i+1}">
      <div class="pm-photo-actions">
        ${i > 0 ? `<button onclick="movePhoto(${i}, -1)" title="Vers gauche">←</button>` : ''}
        <button class="pm-delete-btn" onclick="deletePhoto(${i})" title="Supprimer">✕</button>
        ${i < imgs.length - 1 ? `<button onclick="movePhoto(${i}, 1)" title="Vers droite">→</button>` : ''}
      </div>
      ${i === 0 ? '<div class="pm-main-label">Principale</div>' : ''}`;
    grid.appendChild(div);
  });

  const count = document.getElementById('pm-count');
  count.textContent = `${imgs.length} / 5 photo(s)`;
  document.getElementById('pm-upload-btn').style.display = imgs.length >= 5 ? 'none' : 'flex';
}

function deletePhoto(index) {
  const car = cars.find(c => c.id === photoManagerId);
  if (!car) return;
  car.images.splice(index, 1);
  saveData();
  renderPhotoGrid(car);
  renderCars(document.querySelector('.filter-btn.active').dataset.filter);
  renderAdminList();
}

function movePhoto(index, dir) {
  const car = cars.find(c => c.id === photoManagerId);
  if (!car) return;
  const newIdx = index + dir;
  if (newIdx < 0 || newIdx >= car.images.length) return;
  [car.images[index], car.images[newIdx]] = [car.images[newIdx], car.images[index]];
  saveData();
  renderPhotoGrid(car);
  renderCars(document.querySelector('.filter-btn.active').dataset.filter);
}

// Upload via input file → base64
document.getElementById('photo-input').addEventListener('change', function() {
  const car = cars.find(c => c.id === photoManagerId);
  if (!car) return;
  if (!car.images) car.images = [];
  const files = Array.from(this.files).slice(0, 5 - car.images.length);
  let loaded = 0;
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      car.images.push(e.target.result);
      loaded++;
      if (loaded === files.length) {
        saveData();
        renderPhotoGrid(car);
        renderCars(document.querySelector('.filter-btn.active').dataset.filter);
        renderAdminList();
      }
    };
    reader.readAsDataURL(file);
  });
  this.value = '';
});

// ---- INIT ----
renderCars();

// ============================
// SYSTÈME D'AUTHENTIFICATION
// ============================

// ⚠️  CHANGE CE MOT DE PASSE ICI ↓
const ADMIN_PASSWORD = 'autopremium2024';
// ⚠️  CHANGE CE MOT DE PASSE ICI ↑

let isAdminLoggedIn = false;
let logoClickCount  = 0;
let logoClickTimer  = null;

// Clic 5x sur le logo → ouvre le login
function logoClick() {
  logoClickCount++;
  clearTimeout(logoClickTimer);
  logoClickTimer = setTimeout(() => { logoClickCount = 0; }, 2000);
  if (logoClickCount >= 5) {
    logoClickCount = 0;
    if (isAdminLoggedIn) {
      toggleAdmin();
    } else {
      openLogin();
    }
  }
}

function openLogin() {
  document.getElementById('login-overlay').classList.add('open');
  document.getElementById('login-input').value = '';
  document.getElementById('login-error').textContent = '';
  setTimeout(() => document.getElementById('login-input').focus(), 100);
}

function closeLogin() {
  document.getElementById('login-overlay').classList.remove('open');
}

function checkLogin() {
  const val = document.getElementById('login-input').value;
  const err = document.getElementById('login-error');
  if (val === ADMIN_PASSWORD) {
    isAdminLoggedIn = true;
    closeLogin();
    document.getElementById('admin-toggle-btn').style.display = 'flex';
    setTimeout(() => toggleAdmin(), 150);
    err.textContent = '';
  } else {
    err.textContent = '❌ Mot de passe incorrect';
    document.getElementById('login-input').value = '';
    document.getElementById('login-input').focus();
  }
}

function logout() {
  isAdminLoggedIn = false;
  document.getElementById('admin-toggle-btn').style.display = 'none';
  document.getElementById('admin-panel').classList.remove('open');
}
