// ==============================================================================
// GATINHO SAMURAI: ECOS MÍSTICOS - MOTOR METROIDVANIA (3840 x 2145)
// Inspirado em Hollow Knight, Ori and the Will of the Wisps e Nine Sols
// ==============================================================================

// --- 1. SISTEMA DE ÁUDIO SINTETIZADO (WEB AUDIO API) ---
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.sfxVolume = 0.8;
    this.bgmVolume = 0.7;
    this.enabled = true;
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
    filter.frequency.setValueAtTime(850, now);
    filter.frequency.exponentialRampToValueAtTime(3400, now + 0.08);

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
    osc.frequency.setValueAtTime(1300, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.16);
    oscGain.gain.setValueAtTime(0.2 * this.sfxVolume, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playBash() {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);

    gain.gain.setValueAtTime(0.35 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.23);
  }

  playPogo() {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.12);

    gain.gain.setValueAtTime(0.3 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  }

  playJump(isDouble = false) {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isDouble ? 380 : 220, now);
    osc.frequency.exponentialRampToValueAtTime(isDouble ? 880 : 600, now + 0.12);

    gain.gain.setValueAtTime(0.25 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  }

  playGlide() {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.25);

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
}

const sfx = new SoundSystem();

// --- 2. SISTEMA DE SALVAMENTO LOCALSTORAGE ---
class SaveManager {
  constructor() {
    this.storageKey = 'gatinho_samurai_metroidvania_v2';
  }

  saveGame(player, checkpointName = 'Santuário Central') {
    const data = {
      x: player.x,
      y: player.y,
      health: player.health,
      maxHealth: player.maxHealth,
      energy: player.energy,
      scrolls: player.scrollsCollected,
      checkpoint: checkpointName,
      timestamp: new Date().toLocaleString('pt-BR')
    };
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      this.updateMenuTag();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  loadGame() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  clearSave() {
    localStorage.removeItem(this.storageKey);
    this.updateMenuTag();
  }

  updateMenuTag() {
    const tag = document.getElementById('main-menu-save-tag');
    const save = this.loadGame();
    if (tag) {
      if (save) {
        tag.textContent = `Salvo: ${save.checkpoint} (${save.scrolls.length}/3 📜)`;
        tag.style.color = '#38bdf8';
      } else {
        tag.textContent = 'Nenhum save';
        tag.style.color = '#94a3b8';
      }
    }
  }
}

const saveManager = new SaveManager();

// --- 3. CARREGADOR DE ASSETS BASE64 ---
const frameImages = {};
const envImages = {};
let assetsReady = false;

function initAssets(callback) {
  if (typeof ASSETS_BUNDLE !== 'undefined') {
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
    callback();
  }
}

// --- 4. ESTÚDIO DE ANIMAÇÕES ---
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
      card.addEventListener('click', (e) => {
        document.querySelectorAll('.anim-card').forEach(c => c.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        this.selectAnimation(target.dataset.anim);
      });
    });

    const playBtn = document.getElementById('btn-play-pause');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        playBtn.textContent = this.isPlaying ? '⏸️ Pausar' : '▶️ Reproduzir';
      });
    }

    const prevBtn = document.getElementById('btn-prev-frame');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.isPlaying = false;
        if (playBtn) playBtn.textContent = '▶️ Reproduzir';
        this.stepFrame(-1);
      });
    }

    const nextBtn = document.getElementById('btn-next-frame');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.isPlaying = false;
        if (playBtn) playBtn.textContent = '▶️ Reproduzir';
        this.stepFrame(1);
      });
    }

    const restartBtn = document.getElementById('btn-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.currentFrame = 0;
        this.updateUI();
      });
    }

    const speedSlider = document.getElementById('speed-slider');
    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        this.fps = parseInt(e.target.value);
        document.getElementById('speed-val').textContent = this.fps;
        document.getElementById('fps-display').textContent = `${this.fps} FPS`;
      });
    }

    const zoomSlider = document.getElementById('zoom-slider');
    if (zoomSlider) {
      zoomSlider.addEventListener('input', (e) => {
        this.zoom = parseFloat(e.target.value);
        document.getElementById('zoom-val').textContent = this.zoom.toFixed(1);
        document.getElementById('zoom-display').textContent = `${this.zoom.toFixed(1)}x`;
      });
    }

    const onionToggle = document.getElementById('toggle-onion');
    if (onionToggle) {
      onionToggle.addEventListener('change', (e) => { this.showGhost = e.target.checked; });
    }
    const gridToggle = document.getElementById('toggle-grid');
    if (gridToggle) {
      gridToggle.addEventListener('change', (e) => { this.showGrid = e.target.checked; });
    }
    const pivotToggle = document.getElementById('toggle-pivot');
    if (pivotToggle) {
      pivotToggle.addEventListener('change', (e) => { this.showPivot = e.target.checked; });
    }
  }

  selectAnimation(animKey) {
    this.currentAnim = animKey;
    this.currentFrame = 0;
    const fpsMap = { idle: 4, walk: 8, run: 11, jump: 6, attack: 10, turn: 4 };
    this.fps = fpsMap[animKey] || 8;
    const speedSlider = document.getElementById('speed-slider');
    if (speedSlider) {
      speedSlider.value = this.fps;
      document.getElementById('speed-val').textContent = this.fps;
      document.getElementById('fps-display').textContent = `${this.fps} FPS`;
    }

    const titles = {
      idle: 'IDLE (Postura de Guarda)',
      walk: 'WALK (Caminhada Fluida)',
      run: 'RUN (Corrida / Dash)',
      jump: 'JUMP (Pulo & Queda)',
      attack: 'ATTACK (Katana Flamejante)',
      turn: 'VURN / TURN (Rotação e Posturas)'
    };
    const titleEl = document.getElementById('current-anim-name');
    if (titleEl) titleEl.textContent = titles[animKey] || animKey.toUpperCase();

    this.buildScrubber();
    this.buildThumbnails();
    this.updateUI();
  }

  buildScrubber() {
    const track = document.getElementById('scrub-track');
    if (!track) return;
    track.innerHTML = '';
    const total = this.getTotalFrames();
    for (let i = 0; i < total; i++) {
      const seg = document.createElement('div');
      seg.className = `scrub-segment ${i === this.currentFrame ? 'active' : ''}`;
      seg.textContent = i + 1;
      seg.addEventListener('click', () => {
        this.currentFrame = i;
        this.isPlaying = false;
        const playBtn = document.getElementById('btn-play-pause');
        if (playBtn) playBtn.textContent = '▶️ Reproduzir';
        this.updateUI();
      });
      track.appendChild(seg);
    }
  }

  buildThumbnails() {
    const container = document.getElementById('frame-thumbs');
    if (!container) return;
    container.innerHTML = '';
    const frames = frameImages[this.currentAnim] || [];
    frames.forEach((img, idx) => {
      const card = document.createElement('div');
      card.className = `thumb-card ${idx === this.currentFrame ? 'active' : ''}`;
      card.innerHTML = `<img src="${img.src}" alt="Frame ${idx+1}"><span>F${idx+1}</span>`;
      card.addEventListener('click', () => {
        this.currentFrame = idx;
        this.isPlaying = false;
        const playBtn = document.getElementById('btn-play-pause');
        if (playBtn) playBtn.textContent = '▶️ Reproduzir';
        this.updateUI();
      });
      container.appendChild(card);
    });
  }

  getTotalFrames() {
    return (frameImages[this.currentAnim] || []).length;
  }

  stepFrame(delta) {
    const total = this.getTotalFrames();
    if (total === 0) return;
    this.currentFrame = (this.currentFrame + delta + total) % total;
    this.updateUI();
  }

  updateUI() {
    const total = this.getTotalFrames();
    const frameInd = document.getElementById('current-frame-indicator');
    if (frameInd) frameInd.textContent = `Quadro: ${this.currentFrame + 1} / ${total}`;

    document.querySelectorAll('.scrub-segment').forEach((seg, idx) => {
      seg.classList.toggle('active', idx === this.currentFrame);
    });
    document.querySelectorAll('.thumb-card').forEach((th, idx) => {
      th.classList.toggle('active', idx === this.currentFrame);
    });
  }

  render(timestamp) {
    if (!this.canvas) return;
    if (this.isPlaying) {
      const interval = 1000 / this.fps;
      if (timestamp - this.lastFrameTime >= interval) {
        this.lastFrameTime = timestamp;
        const total = this.getTotalFrames();
        if (total > 0) {
          this.currentFrame = (this.currentFrame + 1) % total;
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

    // Linha do solo
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 140, dy + drawH * 0.94);
    ctx.lineTo(cx + 140, dy + drawH * 0.94);
    ctx.stroke();

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(curImg, dx, dy, drawW, drawH);

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

// --- 5. MOTOR METROIDVANIA EXPANDIDO (MUNDO 3840 x 2145) ---
class MetroidvaniaWorldGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.minimapCanvas = document.getElementById('minimap-canvas');
    this.minimapCtx = this.minimapCanvas.getContext('2d');

    this.viewWidth = this.canvas.width = 1024;
    this.viewHeight = this.canvas.height = 570;

    // Dimensões do Mundo Completo
    this.worldWidth = 3840;
    this.worldHeight = 2145;

    // Jogador
    this.player = {
      x: 350,
      y: 1580,
      vx: 0,
      vy: 0,
      speed: 7.5,
      sprintSpeed: 11.5,
      jumpForce: -17.5,
      doubleJumpForce: -16.0,
      glideGravity: 0.18,
      gravity: 0.85,
      isGrounded: true,
      canDoubleJump: true,
      isGliding: false,
      isWallSliding: false,
      wallDir: 0,
      facing: 1,
      state: 'idle',
      animTime: 0,
      frameIndex: 0,
      isAttacking: false,
      attackTimer: 0,
      isDownslashing: false,
      health: 100,
      maxHealth: 100,
      energy: 100,
      maxEnergy: 100,
      scrollsCollected: [],
      checkpointName: 'Vila dos Samurais'
    };

    this.cameraX = 0;
    this.cameraY = 0;
    this.keys = {};
    this.isPaused = false;

    // Plataformas dos 4 Setores
    this.platforms = [
      // SETOR 1: Vila & Pagoda (Oeste)
      { x: 0, y: 1680, w: 1800, h: 200, type: 'village_ground' },
      { x: 100, y: 1530, w: 180, h: 24, type: 'house_roof' },
      { x: 550, y: 1450, w: 220, h: 24, type: 'pagoda_roof_1' },
      { x: 580, y: 1220, w: 180, h: 24, type: 'pagoda_roof_2' },
      { x: 620, y: 980, w: 140, h: 24, type: 'pagoda_roof_3' },

      // SETOR 2: Ponte de Pedra & Rio Sagrado (Centro)
      { x: 1800, y: 1550, w: 750, h: 50, type: 'stone_bridge' },

      // SETOR 3: Penhascos & Natureza Selvagem (Leste)
      { x: 2550, y: 1680, w: 1300, h: 200, type: 'wild_ground' },
      { x: 3050, y: 1050, w: 500, h: 40, type: 'cliff_overhang' },
      { x: 2480, y: 880, w: 120, h: 35, type: 'floating_stone', baseY: 880, phase: 0 },
      { x: 2650, y: 660, w: 120, h: 35, type: 'floating_stone', baseY: 660, phase: 1.8 },
      { x: 2750, y: 440, w: 120, h: 35, type: 'floating_stone', baseY: 440, phase: 3.2 },

      // SETOR 4: Ruínas Subterrâneas & Tubulações (Sul)
      { x: 0, y: 2100, w: 3840, h: 100, type: 'subterranean_floor' },
      { x: 1900, y: 1850, w: 400, h: 30, type: 'sub_pipe' },
      { x: 2800, y: 1920, w: 350, h: 30, type: 'sub_pipe' }
    ];

    // Paredes de Escalada (Wall Cling / Wall Jump)
    this.wallCliffs = [
      { x: 2950, y: 200, w: 60, h: 1450, side: -1 }
    ];

    // Espíritos Luminosos / Wisps (Mecânica de Bash)
    this.spiritWisps = [
      { x: 2540, y: 780, color: '#fbbf24', auraRadius: 28, type: 'gold' },
      { x: 2710, y: 560, color: '#38bdf8', auraRadius: 28, type: 'blue' },
      { x: 2820, y: 340, color: '#fbbf24', auraRadius: 28, type: 'gold' }
    ];

    // Cogumelos Bioluminescentes (Pogo)
    this.pogoMushrooms = [
      { x: 2880, y: 1655, w: 60, h: 30, color: '#22c55e', bounceForce: -21.0 },
      { x: 3380, y: 1655, w: 60, h: 30, color: '#06b6d4', bounceForce: -22.0 },
      { x: 2200, y: 1830, w: 55, h: 25, color: '#a855f7', bounceForce: -20.0 }
    ];

    // Corrente de Vento no Abismo
    this.windChasm = { x: 2000, y: 600, w: 350, h: 1200, lift: -11.5 };

    // Santuários de Meditação / Checkpoint
    this.meditationShrines = [
      { x: 300, y: 1620, name: 'Santuário das Cerejeiras (Vila)', lit: true },
      { x: 3200, y: 990, name: 'Santuário do Cume dos Espíritos', lit: true }
    ];

    // Pergaminhos Sagrados
    this.scrolls = [
      { id: 1, x: 690, y: 920, collected: false, name: 'Pergaminho do Pagoda Sagrado' },
      { id: 2, x: 2810, y: 380, collected: false, name: 'Pergaminho das Alturas Astrais' },
      { id: 3, x: 2400, y: 2040, collected: false, name: 'Pergaminho das Profundezas Místicas' }
    ];

    // Efeitos Visuais
    this.particles = [];
    this.sakuraPetals = [];
    this.slashes = [];
    this.damageNumbers = [];

    this.initSakura();
    this.setupControls();
  }

  initSakura() {
    for (let i = 0; i < 60; i++) {
      this.sakuraPetals.push({
        x: Math.random() * this.worldWidth,
        y: Math.random() * this.worldHeight,
        size: 4 + Math.random() * 5,
        speedX: 1.0 + Math.random() * 1.5,
        speedY: 1.2 + Math.random() * 1.8,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: 0.02 + Math.random() * 0.03,
        color: Math.random() > 0.35 ? 'rgba(255, 182, 193, 0.8)' : 'rgba(251, 191, 36, 0.7)'
      });
    }
  }

  setupControls() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (['Space', 'KeyW', 'ArrowUp'].includes(e.code)) {
        this.handleJumpPress();
      }
      if (['KeyQ', 'KeyK'].includes(e.code)) {
        this.trySpiritBash();
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
      if (['Space', 'KeyW', 'ArrowUp', 'KeyS'].includes(e.code)) {
        if (this.player.isGliding) this.player.isGliding = false;
      }
    });

    this.canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) this.triggerAttack();
      else if (e.button === 2) {
        e.preventDefault();
        this.trySpiritBash();
      }
    });
    this.canvas.addEventListener('contextmenu', e => e.preventDefault());

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
    bindBtn('vbtn-bash', null, () => this.trySpiritBash());
    bindBtn('vbtn-atk', null, () => this.triggerAttack());
    bindBtn('vbtn-interact', null, () => this.tryInteract());

    const quickSaveBtn = document.getElementById('btn-quick-save');
    if (quickSaveBtn) {
      quickSaveBtn.addEventListener('click', () => {
        this.saveProgress('Salvamento Rápido');
      });
    }

    const pauseBtn = document.getElementById('btn-game-pause');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        this.togglePause();
      });
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    const modal = document.getElementById('pause-menu-overlay');
    if (modal) {
      if (this.isPaused) modal.classList.add('active');
      else modal.classList.remove('active');
    }
  }

  handleJumpPress() {
    const p = this.player;
    if (p.isGrounded) {
      p.vy = p.jumpForce;
      p.isGrounded = false;
      p.canDoubleJump = true;
      this.spawnDust(p.x + 35, p.y + 110, 10);
      sfx.playJump(false);
    } else if (p.isWallSliding) {
      p.vy = p.jumpForce * 0.95;
      p.vx = -p.wallDir * (p.sprintSpeed * 1.1);
      p.facing = -p.wallDir;
      p.isWallSliding = false;
      p.canDoubleJump = true;
      this.spawnDust(p.x + 35, p.y + 70, 12, '#38bdf8');
      sfx.playJump(true);
    } else if (p.canDoubleJump) {
      p.vy = p.doubleJumpForce;
      p.canDoubleJump = false;
      this.spawnDust(p.x + 35, p.y + 80, 14, '#fbbf24');
      sfx.playJump(true);
    } else if (p.vy > 0) {
      p.isGliding = !p.isGliding;
      if (p.isGliding) sfx.playGlide();
    }
  }

  trySpiritBash() {
    const p = this.player;
    let closestWisp = null;
    let minDist = 180;

    for (const wisp of this.spiritWisps) {
      const dist = Math.hypot(wisp.x - (p.x + 35), wisp.y - (p.y + 60));
      if (dist < minDist) {
        minDist = dist;
        closestWisp = wisp;
      }
    }

    if (closestWisp) {
      p.vx = p.facing * 18.0;
      p.vy = -18.0;
      p.canDoubleJump = true;
      p.isGliding = false;
      sfx.playBash();

      this.showToast('✨ Bash Espiritual Ativado!');
      for (let i = 0; i < 20; i++) {
        this.particles.push({
          x: closestWisp.x,
          y: closestWisp.y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 25,
          maxLife: 25,
          color: closestWisp.color,
          size: 4
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

      const isDown = this.keys['KeyS'] || this.keys['ArrowDown'];
      p.isDownslashing = !p.isGrounded && isDown;

      sfx.playSlash();

      this.slashes.push({
        x: p.x + (p.facing === 1 ? 55 : -20),
        y: p.isDownslashing ? p.y + 90 : p.y + 40,
        facing: p.facing,
        isDown: p.isDownslashing,
        life: 14,
        maxLife: 14
      });

      if (p.isDownslashing) {
        for (const mush of this.pogoMushrooms) {
          if (p.x + 35 >= mush.x && p.x + 35 <= mush.x + mush.w &&
              p.y + 110 >= mush.y && p.y + 110 <= mush.y + 40) {
            p.vy = mush.bounceForce;
            p.canDoubleJump = true;
            p.isGliding = false;
            sfx.playPogo();
            this.showToast('🍄 Pogo Bounce!');
            for (let i = 0; i < 10; i++) {
              this.particles.push({
                x: mush.x + mush.w / 2,
                y: mush.y,
                vx: (Math.random() - 0.5) * 6,
                vy: -Math.random() * 5,
                life: 18,
                maxLife: 18,
                color: mush.color,
                size: 4
              });
            }
            break;
          }
        }
      }
    }
  }

  tryInteract() {
    const p = this.player;
    for (const shrine of this.meditationShrines) {
      if (Math.hypot(p.x - shrine.x, p.y - shrine.y) < 120) {
        p.health = p.maxHealth;
        p.energy = p.maxEnergy;
        this.saveProgress(shrine.name);
        sfx.playSave();
        this.showToast(`⛩️ ${shrine.name} - Meditação Concluída & Vida Restaurada!`);
        break;
      }
    }
  }

  saveProgress(checkpointName) {
    this.player.checkpointName = checkpointName;
    saveManager.saveGame(this.player, checkpointName);
    this.showToast(`💾 Jogo Salvo em: ${checkpointName}`);
  }

  loadProgress(saveData) {
    if (!saveData) return;
    this.player.x = saveData.x;
    this.player.y = saveData.y;
    this.player.health = saveData.health || 100;
    this.player.energy = saveData.energy || 100;
    this.player.scrollsCollected = saveData.scrolls || [];
    this.player.checkpointName = saveData.checkpoint || 'Vila dos Samurais';

    this.scrolls.forEach(sc => {
      sc.collected = this.player.scrollsCollected.includes(sc.id);
    });

    const scrollLabel = document.getElementById('game-scrolls-label');
    if (scrollLabel) scrollLabel.textContent = `${this.player.scrollsCollected.length} / 3 📜`;
    this.showToast(`📂 Jogo Carregado: ${this.player.checkpointName}`);
    sfx.playSave();
  }

  showToast(msg) {
    const toast = document.getElementById('save-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
  }

  spawnDust(x, y, count = 4, color = 'rgba(148, 163, 184, 0.5)') {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 3,
        life: 20,
        maxLife: 20,
        color: color,
        size: 3 + Math.random() * 4
      });
    }
  }

  update() {
    if (this.isPaused) return;

    const p = this.player;
    const left = this.keys['KeyA'] || this.keys['ArrowLeft'];
    const right = this.keys['KeyD'] || this.keys['ArrowRight'];
    const isSprint = this.keys['ShiftLeft'] || this.keys['ShiftRight'];

    // Corrente de Vento no Abismo
    const wind = this.windChasm;
    const inWind = p.x >= wind.x && p.x <= wind.x + wind.w && p.y >= wind.y && p.y <= wind.y + wind.h;
    if (inWind) {
      if (p.isGliding || !p.isGrounded) {
        p.vy = Math.max(p.vy - 1.2, wind.lift);
      }
    }

    // Movimentação
    const spd = isSprint ? p.sprintSpeed : p.speed;
    if (left) {
      p.facing = -1;
      p.vx = -spd;
      if (p.isGrounded && Math.random() < 0.25) this.spawnDust(p.x + 45, p.y + 110, 1);
    } else if (right) {
      p.facing = 1;
      p.vx = spd;
      if (p.isGrounded && Math.random() < 0.25) this.spawnDust(p.x + 20, p.y + 110, 1);
    } else {
      p.vx *= 0.8;
      if (Math.abs(p.vx) < 0.1) p.vx = 0;
    }

    // Wall Cling
    p.isWallSliding = false;
    if (!p.isGrounded && p.vy > 0) {
      for (const wall of this.wallCliffs) {
        if (p.x + 70 >= wall.x && p.x <= wall.x + wall.w && p.y >= wall.y && p.y <= wall.y + wall.h) {
          if ((left && wall.side === 1) || (right && wall.side === -1)) {
            p.isWallSliding = true;
            p.wallDir = wall.side;
            p.vy = Math.min(p.vy, 3.0);
          }
        }
      }
    }

    // Gravidade
    if (p.isGliding && p.vy > 0) {
      p.vy = Math.min(p.vy + p.glideGravity, 2.5);
    } else if (!p.isWallSliding) {
      p.vy += p.gravity;
      if (p.vy > 18) p.vy = 18;
    }

    p.x += p.vx;
    p.y += p.vy;

    p.x = Math.max(20, Math.min(this.worldWidth - 90, p.x));
    p.y = Math.max(50, Math.min(this.worldHeight - 130, p.y));

    // Colisão
    const prevGrounded = p.isGrounded;
    p.isGrounded = false;
    const footX = p.x + 35;
    const footY = p.y + 110;

    const time = Date.now() * 0.002;

    for (const plat of this.platforms) {
      if (plat.type === 'floating_stone') {
        plat.y = plat.baseY + Math.sin(time + plat.phase) * 16;
      }

      if (footX >= plat.x && footX <= plat.x + plat.w) {
        if (p.vy >= 0 && footY >= plat.y && footY - p.vy <= plat.y + 24) {
          p.y = plat.y - 110;
          p.vy = 0;
          p.isGrounded = true;
          p.canDoubleJump = true;
          p.isGliding = false;
          if (!prevGrounded) {
            this.spawnDust(footX, plat.y, 6);
            sfx.playStep();
          }
          break;
        }
      }
    }

    // Coleta de Pergaminhos
    for (const sc of this.scrolls) {
      if (!sc.collected) {
        if (Math.hypot(p.x + 35 - sc.x, p.y + 55 - sc.y) < 55) {
          sc.collected = true;
          p.scrollsCollected.push(sc.id);
          sfx.playCollect();
          this.showToast(`📜 ${sc.name} Descoberto! (${p.scrollsCollected.length}/3)`);
          const scrollLabel = document.getElementById('game-scrolls-label');
          if (scrollLabel) scrollLabel.textContent = `${p.scrollsCollected.length} / 3 📜`;
        }
      }
    }

    // Setor
    let sectorName = 'Vila dos Samurais';
    if (p.y > 1750) sectorName = 'Ruínas Subterrâneas & Tubulações';
    else if (p.x > 2500) sectorName = 'Penhasco dos Espíritos & Ilhas Levitantes';
    else if (p.x > 1700) sectorName = 'Ponte de Pedra & Rio das Almas';
    const sectorLabel = document.getElementById('game-sector-label');
    if (sectorLabel) sectorLabel.textContent = sectorName;

    // Animações
    if (p.isAttacking) {
      p.state = 'attack';
      p.attackTimer++;
      p.frameIndex = Math.floor(p.attackTimer / 4);
      if (p.frameIndex >= (frameImages['attack'] || []).length) {
        p.isAttacking = false;
        p.isDownslashing = false;
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

    // Câmera
    const targetCamX = Math.max(0, Math.min(this.worldWidth - this.viewWidth, p.x - this.viewWidth / 2 + 35));
    const targetCamY = Math.max(0, Math.min(this.worldHeight - this.viewHeight, p.y - this.viewHeight / 2 + 55));
    this.cameraX += (targetCamX - this.cameraX) * 0.08;
    this.cameraY += (targetCamY - this.cameraY) * 0.08;

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
    for (const petal of this.sakuraPetals) {
      petal.x += petal.speedX; petal.y += petal.speedY; petal.angle += petal.rotSpeed;
      if (petal.y > this.worldHeight) petal.y = -10;
      if (petal.x > this.worldWidth) petal.x = -10;
    }
  }

  render() {
    const ctx = this.ctx;
    const vw = this.viewWidth;
    const vh = this.viewHeight;

    const sky = ctx.createLinearGradient(0, 0, vw, vh);
    sky.addColorStop(0, '#131124');
    sky.addColorStop(0.5, '#1e1b4b');
    sky.addColorStop(1, '#060913');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, vw, vh);

    ctx.save();
    ctx.translate(-this.cameraX, -this.cameraY);

    if (envImages['metroidvania_world_art'] && envImages['metroidvania_world_art'].complete) {
      ctx.drawImage(envImages['metroidvania_world_art'], 0, 0, this.worldWidth, this.worldHeight);
    }

    const wind = this.windChasm;
    ctx.fillStyle = 'rgba(56, 189, 248, 0.07)';
    ctx.fillRect(wind.x, wind.y, wind.w, wind.h);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.setLineDash([8, 8]);
    ctx.strokeRect(wind.x, wind.y, wind.w, wind.h);
    ctx.setLineDash([]);

    const windPhase = (Date.now() * 0.003) % 50;
    ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
    for (let wy = wind.y + 60; wy < wind.y + wind.h; wy += 90) {
      const curY = wy - windPhase;
      if (curY > wind.y && curY < wind.y + wind.h) {
        ctx.beginPath();
        ctx.moveTo(wind.x + wind.w / 2, curY);
        ctx.lineTo(wind.x + wind.w / 2 - 16, curY + 20);
        ctx.lineTo(wind.x + wind.w / 2 + 16, curY + 20);
        ctx.fill();
      }
    }

    const wispTime = Date.now() * 0.003;
    for (const wisp of this.spiritWisps) {
      const curX = wisp.x + Math.sin(wispTime) * 12;
      const curY = wisp.y + Math.sin(wispTime * 2) * 8;

      ctx.fillStyle = wisp.color;
      ctx.beginPath(); ctx.arc(curX, curY, 8, 0, Math.PI * 2); ctx.fill();

      ctx.strokeStyle = wisp.color;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(curX, curY, wisp.auraRadius + Math.sin(wispTime * 3) * 4, 0, Math.PI * 2); ctx.stroke();
    }

    for (const mush of this.pogoMushrooms) {
      ctx.fillStyle = mush.color;
      ctx.beginPath();
      ctx.ellipse(mush.x + mush.w / 2, mush.y + 10, mush.w / 2, mush.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const sc of this.scrolls) {
      if (!sc.collected) {
        const hoverY = sc.y + Math.sin(Date.now() * 0.005) * 6;
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath(); ctx.arc(sc.x, hoverY, 14, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#b45309';
        ctx.fillRect(sc.x - 8, hoverY - 6, 16, 12);
      }
    }

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

    for (const pt of this.particles) {
      ctx.fillStyle = pt.color;
      ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2); ctx.fill();
    }

    const p = this.player;
    let animKey = p.state;
    if (animKey === 'glide') animKey = 'jump';
    const frames = frameImages[animKey] || frameImages['idle'];

    if (frames && frames[p.frameIndex] && frames[p.frameIndex].complete) {
      const frameImg = frames[p.frameIndex];
      const fw = frameImg.naturalWidth || 140;
      const fh = frameImg.naturalHeight || 160;
      const scale = 0.85;
      const dw = fw * scale;
      const dh = fh * scale;

      ctx.save();
      ctx.translate(p.x + 35, p.y + 110);
      ctx.scale(p.facing, 1);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.beginPath(); ctx.ellipse(0, 0, 26, 8, 0, 0, Math.PI * 2); ctx.fill();

      if (p.isGliding) {
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.arc(0, -dh - 12, 38, Math.PI, 0); ctx.stroke();
        ctx.fillStyle = 'rgba(239, 68, 68, 0.65)';
        ctx.fill();
      }

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(frameImg, -dw / 2, -dh, dw, dh);
      ctx.restore();
    }

    for (const sl of this.slashes) {
      ctx.save();
      ctx.translate(sl.x, sl.y);
      ctx.scale(sl.facing, 1);
      ctx.strokeStyle = `rgba(239, 68, 68, ${sl.life / sl.maxLife})`;
      ctx.lineWidth = 7;
      ctx.beginPath();
      if (sl.isDown) {
        ctx.arc(0, 0, 45, 0.2 * Math.PI, 0.8 * Math.PI);
      } else {
        ctx.arc(0, 0, 45, -0.6 * Math.PI, 0.4 * Math.PI);
      }
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
    this.renderMinimap();
  }

  renderMinimap() {
    const mctx = this.minimapCtx;
    const mw = this.minimapCanvas.width;
    const mh = this.minimapCanvas.height;

    mctx.clearRect(0, 0, mw, mh);

    mctx.fillStyle = '#0f172a';
    mctx.fillRect(0, 0, mw, mh);

    // Setores no Minimapa
    mctx.fillStyle = 'rgba(21, 128, 61, 0.4)';
    mctx.fillRect(0, mh * 0.5, mw * 0.45, mh * 0.3);

    mctx.fillStyle = 'rgba(2, 132, 199, 0.6)';
    mctx.fillRect(mw * 0.45, mh * 0.5, mw * 0.15, mh * 0.4);

    mctx.fillStyle = 'rgba(100, 116, 139, 0.4)';
    mctx.fillRect(mw * 0.6, mh * 0.1, mw * 0.4, mh * 0.7);

    mctx.fillStyle = 'rgba(67, 56, 202, 0.3)';
    mctx.fillRect(0, mh * 0.85, mw, mh * 0.15);

    const px = (this.player.x / this.worldWidth) * mw;
    const py = (this.player.y / this.worldHeight) * mh;

    mctx.fillStyle = '#fbbf24';
    mctx.beginPath(); mctx.arc(px, py, 3.5, 0, Math.PI * 2); mctx.fill();

    for (const sh of this.meditationShrines) {
      const sx = (sh.x / this.worldWidth) * mw;
      const sy = (sh.y / this.worldHeight) * mh;
      mctx.fillStyle = '#38bdf8';
      mctx.fillRect(sx - 2, sy - 2, 4, 4);
    }
  }
}

// --- 6. MENU PRINCIPAL & INICIALIZAÇÃO ---
function setupMainMenu(game) {
  const menuOverlay = document.getElementById('main-menu-overlay');
  const optionsModal = document.getElementById('options-modal');
  const pauseModal = document.getElementById('pause-menu-overlay');

  saveManager.updateMenuTag();

  const newGameBtn = document.getElementById('menu-btn-new-game');
  if (newGameBtn) {
    newGameBtn.addEventListener('click', () => {
      menuOverlay.classList.add('hidden');
      game.player.x = 350;
      game.player.y = 1580;
      game.player.health = 100;
      sfx.init();
      sfx.playSave();
    });
  }

  const loadGameBtn = document.getElementById('menu-btn-load-game');
  if (loadGameBtn) {
    loadGameBtn.addEventListener('click', () => {
      const save = saveManager.loadGame();
      if (save) {
        game.loadProgress(save);
        menuOverlay.classList.add('hidden');
        sfx.init();
      } else {
        alert('Nenhum jogo salvo encontrado. Inicie um novo jogo!');
      }
    });
  }

  const optBtn = document.getElementById('menu-btn-options');
  if (optBtn) {
    optBtn.addEventListener('click', () => {
      optionsModal.classList.add('active');
    });
  }

  const studioBtn = document.getElementById('menu-btn-studio');
  if (studioBtn) {
    studioBtn.addEventListener('click', () => {
      menuOverlay.classList.add('hidden');
      const tabStudioBtn = document.getElementById('tab-studio-btn');
      if (tabStudioBtn) tabStudioBtn.click();
    });
  }

  const headerMenuBtn = document.getElementById('btn-header-menu');
  if (headerMenuBtn) {
    headerMenuBtn.addEventListener('click', () => {
      menuOverlay.classList.remove('hidden');
    });
  }

  const closeOptBtn = document.getElementById('btn-close-options');
  if (closeOptBtn) {
    closeOptBtn.addEventListener('click', () => {
      optionsModal.classList.remove('active');
    });
  }
  const saveOptBtn = document.getElementById('btn-save-options');
  if (saveOptBtn) {
    saveOptBtn.addEventListener('click', () => {
      optionsModal.classList.remove('active');
    });
  }

  const sfxSlider = document.getElementById('opt-sfx-vol');
  if (sfxSlider) {
    sfxSlider.addEventListener('input', (e) => {
      sfx.sfxVolume = e.target.value / 100.0;
      document.getElementById('sfx-vol-val').textContent = `${e.target.value}%`;
    });
  }

  const modalSaveBtn = document.getElementById('btn-modal-save-now');
  if (modalSaveBtn) {
    modalSaveBtn.addEventListener('click', () => {
      game.saveProgress('Menu de Opções');
      document.getElementById('save-info-msg').textContent = '✅ Jogo salvo com sucesso!';
    });
  }

  const clearSaveBtn = document.getElementById('btn-modal-clear-save');
  if (clearSaveBtn) {
    clearSaveBtn.addEventListener('click', () => {
      if (confirm('Tem certeza de que deseja apagar os dados salvos?')) {
        saveManager.clearSave();
        document.getElementById('save-info-msg').textContent = '🗑️ Dados salvos apagados.';
      }
    });
  }

  const resumeBtn = document.getElementById('btn-resume-game');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      game.togglePause();
    });
  }

  const pauseSaveBtn = document.getElementById('btn-save-game-pause');
  if (pauseSaveBtn) {
    pauseSaveBtn.addEventListener('click', () => {
      game.saveProgress('Menu de Pausa');
    });
  }

  const pauseOptBtn = document.getElementById('btn-pause-options');
  if (pauseOptBtn) {
    pauseOptBtn.addEventListener('click', () => {
      optionsModal.classList.add('active');
    });
  }

  const quitBtn = document.getElementById('btn-quit-to-main');
  if (quitBtn) {
    quitBtn.addEventListener('click', () => {
      pauseModal.classList.remove('active');
      game.isPaused = false;
      menuOverlay.classList.remove('hidden');
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  initAssets(() => {
    const studio = new StudioAnimator();
    const game = new MetroidvaniaWorldGame();

    setupMainMenu(game);
    if (studio.canvas) studio.selectAnimation('idle');

    const tabs = {
      'tab-game-btn': 'tab-game',
      'tab-studio-btn': 'tab-studio'
    };
    Object.entries(tabs).forEach(([btnId, tabId]) => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
        sfx.init();
      });
    });

    function mainLoop(timestamp) {
      studio.render(timestamp);
      game.update();
      game.render();
      requestAnimationFrame(mainLoop);
    }
    requestAnimationFrame(mainLoop);
  });
});
