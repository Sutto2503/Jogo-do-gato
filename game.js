// ==============================================================================
// GATINHO SAMURAI: ECOS MÍSTICOS - MOTOR COMPLETO DO JOGO & ESTÚDIO (2D)
// Design inspirado em: Ori and the Will of the Wisps, Hollow Knight e Nine Sols
// ==============================================================================

// --- 1. SISTEMA DE ÁUDIO SINTETIZADO (WEB AUDIO API) ---
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.sfxVolume = 0.8;
    this.bgmVolume = 0.7;
    this.enabled = true;
    this.ambientPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playMenuHover() {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);

    gain.gain.setValueAtTime(0.06 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  playMenuSelect() {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    [440, 659.25, 880].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.18 * this.sfxVolume, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.32);
    });
  }

  playSlash() {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.14;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(3200, now + 0.08);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.16);

    oscGain.gain.setValueAtTime(0.2 * this.sfxVolume, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playJump(isDouble = false) {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isDouble ? 360 : 220, now);
    osc.frequency.exponentialRampToValueAtTime(isDouble ? 880 : 600, now + 0.13);

    gain.gain.setValueAtTime(0.25 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.13);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  playGrapple() {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.exponentialRampToValueAtTime(1600, now + 0.12);

    gain.gain.setValueAtTime(0.2 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playGlide() {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(250, now + 0.25);

    gain.gain.setValueAtTime(0.12 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  }

  playSave() {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.2 * this.sfxVolume, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.28);
    });
  }

  playCollect() {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);

    gain.gain.setValueAtTime(0.25 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  playStep() {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.04);

    gain.gain.setValueAtTime(0.08 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  playLand() {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.08);

    gain.gain.setValueAtTime(0.18 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }
}

const sfx = new SoundSystem();

// --- 2. SISTEMA DE SALVAMENTO & CARREGAMENTO (LOCALSTORAGE) ---
class SaveManager {
  constructor() {
    this.storageKey = 'gatinho_samurai_save_v1';
  }

  saveGame(player, checkpointName = 'Santuário da Vila') {
    const data = {
      x: player.x,
      y: player.y,
      health: player.health,
      maxHealth: player.maxHealth,
      energy: player.energy,
      scrolls: player.scrollsCollected,
      checkpoint: checkpointName,
      timestamp: new Date().toLocaleString('pt-BR'),
      timestampRaw: Date.now()
    };
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      this.updateMenuTag();
      return true;
    } catch (e) {
      console.error('Erro ao salvar:', e);
      return false;
    }
  }

  loadGame() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error('Erro ao carregar:', e);
    }
    return null;
  }

  hasSave() {
    return localStorage.getItem(this.storageKey) !== null;
  }

  clearSave() {
    localStorage.removeItem(this.storageKey);
    this.updateMenuTag();
  }

  updateMenuTag() {
    const tag = document.getElementById('main-menu-save-tag');
    const loadBtn = document.getElementById('menu-btn-load-game');
    const save = this.loadGame();
    if (tag) {
      if (save) {
        tag.textContent = `${save.checkpoint} (${save.scrolls.length}/3 📜)`;
        tag.style.color = '#38bdf8';
        if (loadBtn) loadBtn.removeAttribute('disabled');
      } else {
        tag.textContent = 'Sem registro';
        tag.style.color = '#94a3b8';
        if (loadBtn) loadBtn.setAttribute('disabled', 'true');
      }
    }
  }
}

const saveManager = new SaveManager();

// --- 3. CARREGADOR DE ASSETS ---
const frameImages = {};
const envImages = {};
let assetsReady = false;

function initAssets(callback) {
  if (typeof ASSETS_BUNDLE !== 'undefined') {
    // Carregar animações do personagem
    Object.keys(ASSETS_BUNDLE).forEach(key => {
      if (key !== 'environment') {
        frameImages[key] = [];
        ASSETS_BUNDLE[key].forEach(src => {
          const img = new Image();
          img.src = src;
          frameImages[key].push(img);
        });
      }
    });
    // Carregar elementos de cenário
    if (ASSETS_BUNDLE.environment) {
      Object.keys(ASSETS_BUNDLE.environment).forEach(key => {
        const img = new Image();
        img.src = ASSETS_BUNDLE.environment[key];
        envImages[key] = img;
      });
    }
    assetsReady = true;
    callback();
  } else {
    console.warn('ASSETS_BUNDLE não encontrado');
    callback();
  }
}

// --- 4. FUNDO DO MENU ESTILO HOLLOW KNIGHT (SAKURA, VENTO & NÉVOA) ---
class MenuBackgroundManager {
  constructor() {
    this.canvas = document.getElementById('menu-bg-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.fireflies = [];
    this.fogRipples = [];
    this.resize();
    this.initParticles();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initParticles() {
    // Pétalas de Sakura levadas pelo vento
    this.petals = [];
    for (let i = 0; i < 65; i++) {
      this.petals.push({
        x: Math.random() * (this.width || 1200),
        y: Math.random() * (this.height || 800),
        size: 3 + Math.random() * 5,
        speedX: 1.2 + Math.random() * 2.2,
        speedY: 0.6 + Math.random() * 1.2,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: 0.015 + Math.random() * 0.03,
        alpha: 0.4 + Math.random() * 0.5,
        color: Math.random() > 0.3 ? 'rgba(255, 182, 193,' : 'rgba(251, 191, 36,'
      });
    }

    // Vaga-lumes místicos (Hollow Knight / Ori)
    this.fireflies = [];
    for (let i = 0; i < 30; i++) {
      this.fireflies.push({
        x: Math.random() * (this.width || 1200),
        y: Math.random() * (this.height || 800),
        radius: 1.5 + Math.random() * 2.5,
        baseAlpha: 0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.5,
        color: Math.random() > 0.5 ? '#38bdf8' : '#fbbf24'
      });
    }
  }

  render(timestamp) {
    if (!this.ctx || !this.width) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Céu Noturno Crepúsculo (Profundo e Místico)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, '#06050e');
    skyGrad.addColorStop(0.35, '#120b22');
    skyGrad.addColorStop(0.7, '#1f1338');
    skyGrad.addColorStop(1, '#080511');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // Lua Mística Radiante com Aura Suave
    const moonX = w * 0.25;
    const moonY = h * 0.28;
    const moonGlow = ctx.createRadialGradient(moonX, moonY, 10, moonX, moonY, 220);
    moonGlow.addColorStop(0, 'rgba(254, 240, 138, 0.25)');
    moonGlow.addColorStop(0.5, 'rgba(217, 119, 6, 0.08)');
    moonGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = moonGlow;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 220, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(254, 243, 199, 0.45)';
    ctx.beginPath();
    ctx.arc(moonX, moonY, 70, 0, Math.PI * 2);
    ctx.fill();

    // Silhuetas de Montanhas Distantes com Névoa
    ctx.fillStyle = 'rgba(15, 10, 28, 0.85)';
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, h * 0.65);
    ctx.lineTo(w * 0.2, h * 0.48);
    ctx.lineTo(w * 0.45, h * 0.7);
    ctx.lineTo(w * 0.75, h * 0.42);
    ctx.lineTo(w, h * 0.58);
    ctx.lineTo(w, h);
    ctx.fill();

    // Árvore Sagrada de Sakura em Silhueta / Arte Estilizada à Direita
    this.drawSakuraTreeSilhouette(ctx, w * 0.82, h * 0.95, Math.min(w, h) * 0.6);

    // Efeito de Névoa Rasteira
    const fogGrad = ctx.createLinearGradient(0, h * 0.7, 0, h);
    fogGrad.addColorStop(0, 'transparent');
    fogGrad.addColorStop(1, 'rgba(10, 8, 20, 0.85)');
    ctx.fillStyle = fogGrad;
    ctx.fillRect(0, h * 0.7, w, h * 0.3);

    // Atualizar e Desenhar Vaga-lumes
    for (const f of this.fireflies) {
      f.phase += f.speed;
      f.x += f.vx;
      f.y += f.vy;
      if (f.y < -20) f.y = h + 20;
      if (f.x < -20) f.x = w + 20;
      if (f.x > w + 20) f.x = -20;

      const alpha = f.baseAlpha * (0.5 + Math.sin(f.phase) * 0.5);
      ctx.fillStyle = f.color;
      ctx.shadowColor = f.color;
      ctx.shadowBlur = 10;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1.0;

    // Atualizar e Desenhar Pétalas de Sakura com Brisa de Vento
    for (const p of this.petals) {
      p.x += p.speedX;
      p.y += p.speedY + Math.sin(p.angle) * 0.5;
      p.angle += p.rotSpeed;

      if (p.x > w + 20) p.x = -20;
      if (p.y > h + 20) p.y = -20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = `${p.color} ${p.alpha})`;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  drawSakuraTreeSilhouette(ctx, x, y, size) {
    ctx.save();
    ctx.translate(x, y);

    // Tronco e Galhos Retorcidos
    ctx.strokeStyle = '#0d0917';
    ctx.lineWidth = size * 0.07;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-size * 0.05, -size * 0.4, -size * 0.12, -size * 0.7);
    ctx.stroke();

    ctx.lineWidth = size * 0.04;
    ctx.beginPath();
    ctx.moveTo(-size * 0.06, -size * 0.45);
    ctx.quadraticCurveTo(-size * 0.25, -size * 0.6, -size * 0.35, -size * 0.75);
    ctx.moveTo(-size * 0.1, -size * 0.6);
    ctx.quadraticCurveTo(size * 0.1, -size * 0.75, size * 0.2, -size * 0.85);
    ctx.stroke();

    // Nuvens de Flores de Sakura com Iluminação Rosa Suave
    const drawBlossomCluster = (cx, cy, rad, color) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    };

    drawBlossomCluster(-size * 0.15, -size * 0.75, size * 0.18, 'rgba(244, 114, 182, 0.45)');
    drawBlossomCluster(-size * 0.35, -size * 0.8, size * 0.16, 'rgba(251, 113, 133, 0.4)');
    drawBlossomCluster(size * 0.15, -size * 0.85, size * 0.17, 'rgba(253, 164, 175, 0.45)');
    drawBlossomCluster(-size * 0.05, -size * 0.9, size * 0.15, 'rgba(255, 182, 193, 0.5)');

    ctx.restore();
  }
}

// --- 5. ESTÚDIO DE ANIMAÇÕES ---
class StudioAnimator {
  constructor() {
    this.canvas = document.getElementById('studio-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.currentAnim = 'idle';
    this.currentFrame = 0;
    this.isPlaying = true;
    this.fps = 4;
    this.zoom = 2.0;
    this.lastFrameTime = 0;
    this.showGhost = false;
    this.showGrid = false;
    this.showPivot = true;
    this.bgStyle = 'dark';
    this.setupListeners();
  }

  setupListeners() {
    document.querySelectorAll('.anim-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.anim-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.selectAnimation(card.dataset.anim);
      });
    });

    const bind = (id, event, fn) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener(event, fn);
    };

    bind('btn-play-pause', 'click', () => {
      this.isPlaying = !this.isPlaying;
      document.getElementById('btn-play-pause').textContent = this.isPlaying ? '⏸ Pausar' : '▶ Play';
    });

    bind('btn-prev-frame', 'click', () => {
      this.isPlaying = false;
      document.getElementById('btn-play-pause').textContent = '▶ Play';
      const total = this.getTotalFrames();
      if (total > 0) {
        this.currentFrame = (this.currentFrame - 1 + total) % total;
        this.updateUI();
      }
    });

    bind('btn-next-frame', 'click', () => {
      this.isPlaying = false;
      document.getElementById('btn-play-pause').textContent = '▶ Play';
      const total = this.getTotalFrames();
      if (total > 0) {
        this.currentFrame = (this.currentFrame + 1) % total;
        this.updateUI();
      }
    });

    bind('fps-slider', 'input', (e) => {
      this.fps = parseInt(e.target.value, 10);
      document.getElementById('fps-value').textContent = `${this.fps} FPS`;
    });

    bind('zoom-slider', 'input', (e) => {
      this.zoom = parseFloat(e.target.value);
      document.getElementById('zoom-value').textContent = `${this.zoom.toFixed(1)}x`;
    });

    bind('chk-ghost', 'change', (e) => { this.showGhost = e.target.checked; });
    bind('chk-grid', 'change', (e) => { this.showGrid = e.target.checked; });
    bind('chk-pivot', 'change', (e) => { this.showPivot = e.target.checked; });
  }

  selectAnimation(animKey) {
    this.currentAnim = animKey;
    this.currentFrame = 0;
    const defaultFps = { walk: 8, run: 11, jump: 6, attack: 10, turn: 4, idle: 4 };
    this.fps = defaultFps[animKey] || 6;
    const fpsSlider = document.getElementById('fps-slider');
    const fpsVal = document.getElementById('fps-value');
    if (fpsSlider && fpsVal) {
      fpsSlider.value = this.fps;
      fpsVal.textContent = `${this.fps} FPS`;
    }
    this.updateUI();
  }

  getTotalFrames() {
    return (frameImages[this.currentAnim] || []).length;
  }

  updateUI() {
    const total = this.getTotalFrames();
    const curSpan = document.getElementById('current-frame-num');
    const totSpan = document.getElementById('total-frames-num');
    if (curSpan) curSpan.textContent = total > 0 ? (this.currentFrame + 1) : 0;
    if (totSpan) totSpan.textContent = total;
  }

  render(timestamp) {
    if (!this.ctx) return;
    if (this.isPlaying) {
      const interval = 1000 / this.fps;
      if (timestamp - this.lastFrameTime >= interval) {
        this.lastFrameTime = timestamp;
        const total = this.getTotalFrames();
        if (total > 0) {
          this.currentFrame = (this.currentFrame + 1) % total;
          if (this.currentAnim === 'walk') sfx.playStep();
          if (this.currentAnim === 'attack' && this.currentFrame === 2) sfx.playSlash();
          this.updateUI();
        }
      }
    }

    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    const frames = frameImages[this.currentAnim];
    if (!frames || frames.length === 0) return;

    const curImg = frames[this.currentFrame];
    if (!curImg || !curImg.complete) return;

    const imgW = curImg.naturalWidth || 140;
    const imgH = curImg.naturalHeight || 160;
    const resInd = document.getElementById('current-res-indicator');
    if (resInd) resInd.textContent = `Tam: ${imgW} x ${imgH} px`;

    const drawW = imgW * this.zoom;
    const drawH = imgH * this.zoom;
    const cx = w / 2;
    const cy = h / 2;
    const dx = cx - drawW / 2;
    const dy = cy - drawH / 2;

    // Grade
    if (this.showGrid) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 25) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 25) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
    }

    // Onion Skinning
    if (this.showGhost && frames.length > 1) {
      const prevIdx = (this.currentFrame - 1 + frames.length) % frames.length;
      const prevImg = frames[prevIdx];
      ctx.save();
      ctx.globalAlpha = 0.25;
      if (prevImg && prevImg.complete) {
        ctx.drawImage(prevImg, dx - 12, dy, drawW, drawH);
      }
      ctx.restore();
    }

    // Linha do solo
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 140, dy + drawH * 0.94);
    ctx.lineTo(cx + 140, dy + drawH * 0.94);
    ctx.stroke();

    // Personagem
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(curImg, dx, dy, drawW, drawH);

    // Cruz de Âncora
    if (this.showPivot) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      const py = dy + drawH * 0.94;
      ctx.beginPath(); ctx.arc(cx, py, 5, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - 12, py); ctx.lineTo(cx + 12, py); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, py - 12); ctx.lineTo(cx, py + 12); ctx.stroke();
    }
  }
}

// --- 6. JOGO METROIDVANIA JOGÁVEL 2D COM CENÁRIO DESIGNER DO ZERO & ARTE CONCEITUAL ---
// Inspirado na arte conceitual oficial fornecida: Ori, Hollow Knight e Nine Sols
class MetroidvaniaGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = 1024;
    this.height = this.canvas.height = 576;

    // Estado do Jogador Samurai
    this.player = {
      x: 95,
      y: 382,
      vx: 0,
      vy: 0,
      speed: 4.8,
      sprintSpeed: 7.8,
      jumpForce: -13.0,
      doubleJumpForce: -11.5,
      glideGravity: 0.12,
      gravity: 0.65,
      isGrounded: true,
      canDoubleJump: true,
      isGliding: false,
      isGrappling: false,
      grappleTarget: null,
      facing: 1,
      state: 'idle',
      animTime: 0,
      frameIndex: 0,
      isAttacking: false,
      attackTimer: 0,
      health: 100,
      maxHealth: 100,
      energy: 100,
      maxEnergy: 100,
      scrollsCollected: [],
      checkpointName: 'Vila Sakura'
    };

    this.cameraX = 0;
    this.cameraY = 0;
    this.keys = {};
    this.isPaused = false;

    // Plataformas de Colisão Alinhadas com a Arte Conceitual (level_reference.png)
    this.platforms = [
      // 1. Solo da Vila dos Samurais (Esquerda até o abismo)
      { x: 0, y: 438, w: 485, h: 120, type: 'city_ground' },
      // 2. Telhado da Casa Tradicional de Madeira
      { x: 135, y: 358, w: 110, h: 10, type: 'house_roof' },
      // 3. Beirais e Andares do Pagoda Imperial
      { x: 268, y: 348, w: 120, h: 10, type: 'pagoda_roof' },
      { x: 280, y: 262, w: 96, h: 10, type: 'pagoda_roof' },
      { x: 295, y: 175, w: 66, h: 10, type: 'pagoda_roof' },
      // 4. A Grande Ponte de Pedra Ancestral sobre o Abismo
      { x: 485, y: 418, w: 195, h: 25, type: 'stone_bridge' },
      // 5. Solo da Base dos Penhascos Selvagens (Direita)
      { x: 680, y: 438, w: 344, h: 120, type: 'cliff_ground' },
      // 6. Platô do Meio dos Penhascos (Cogumelos Bioluminescentes)
      { x: 755, y: 292, w: 160, h: 20, type: 'cliff_plateau' },
      // 7. Platô Superior do Penhasco / Laje Alta
      { x: 850, y: 148, w: 174, h: 22, type: 'cliff_top' },
      // 8. Laje de Caverna na Fenda
      { x: 820, y: 382, w: 120, h: 16, type: 'cave_ledge' }
    ];

    // Ilhas / Pedras Flutuantes Rúnicas com Levitação Suave
    this.floatingIslands = [
      { x: 640, y: 228, w: 75, h: 22, baseY: 228, phase: 0.0 },
      { x: 700, y: 188, w: 65, h: 20, baseY: 188, phase: 2.1 },
      { x: 685, y: 280, w: 60, h: 18, baseY: 280, phase: 4.0 }
    ];

    // Pontos de Gancho Místico (Grapple Anchors)
    this.grapplePoints = [
      { id: 'village_lantern', x: 185, y: 365, label: 'Lanterna da Vila' },
      { id: 'pagoda_roof_lower', x: 328, y: 295, label: 'Beiral do Pagoda' },
      { id: 'pagoda_spire', x: 328, y: 145, label: 'Pináculo do Pagoda' },
      { id: 'bridge_lantern', x: 465, y: 390, label: 'Lanterna da Ponte' },
      { id: 'floating_stone_1', x: 675, y: 225, label: 'Pedra Flutuante 1' },
      { id: 'floating_stone_2', x: 730, y: 185, label: 'Pedra Flutuante 2' },
      { id: 'cliff_plateau_anchor', x: 840, y: 275, label: 'Platô dos Cogumelos' },
      { id: 'cliff_top_anchor', x: 935, y: 135, label: 'Topo do Penhasco' }
    ];

    // Corrente de Ar Ascendente no Abismo Azul (para planar alto)
    this.windCurrent = { x: 485, y: 130, w: 195, h: 310, liftForce: -8.8 };

    // Objetos Interativos
    this.saveShrine = { x: 55, y: 380, w: 45, h: 58, name: 'Santuário da Vila Sakura', lit: true };
    this.scrolls = [
      { id: 1, x: 328, y: 115, collected: false, name: 'Pergaminho do Pagoda Imperial' },
      { id: 2, x: 710, y: 140, collected: false, name: 'Pergaminho dos Espíritos Celestes' },
      { id: 3, x: 960, y: 110, collected: false, name: 'Pergaminho dos Penhascos Místicos' }
    ];
    this.trainingDummies = [
      { x: 435, y: 375, hp: 100, maxHp: 100, hitTimer: 0 }
    ];

    // Espíritos de Luz Místicos em Órbita Suave (como na arte de referência)
    this.wispSpirits = [
      { baseX: 710, baseY: 175, radius: 42, speed: 0.028, phase: 0.0, color: '#38bdf8' },
      { baseX: 735, baseY: 135, radius: 34, speed: -0.035, phase: 1.8, color: '#fbbf24' },
      { baseX: 755, baseY: 205, radius: 38, speed: 0.032, phase: 3.5, color: '#67e8f9' }
    ];

    // Efeitos Visuais e Partículas
    this.particles = [];
    this.sakuraPetals = [];
    this.slashes = [];
    this.damageNumbers = [];
    this.fireflies = [];

    this.initVisualAtmosphere();
    this.setupControls();
  }

  initVisualAtmosphere() {
    // Pétalas de Sakura fluindo com a brisa
    this.sakuraPetals = [];
    for (let i = 0; i < 45; i++) {
      this.sakuraPetals.push({
        x: Math.random() * 1100,
        y: Math.random() * 550,
        size: 3.5 + Math.random() * 4.5,
        speedX: 1.1 + Math.random() * 1.8,
        speedY: 0.5 + Math.random() * 1.0,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: 0.018 + Math.random() * 0.025,
        color: Math.random() > 0.3 ? 'rgba(255, 182, 193, 0.85)' : 'rgba(251, 191, 36, 0.75)'
      });
    }

    // Vaga-lumes Luminosos
    this.fireflies = [];
    for (let i = 0; i < 22; i++) {
      this.fireflies.push({
        x: Math.random() * 1024,
        y: 80 + Math.random() * 400,
        radius: 1.5 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.3,
        color: Math.random() > 0.45 ? '#67e8f9' : '#fef08a'
      });
    }
  }

  setupControls() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (['Space', 'KeyW', 'ArrowUp'].includes(e.code)) {
        this.handleJumpPress();
      }
      if (['KeyK', 'KeyQ'].includes(e.code)) {
        this.tryGrapple();
      }
      if (['KeyJ', 'KeyZ', 'KeyX'].includes(e.code)) {
        this.triggerAttack();
      }
      if (e.code === 'KeyE') {
        this.tryInteract();
      }
      if (e.code === 'Escape') {
        this.togglePause();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
      if (['Space', 'KeyW', 'ArrowUp'].includes(e.code)) {
        if (this.player.isGliding) this.player.isGliding = false;
      }
    });

    this.canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) this.triggerAttack();
      else if (e.button === 2) {
        e.preventDefault();
        this.tryGrapple();
      }
    });
    this.canvas.addEventListener('contextmenu', e => e.preventDefault());

    // Botões Virtuais Touch
    const bindBtn = (id, code, action) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('touchstart', (e) => { e.preventDefault(); if (action) action(); else this.keys[code] = true; });
      el.addEventListener('touchend', (e) => { e.preventDefault(); this.keys[code] = false; });
      el.addEventListener('mousedown', (e) => { if (action) action(); else this.keys[code] = true; });
      el.addEventListener('mouseup', () => { this.keys[code] = false; });
    };

    bindBtn('vbtn-left', 'ArrowLeft');
    bindBtn('vbtn-right', 'ArrowRight');
    bindBtn('vbtn-jump', null, () => this.handleJumpPress());
    bindBtn('vbtn-grapple', null, () => this.tryGrapple());
    bindBtn('vbtn-atk', null, () => this.triggerAttack());
    bindBtn('vbtn-interact', null, () => this.tryInteract());

    const qsBtn = document.getElementById('btn-quick-save');
    if (qsBtn) qsBtn.addEventListener('click', () => this.saveProgress('Salvamento Rápido'));

    const pauseBtn = document.getElementById('btn-game-pause');
    if (pauseBtn) pauseBtn.addEventListener('click', () => this.togglePause());
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    const modal = document.getElementById('pause-menu-overlay');
    if (this.isPaused) modal.classList.add('active');
    else modal.classList.remove('active');
  }

  handleJumpPress() {
    const p = this.player;
    if (p.isGrounded) {
      p.vy = p.jumpForce;
      p.isGrounded = false;
      p.canDoubleJump = true;
      this.spawnDust(p.x + 18, p.y + 60, 8);
      sfx.playJump(false);
    } else if (p.canDoubleJump) {
      p.vy = p.doubleJumpForce;
      p.canDoubleJump = false;
      this.spawnDust(p.x + 18, p.y + 45, 12, '#38bdf8');
      sfx.playJump(true);
    } else if (p.vy > 0) {
      p.isGliding = !p.isGliding;
      if (p.isGliding) sfx.playGlide();
    }
  }

  tryGrapple() {
    const p = this.player;
    let closest = null;
    let minDist = 350;

    for (const pt of this.grapplePoints) {
      const dist = Math.hypot(pt.x - (p.x + 18), pt.y - (p.y + 25));
      if (dist < minDist) {
        minDist = dist;
        closest = pt;
      }
    }

    if (closest) {
      p.isGrappling = true;
      p.grappleTarget = closest;
      p.canDoubleJump = true;
      p.isGliding = false;
      sfx.playGrapple();

      for (let i = 0; i < 14; i++) {
        this.particles.push({
          x: closest.x,
          y: closest.y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 20,
          maxLife: 20,
          color: '#38bdf8',
          size: 3
        });
      }
    }
  }

  triggerAttack() {
    const p = this.player;
    if (!p.isAttacking) {
      p.isAttacking = true;
      p.state = 'attack';
      p.frameIndex = 0;
      p.attackTimer = 0;
      sfx.playSlash();

      this.slashes.push({
        x: p.x + (p.facing === 1 ? 35 : -10),
        y: p.y + 20,
        facing: p.facing,
        life: 14,
        maxLife: 14
      });

      const atkBox = {
        x: p.facing === 1 ? p.x + 20 : p.x - 45,
        y: p.y,
        w: 50,
        h: 60
      };

      for (const dummy of this.trainingDummies) {
        if (atkBox.x < dummy.x + 40 && atkBox.x + atkBox.w > dummy.x &&
            atkBox.y < dummy.y + 80 && atkBox.y + atkBox.h > dummy.y) {
          dummy.hitTimer = 10;
          dummy.hp = Math.max(0, dummy.hp - 25);
          if (dummy.hp === 0) dummy.hp = 100;
          this.damageNumbers.push({
            x: dummy.x + 15,
            y: dummy.y - 10,
            text: '-25 🔥',
            life: 30,
            color: '#ef4444'
          });
          for (let i = 0; i < 10; i++) {
            this.particles.push({
              x: dummy.x + 20,
              y: dummy.y + 35,
              vx: (p.facing * 4) + (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.6) * 5,
              life: 18,
              maxLife: 18,
              color: '#fbbf24',
              size: 3
            });
          }
        }
      }
    }
  }

  tryInteract() {
    const p = this.player;
    const distToShrine = Math.hypot(p.x - this.saveShrine.x, p.y - this.saveShrine.y);
    if (distToShrine < 80) {
      p.health = p.maxHealth;
      p.energy = p.maxEnergy;
      this.saveProgress(this.saveShrine.name);
      sfx.playSave();
      this.showToast('⛩️ Santuário da Vila Ativado! Vida Restaurada & Jogo Salvo!');
    }
  }

  saveProgress(checkpointName) {
    this.player.checkpointName = checkpointName;
    saveManager.saveGame(this.player, checkpointName);
    this.showToast(`💾 Jogo Salvo em: ${checkpointName}`);
    const cpLabel = document.getElementById('game-checkpoint-label');
    if (cpLabel) cpLabel.textContent = checkpointName;
  }

  loadProgress(saveData) {
    if (!saveData) return;
    this.player.x = saveData.x;
    this.player.y = saveData.y;
    this.player.health = saveData.health || 100;
    this.player.maxHealth = saveData.maxHealth || 100;
    this.player.energy = saveData.energy || 100;
    this.player.scrollsCollected = saveData.scrolls || [];
    this.player.checkpointName = saveData.checkpoint || 'Vila Sakura';

    const scrLabel = document.getElementById('game-scrolls-label');
    const cpLabel = document.getElementById('game-checkpoint-label');
    if (scrLabel) scrLabel.textContent = `${this.player.scrollsCollected.length} / 3 📜`;
    if (cpLabel) cpLabel.textContent = this.player.checkpointName;

    this.scrolls.forEach(sc => {
      if (this.player.scrollsCollected.includes(sc.id)) sc.collected = true;
    });

    this.showToast(`💾 Jogo Carregado: ${this.player.checkpointName}`);
  }

  showToast(msg) {
    const toast = document.getElementById('save-toast');
    if (toast) {
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }

  spawnDust(x, y, count = 5, color = 'rgba(255,255,255,0.4)') {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 4,
        vx: (Math.random() - 0.5) * 3,
        vy: -Math.random() * 2,
        life: 14,
        maxLife: 14,
        color: color,
        size: 2.5
      });
    }
  }

  update() {
    if (this.isPaused) return;

    const p = this.player;
    const left = this.keys['KeyA'] || this.keys['ArrowLeft'];
    const right = this.keys['KeyD'] || this.keys['ArrowRight'];
    const isSprint = this.keys['ShiftLeft'] || this.keys['ShiftRight'];

    // Verificar Corrente de Ar Ascendente no Abismo
    const wind = this.windCurrent;
    const inWind = (p.x + 18 >= wind.x && p.x + 18 <= wind.x + wind.w &&
                    p.y + 30 >= wind.y && p.y + 30 <= wind.y + wind.h);

    if (inWind) {
      if (p.isGliding || !p.isGrounded) {
        p.vy = Math.max(p.vy - 0.85, wind.liftForce);
      }
    }

    // Física do Gancho
    if (p.isGrappling && p.grappleTarget) {
      const dx = p.grappleTarget.x - (p.x + 18);
      const dy = p.grappleTarget.y - (p.y + 25);
      const dist = Math.hypot(dx, dy);

      if (dist < 40) {
        p.isGrappling = false;
        p.grappleTarget = null;
        p.vy = -10.5;
        p.vx = p.facing * 5.5;
      } else {
        p.vx = (dx / dist) * 13.0;
        p.vy = (dy / dist) * 13.0;
      }
    } else {
      // Movimentação Terrestre
      const spd = isSprint ? p.sprintSpeed : p.speed;
      if (left) {
        p.facing = -1;
        p.vx = -spd;
        if (p.isGrounded && Math.random() < 0.25) this.spawnDust(p.x + 25, p.y + 60, 1);
      } else if (right) {
        p.facing = 1;
        p.vx = spd;
        if (p.isGrounded && Math.random() < 0.25) this.spawnDust(p.x + 10, p.y + 60, 1);
      } else {
        p.vx *= 0.8;
        if (Math.abs(p.vx) < 0.1) p.vx = 0;
      }

      // Gravidade
      if (p.isGliding && p.vy > 0) {
        p.vy = Math.min(p.vy + p.glideGravity, 2.2);
      } else {
        p.vy += p.gravity;
        if (p.vy > 14) p.vy = 14;
      }
    }

    p.x += p.vx;
    p.y += p.vy;

    // Limites Laterais do Mundo
    if (p.x < 15) { p.x = 15; p.vx = 0; }
    if (p.x > 970) { p.x = 970; p.vx = 0; }

    // Queda no Abismo Místico (Águas azuis resgatam o jogador)
    if (p.y > 510) {
      p.x = 520;
      p.y = 350;
      p.vy = -4;
      p.vx = 0;
      p.health = Math.max(10, p.health - 10);
      sfx.playSave();
      this.spawnDust(p.x + 18, p.y + 60, 15, '#38bdf8');
      this.showToast('🌊 Os espíritos das águas resgataram você!');
    }

    // Colisão com Plataformas
    const prevGrounded = p.isGrounded;
    p.isGrounded = false;
    const footX = p.x + 18;
    const footY = p.y + 60;

    for (const plat of this.platforms) {
      if (footX >= plat.x && footX <= plat.x + plat.w) {
        if (p.vy >= 0 && footY >= plat.y && footY - p.vy <= plat.y + 16) {
          p.y = plat.y - 60;
          p.vy = 0;
          p.isGrounded = true;
          p.canDoubleJump = true;
          p.isGliding = false;
          if (!prevGrounded) {
            this.spawnDust(footX, plat.y, 6);
            sfx.playLand();
          }
          break;
        }
      }
    }

    // Colisão com Ilhas Flutuantes (Levitação Senoidal Suave)
    const time = Date.now() * 0.002;
    for (const isl of this.floatingIslands) {
      isl.y = isl.baseY + Math.sin(time + isl.phase) * 10;
      if (footX >= isl.x && footX <= isl.x + isl.w) {
        if (p.vy >= 0 && footY >= isl.y && footY - p.vy <= isl.y + 16) {
          p.y = isl.y - 60;
          p.vy = 0;
          p.isGrounded = true;
          p.canDoubleJump = true;
          p.isGliding = false;
          break;
        }
      }
    }

    // Coletar Pergaminhos
    for (const sc of this.scrolls) {
      if (!sc.collected) {
        if (Math.hypot(p.x + 18 - sc.x, p.y + 30 - sc.y) < 35) {
          sc.collected = true;
          p.scrollsCollected.push(sc.id);
          sfx.playCollect();
          this.showToast(`📜 ${sc.name} Encontrado! (${p.scrollsCollected.length}/3)`);
          const scLabel = document.getElementById('game-scrolls-label');
          if (scLabel) scLabel.textContent = `${p.scrollsCollected.length} / 3 📜`;
        }
      }
    }

    // Atualização de Estados & Animação
    if (p.isAttacking) {
      p.state = 'attack';
      p.attackTimer++;
      p.frameIndex = Math.floor(p.attackTimer / 4);
      if (p.frameIndex >= (frameImages['attack'] || []).length) {
        p.isAttacking = false;
        p.state = 'idle';
      }
    } else if (p.isGliding) {
      p.state = 'jump';
      p.frameIndex = 1;
    } else if (!p.isGrounded) {
      p.state = 'jump';
      p.frameIndex = p.vy < 0 ? 0 : 2;
    } else if (Math.abs(p.vx) > 0.5) {
      const isFast = Math.abs(p.vx) > p.speed;
      p.state = isFast ? 'run' : 'walk';
      p.animTime += 1;
      const rate = isFast ? 5 : 7;
      const count = (frameImages[p.state] || []).length;
      if (count > 0) {
        p.frameIndex = Math.floor(p.animTime / rate) % count;
        if (p.animTime % (rate * 2) === 0) sfx.playStep();
      }
    } else {
      p.state = 'idle';
      p.animTime += 0.5;
      const count = (frameImages['idle'] || []).length;
      if (count > 0) p.frameIndex = Math.floor(p.animTime / 30) % count;
    }

    // Partículas
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const pt = this.particles[i];
      pt.x += pt.vx; pt.y += pt.vy; pt.life--;
      if (pt.life <= 0) this.particles.splice(i, 1);
    }
    for (let i = this.slashes.length - 1; i >= 0; i--) {
      const sl = this.slashes[i];
      sl.life--;
      if (sl.life <= 0) this.slashes.splice(i, 1);
    }
    for (let i = this.damageNumbers.length - 1; i >= 0; i--) {
      const dn = this.damageNumbers[i];
      dn.y -= 0.8; dn.life--;
      if (dn.life <= 0) this.damageNumbers.splice(i, 1);
    }
    for (const dummy of this.trainingDummies) {
      if (dummy.hitTimer > 0) dummy.hitTimer--;
    }
    for (const petal of this.sakuraPetals) {
      petal.x += petal.speedX; petal.y += petal.speedY; petal.angle += petal.rotSpeed;
      if (petal.y > this.height) petal.y = -10;
      if (petal.x > 1050) petal.x = -20;
    }
    for (const f of this.fireflies) {
      f.phase += f.speed;
      f.x += f.vx;
      f.y += f.vy;
      if (f.y > this.height - 20) f.y = 80;
      if (f.y < 50) f.y = 480;
      if (f.x > 1040) f.x = -10;
      if (f.x < -10) f.x = 1040;
    }

    // HUD Update
    const stLabel = document.getElementById('game-state-label');
    const hpFill = document.getElementById('hud-hp-fill');
    const hpText = document.getElementById('hud-hp-text');
    if (stLabel) stLabel.textContent = p.state.toUpperCase();
    if (hpFill) hpFill.style.width = `${(p.health / p.maxHealth) * 100}%`;
    if (hpText) hpText.textContent = `${p.health} / ${p.maxHealth}`;
  }

  // --- RENDERIZAÇÃO LIMPA E TOTAL DO CENÁRIO DO ZERO COM A ARTE OFICIAL ---
  render() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // 1. DESENHAR A ARTE OFICIAL DO CENÁRIO COMO BASE COMPLETA
    if (envImages['level_reference'] && envImages['level_reference'].complete) {
      ctx.drawImage(envImages['level_reference'], 0, 0, w, h);
    } else {
      // Gradiente de fallback crepuscular
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#100b24');
      skyGrad.addColorStop(0.4, '#2a1645');
      skyGrad.addColorStop(0.8, '#1e1133');
      skyGrad.addColorStop(1, '#0b0614');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);
    }

    // 2. EFEITOS DINÂMICOS DE ILUMINAÇÃO & ATMOSFERA (SOBREPOSIÇÃO SUAVE)
    this.drawDynamicAtmosphere(ctx);

    // 3. CORRENTE DE VENTO ASCENDENTE NO ABISMO (EFEITO VISUAL SUAVE)
    this.drawWindUpdraft(ctx);

    // 4. ESPÍRITOS DE LUZ EM ÓRBITA (WISPS MÍSTICOS CINTILANTES)
    this.drawSpiritualWisps(ctx);

    // 5. PONTOS DE GANCHO MÍSTICO (ANÉIS LUMINOSOS DISCRETOS COM HINT)
    this.drawGrappleTargets(ctx);

    // 6. OBJETOS INTERATIVOS LÍMPIDOS (SANTUÁRIO, PERGAMINHOS, BONECO DE TREINO)
    this.drawInteractiveObjectsClean(ctx);

    // 7. CORDA DO GANCHO ATIVO
    const p = this.player;
    if (p.isGrappling && p.grappleTarget) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(p.x + 18, p.y + 20);
      ctx.lineTo(p.grappleTarget.x, p.grappleTarget.y);
      ctx.stroke();
    }

    // 8. PARTÍCULAS DO MUNDO
    for (const pt of this.particles) {
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // 9. NÚMEROS DE DANO
    for (const dn of this.damageNumbers) {
      ctx.fillStyle = dn.color;
      ctx.font = 'bold 14px "Fira Code", monospace';
      ctx.fillText(dn.text, dn.x, dn.y);
    }

    // 10. PERSONAGEM SAMURAI (SPRITESHEET ANIMADO)
    this.drawPlayer(ctx);

    // 11. RASTRO DE CORTE FLAMEJANTE DA KATANA
    for (const sl of this.slashes) {
      ctx.save();
      ctx.translate(sl.x, sl.y);
      ctx.scale(sl.facing, 1);
      ctx.strokeStyle = `rgba(239, 68, 68, ${sl.life / sl.maxLife})`;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, 0, 36, -0.6 * Math.PI, 0.4 * Math.PI);
      ctx.stroke();
      ctx.strokeStyle = `rgba(251, 191, 36, ${sl.life / sl.maxLife})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 30, -0.5 * Math.PI, 0.3 * Math.PI);
      ctx.stroke();
      ctx.restore();
    }

    // 12. VAGA-LUMES E PÉTALAS DE SAKURA (ATMOSFERA FRONTAL)
    this.drawFloatingPetalsAndFireflies(ctx);

    // 13. VINHETA CINEMATOGRÁFICA
    this.drawCinematicVignette(ctx, w, h);
  }

  drawDynamicAtmosphere(ctx) {
    // Brilho pulsante suave na lua
    const moonPulse = (Math.sin(Date.now() * 0.002) + 1) * 0.5;
    const moonGlow = ctx.createRadialGradient(380, 200, 5, 380, 200, 140);
    moonGlow.addColorStop(0, `rgba(254, 240, 138, ${0.15 + moonPulse * 0.08})`);
    moonGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = moonGlow;
    ctx.beginPath();
    ctx.arc(380, 200, 140, 0, Math.PI * 2);
    ctx.fill();

    // God Rays Volumétricos na Fenda Azul
    const time = Date.now() * 0.001;
    ctx.save();
    for (let i = 0; i < 3; i++) {
      const rayX = 520 + i * 55 + Math.sin(time + i * 1.4) * 12;
      const rayGrad = ctx.createLinearGradient(rayX, 420, rayX, 260);
      rayGrad.addColorStop(0, 'rgba(56, 189, 248, 0.28)');
      rayGrad.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
      ctx.fillStyle = rayGrad;
      ctx.beginPath();
      ctx.moveTo(rayX - 12, 430);
      ctx.lineTo(rayX - 28, 260);
      ctx.lineTo(rayX + 28, 260);
      ctx.lineTo(rayX + 12, 430);
      ctx.fill();
    }
    ctx.restore();

    // Pulso bioluminescente sutil nos cogumelos da fenda
    const mushPulse = (Math.sin(Date.now() * 0.004) + 1) * 0.5;
    const drawGlowDot = (gx, gy, col, rad) => {
      const g = ctx.createRadialGradient(gx, gy, 1, gx, gy, rad);
      g.addColorStop(0, col);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(gx, gy, rad, 0, Math.PI * 2);
      ctx.fill();
    };

    drawGlowDot(785, 290, `rgba(56, 189, 248, ${0.35 + mushPulse * 0.25})`, 22);
    drawGlowDot(840, 292, `rgba(167, 243, 208, ${0.35 + mushPulse * 0.25})`, 18);
    drawGlowDot(895, 290, `rgba(254, 240, 138, ${0.30 + mushPulse * 0.20})`, 20);
  }

  drawWindUpdraft(ctx) {
    const wind = this.windCurrent;
    const windPhase = (Date.now() * 0.003) % 45;
    ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
    for (let wy = wind.y + 50; wy < wind.y + wind.h; wy += 65) {
      const curY = wy - windPhase;
      if (curY > wind.y && curY < wind.y + wind.h) {
        ctx.beginPath();
        ctx.moveTo(wind.x + wind.w / 2, curY);
        ctx.lineTo(wind.x + wind.w / 2 - 10, curY + 12);
        ctx.lineTo(wind.x + wind.w / 2 + 10, curY + 12);
        ctx.fill();
      }
    }
  }

  drawSpiritualWisps(ctx) {
    const time = Date.now() * 0.002;
    for (const wisp of this.wispSpirits) {
      const curX = wisp.baseX + Math.cos(time * 1.4 + wisp.phase) * wisp.radius;
      const curY = wisp.baseY + Math.sin(time * 1.8 + wisp.phase) * (wisp.radius * 0.55);

      // Orbe brilhante
      ctx.fillStyle = wisp.color;
      ctx.shadowColor = wisp.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(curX, curY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Cauda de cometa cintilante
      for (let j = 1; j <= 3; j++) {
        const trX = curX - Math.cos(time * 1.4 + wisp.phase) * (j * 6);
        const trY = curY - Math.sin(time * 1.8 + wisp.phase) * (j * 4);
        ctx.globalAlpha = 0.45 / j;
        ctx.beginPath();
        ctx.arc(trX, trY, 3.5 - j * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
    }
    ctx.shadowBlur = 0;
  }

  drawGrappleTargets(ctx) {
    const p = this.player;
    const pulse = (Math.sin(Date.now() * 0.005) + 1) * 0.5;

    for (const pt of this.grapplePoints) {
      const dist = Math.hypot(pt.x - (p.x + 18), pt.y - (p.y + 25));
      const inRange = dist < 350;

      // Anel de mira sutil
      ctx.strokeStyle = inRange ? `rgba(56, 189, 248, ${0.6 + pulse * 0.4})` : 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = inRange ? 2.5 : 1.5;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, (inRange ? 14 : 9) + pulse * 4, 0, Math.PI * 2);
      ctx.stroke();

      // Ponto central
      ctx.fillStyle = inRange ? '#38bdf8' : 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Tecla Hint quando próximo
      if (inRange && dist < 220) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(pt.x - 14, pt.y - 30, 28, 16);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1;
        ctx.strokeRect(pt.x - 14, pt.y - 30, 28, 16);
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('[K]', pt.x, pt.y - 18);
        ctx.textAlign = 'left';
      }
    }
  }

  drawInteractiveObjectsClean(ctx) {
    const p = this.player;

    // 1. Santuário Espiritual (Chama Azul Sagrada & Interação)
    const flamePulse = (Math.sin(Date.now() * 0.006) + 1) * 0.5;
    const sx = this.saveShrine.x;
    const sy = this.saveShrine.y;

    // Chama mística azul no santuário de pedra
    const flameGrad = ctx.createRadialGradient(sx + 20, sy + 25, 2, sx + 20, sy + 25, 18);
    flameGrad.addColorStop(0, '#ffffff');
    flameGrad.addColorStop(0.3, '#38bdf8');
    flameGrad.addColorStop(0.8, 'rgba(14, 165, 233, 0.4)');
    flameGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = flameGrad;
    ctx.beginPath();
    ctx.arc(sx + 20, sy + 25, 16 + flamePulse * 4, 0, Math.PI * 2);
    ctx.fill();

    // Prompt de Interação no Santuário
    if (Math.hypot(p.x - sx, p.y - sy) < 80) {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(sx - 20, sy - 25, 80, 20);
      ctx.strokeStyle = '#38bdf8';
      ctx.strokeRect(sx - 20, sy - 25, 80, 20);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('⛩️ [E] Meditar', sx - 15, sy - 11);
    }

    // 2. Pergaminhos Místicos Flutuantes
    for (const sc of this.scrolls) {
      if (!sc.collected) {
        const hoverY = sc.y + Math.sin(Date.now() * 0.005 + sc.id) * 6;
        // Brilho Dourado
        const glow = ctx.createRadialGradient(sc.x, hoverY, 2, sc.x, hoverY, 18);
        glow.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
        glow.addColorStop(0.5, 'rgba(251, 191, 36, 0.4)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(sc.x, hoverY, 18, 0, Math.PI * 2);
        ctx.fill();

        // Ícone do Pergaminho
        ctx.fillStyle = '#fef08a';
        ctx.font = '16px sans-serif';
        ctx.fillText('📜', sc.x - 8, hoverY + 6);
      }
    }

    // 3. Boneco de Treino de Madeira na Vila
    for (const dummy of this.trainingDummies) {
      ctx.save();
      const dx = dummy.x;
      const dy = dummy.y;

      if (dummy.hitTimer > 0) {
        ctx.translate(dx + 20, dy + 50);
        ctx.rotate((Math.random() - 0.5) * 0.25);
        ctx.translate(-dx - 20, -dy - 50);
      }

      // Poste de Madeira & Alvo
      ctx.fillStyle = '#78350f';
      ctx.fillRect(dx + 16, dy + 20, 8, 40);
      ctx.fillRect(dx + 4, dy + 32, 32, 6);

      // Cabeça de Palha
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.arc(dx + 20, dy + 16, 12, 0, Math.PI * 2);
      ctx.fill();

      // Alvo Vermelho
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(dx + 20, dy + 35, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(dx + 20, dy + 35, 4, 0, Math.PI * 2);
      ctx.fill();

      // Barra de Vida do Boneco
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(dx + 2, dy - 12, 36, 6);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(dx + 2, dy - 12, (dummy.hp / dummy.maxHp) * 36, 6);

      ctx.restore();
    }
  }

  drawPlayer(ctx) {
    const p = this.player;
    let animKey = p.state;
    if (animKey === 'glide') animKey = 'jump';
    const frames = frameImages[animKey] || frameImages['idle'];

    if (frames && frames[p.frameIndex] && frames[p.frameIndex].complete) {
      const frameImg = frames[p.frameIndex];
      const fw = frameImg.naturalWidth || 140;
      const fh = frameImg.naturalHeight || 160;
      const scale = 0.45;
      const dw = fw * scale;
      const dh = fh * scale;

      ctx.save();
      ctx.translate(p.x + 18, p.y + 60);
      ctx.scale(p.facing, 1);

      // Sombra projetada no chão
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 5.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Planador no Ar
      if (p.isGliding) {
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, -dh - 8, 28, Math.PI, 0);
        ctx.stroke();
        ctx.fillStyle = 'rgba(239, 68, 68, 0.65)';
        ctx.fill();
      }

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(frameImg, -dw / 2, -dh, dw, dh);
      ctx.restore();
    }
  }

  drawFloatingPetalsAndFireflies(ctx) {
    // Vaga-lumes luminosos
    for (const f of this.fireflies) {
      const alpha = 0.4 + Math.sin(f.phase) * 0.4;
      ctx.fillStyle = f.color;
      ctx.shadowColor = f.color;
      ctx.shadowBlur = 8;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1.0;

    // Pétalas de Sakura em fluxo suave
    for (const petal of this.sakuraPetals) {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.angle);
      ctx.fillStyle = petal.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, petal.size, petal.size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  drawCinematicVignette(ctx, w, h) {
    const vigGrad = ctx.createRadialGradient(w / 2, h / 2, w * 0.35, w / 2, h / 2, w * 0.65);
    vigGrad.addColorStop(0, 'transparent');
    vigGrad.addColorStop(1, 'rgba(6, 4, 15, 0.4)');
    ctx.fillStyle = vigGrad;
    ctx.fillRect(0, 0, w, h);
  }
}

// --- 7. CONTROLE DO MENU PRINCIPAL & INICIALIZAÇÃO ---
function setupMainMenu(game, menuBg) {
  const menuOverlay = document.getElementById('main-menu-overlay');
  const optionsModal = document.getElementById('options-modal');
  const pauseModal = document.getElementById('pause-menu-overlay');

  saveManager.updateMenuTag();

  // Efeitos Sonoros no Hover dos Itens do Menu
  document.querySelectorAll('.hk-menu-item, .menu-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => sfx.playMenuHover());
  });

  // Novo Jogo
  const newGameBtn = document.getElementById('menu-btn-new-game');
  if (newGameBtn) {
    newGameBtn.addEventListener('click', () => {
      sfx.playMenuSelect();
      menuOverlay.classList.add('hidden');
      game.player.x = 140;
      game.player.y = 380;
      game.player.health = 100;
      sfx.init();
    });
  }

  // Carregar Jogo Salvo
  const loadGameBtn = document.getElementById('menu-btn-load-game');
  if (loadGameBtn) {
    loadGameBtn.addEventListener('click', () => {
      const save = saveManager.loadGame();
      if (save) {
        sfx.playMenuSelect();
        game.loadProgress(save);
        menuOverlay.classList.add('hidden');
        sfx.init();
      }
    });
  }

  // Opções
  const optBtn = document.getElementById('menu-btn-options');
  if (optBtn) {
    optBtn.addEventListener('click', () => {
      sfx.playMenuSelect();
      optionsModal.classList.add('active');
    });
  }

  // Estúdio de Animações
  const studioBtn = document.getElementById('menu-btn-studio');
  if (studioBtn) {
    studioBtn.addEventListener('click', () => {
      sfx.playMenuSelect();
      menuOverlay.classList.add('hidden');
      const tabStudio = document.getElementById('tab-studio-btn');
      if (tabStudio) tabStudio.click();
    });
  }

  // Botão Home no Header
  const homeBtn = document.getElementById('btn-header-menu');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      sfx.playMenuSelect();
      saveManager.updateMenuTag();
      menuOverlay.classList.remove('hidden');
    });
  }

  // Fechar Opções
  const closeOptBtn = document.getElementById('btn-close-options');
  const saveOptBtn = document.getElementById('btn-save-options');
  if (closeOptBtn) closeOptBtn.addEventListener('click', () => optionsModal.classList.remove('active'));
  if (saveOptBtn) saveOptBtn.addEventListener('click', () => optionsModal.classList.remove('active'));

  // Sliders de Volume
  const sfxSlider = document.getElementById('opt-sfx-vol');
  if (sfxSlider) {
    sfxSlider.addEventListener('input', (e) => {
      sfx.sfxVolume = e.target.value / 100.0;
      const sfxVal = document.getElementById('sfx-vol-val');
      if (sfxVal) sfxVal.textContent = `${e.target.value}%`;
    });
  }

  // Salvar no Modal
  const modalSaveBtn = document.getElementById('btn-modal-save-now');
  if (modalSaveBtn) {
    modalSaveBtn.addEventListener('click', () => {
      game.saveProgress('Ajustes do Jogo');
      const msg = document.getElementById('save-info-msg');
      if (msg) msg.textContent = '✅ Jogo salvo com sucesso!';
    });
  }

  const modalClearBtn = document.getElementById('btn-modal-clear-save');
  if (modalClearBtn) {
    modalClearBtn.addEventListener('click', () => {
      if (confirm('Tem certeza de que deseja apagar todos os dados salvos?')) {
        saveManager.clearSave();
        const msg = document.getElementById('save-info-msg');
        if (msg) msg.textContent = '🗑️ Dados salvos apagados.';
      }
    });
  }

  // Pause Menu Buttons
  const resumeBtn = document.getElementById('btn-resume-game');
  if (resumeBtn) resumeBtn.addEventListener('click', () => game.togglePause());

  const pauseSaveBtn = document.getElementById('btn-save-game-pause');
  if (pauseSaveBtn) pauseSaveBtn.addEventListener('click', () => game.saveProgress('Menu de Pausa'));

  const pauseOptBtn = document.getElementById('btn-pause-options');
  if (pauseOptBtn) pauseOptBtn.addEventListener('click', () => optionsModal.classList.add('active'));

  const quitBtn = document.getElementById('btn-quit-to-main');
  if (quitBtn) {
    quitBtn.addEventListener('click', () => {
      pauseModal.classList.remove('active');
      game.isPaused = false;
      saveManager.updateMenuTag();
      menuOverlay.classList.remove('hidden');
    });
  }
}

// Inicialização Global
window.addEventListener('DOMContentLoaded', () => {
  initAssets(() => {
    const menuBg = new MenuBackgroundManager();
    const studio = new StudioAnimator();
    const game = new MetroidvaniaGame();

    setupMainMenu(game, menuBg);
    if (studio) studio.selectAnimation('idle');

    // Navegação de Tabs
    const tabs = {
      'tab-game-btn': 'tab-game',
      'tab-studio-btn': 'tab-studio',
      'tab-export-btn': 'tab-export'
    };
    Object.entries(tabs).forEach(([btnId, tabId]) => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        const targetTab = document.getElementById(tabId);
        if (targetTab) targetTab.classList.add('active');
        sfx.init();
      });
    });

    function mainLoop(timestamp) {
      if (menuBg) menuBg.render(timestamp);
      if (studio) studio.render(timestamp);
      if (game) {
        game.update();
        game.render();
      }
      requestAnimationFrame(mainLoop);
    }
    requestAnimationFrame(mainLoop);
  });
});
