// ==============================================================================
// GATINHO SAMURAI: ECOS MÍSTICOS - MOTOR METROIDVANIA EXPANDIDO
// Inspirado em Hollow Knight, Ori and the Will of the Wisps e Nine Sols
// ==============================================================================

// --- 1. SISTEMA DE ÁUDIO SINTETIZADO & MÚSICA AMBIENTE DINÂMICA ---
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.sfxVolume = 0.8;
    this.bgmVolume = 0.7;
    this.enabled = true;
    this.bgmTimer = null;
    this.currentSector = 'village';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.startAmbientMusic();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Melodia Zen Procedural por Setor (Shakuhachi / Koto / Caverna Drone)
  startAmbientMusic() {
    if (this.bgmTimer) return;
    const playNote = () => {
      if (!this.enabled || this.bgmVolume <= 0 || !this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Escala Pentatônica Japonesa (Insen / Hirajoshi: D, Eb, G, A, C)
      const villageScale = [293.66, 311.13, 392.00, 440.00, 523.25, 587.33];
      const caveScale = [146.83, 155.56, 196.00, 220.00, 261.63];

      const scale = this.currentSector === 'cave' ? caveScale : villageScale;
      const freq = scale[Math.floor(Math.random() * scale.length)];

      osc.type = this.currentSector === 'cave' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(this.currentSector === 'cave' ? 350 : 1200, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08 * this.bgmVolume, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 4.6);
    };

    this.bgmTimer = setInterval(playNote, 2800);
  }

  playVoiceChatter(pitch = 1.0) {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime((300 + Math.random() * 200) * pitch, now + i * 0.06);
      gain.gain.setValueAtTime(0.12 * this.sfxVolume, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.06);
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

  playDash() {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
    gain.gain.setValueAtTime(0.2 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  playBreak() {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.2);
    gain.gain.setValueAtTime(0.35 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
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
    this.storageKey = 'gatinho_samurai_metroidvania_v3';
  }

  saveGame(player, checkpointName = 'Santuário Central') {
    const data = {
      x: player.x,
      y: player.y,
      health: player.health,
      maxHealth: player.maxHealth,
      energy: player.energy,
      scrolls: player.scrollsCollected,
      keystones: player.keystonesCollected,
      equippedAmulets: player.equippedAmulets,
      unlockedAmulets: player.unlockedAmulets,
      questsCompleted: player.questsCompleted,
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
        tag.textContent = `${save.checkpoint} (${save.scrolls.length}/3 📜)`;
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
        playBtn.textContent = this.isPlaying ? '⏸️' : '▶️';
      });
    }

    const prevBtn = document.getElementById('btn-prev-frame');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.isPlaying = false;
        if (playBtn) playBtn.textContent = '▶️';
        this.stepFrame(-1);
      });
    }

    const nextBtn = document.getElementById('btn-next-frame');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.isPlaying = false;
        if (playBtn) playBtn.textContent = '▶️';
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
  }

  selectAnimation(animKey) {
    this.currentAnim = animKey;
    this.currentFrame = 0;
    const fpsMap = { idle: 4, walk: 8, run: 11, jump: 6, attack: 10, turn: 4 };
    this.fps = fpsMap[animKey] || 8;

    const titleEl = document.getElementById('current-anim-name');
    if (titleEl) titleEl.textContent = animKey.toUpperCase();

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
        if (playBtn) playBtn.textContent = '▶️';
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
      card.innerHTML = `<img src="${img.src}" alt="Frame ${idx+1}">`;
      card.addEventListener('click', () => {
        this.currentFrame = idx;
        this.isPlaying = false;
        const playBtn = document.getElementById('btn-play-pause');
        if (playBtn) playBtn.textContent = '▶️';
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

    const drawW = imgW * this.zoom;
    const drawH = imgH * this.zoom;
    const cx = w / 2;
    const cy = h / 2;
    const dx = cx - drawW / 2;
    const dy = cy - drawH / 2;

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 140, dy + drawH * 0.94);
    ctx.lineTo(cx + 140, dy + drawH * 0.94);
    ctx.stroke();

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(curImg, dx, dy, drawW, drawH);
  }
}

// --- 5. MOTOR METROIDVANIA EXPANDIDO (MUNDO 3840 x 2145) ---
class MetroidvaniaWorldGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Dimensões do Mundo Completo
    this.worldWidth = 3840;
    this.worldHeight = 2145;

    // Jogador (5 Máscaras Base = 100 HP, cada máscara = 20 HP)
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
      maxHealth: 100, // Pode aumentar para 120 (+1 Máscara)
      energy: 100,
      maxEnergy: 100,
      scrollsCollected: [],
      keystonesCollected: 0,
      equippedAmulets: ['storm_claw'], // Max 2 slots
      unlockedAmulets: ['storm_claw', 'lotus_wings', 'spirit_eye'],
      questsCompleted: [],
      checkpointName: 'Vila dos Samurais',
      dashCooldown: 0,
      isDashing: false,
      dashTimer: 0
    };

    this.cameraX = 0;
    this.cameraY = 0;
    this.keys = {};
    this.isPaused = false;
    this.currentDialogueNPC = null;
    this.activeInteractTarget = null;

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

    // 🪷 Plataformas Efêmeras de Lótus (Ori Style - 1.5s timer)
    this.lotusPlatforms = [
      { x: 1950, y: 1480, w: 85, h: 20, timer: 0, fading: false, respawnTimer: 0, active: true },
      { x: 2120, y: 1400, w: 85, h: 20, timer: 0, fading: false, respawnTimer: 0, active: true },
      { x: 2290, y: 1320, w: 85, h: 20, timer: 0, fading: false, respawnTimer: 0, active: true }
    ];

    // 🧱 Paredes Destrutíveis
    this.destructibleWalls = [
      { id: 'cave_wall_1', x: 2280, y: 1940, w: 35, h: 160, hits: 0, maxHits: 2, destroyed: false }
    ];

    // ⛩️ Portão Rúnico Ancestral (Keystone Gate)
    this.keystoneGate = {
      x: 1780, y: 1540, w: 40, h: 160, required: 2, isOpen: false
    };

    // 🔑 Chaves de Espírito (Keystones)
    this.keystones = [
      { id: 1, x: 670, y: 940, collected: false },
      { id: 2, x: 2100, y: 1720, collected: false }
    ];

    // 🐱 NPCs com Diálogos e Quests
    this.npcs = [
      {
        id: 'elder_jin',
        name: 'Mestre Ancião Jin',
        portrait: '🐱',
        x: 420,
        y: 1570,
        pitch: 0.8,
        initialText: 'Os espíritos do vale estão inquietos. Traga-me as 2 Chaves de Espírito escondidas nos telhados e no rio para abrir o grande portão.',
        completedText: 'Você provou sua disciplina! Tome este Fragmento de Máscara Sagrada. Sua vida máxima foi expandida!'
      },
      {
        id: 'blacksmith_kumi',
        name: 'Ferreira Kumi',
        portrait: '😼',
        x: 920,
        y: 1570,
        pitch: 1.2,
        initialText: 'Espadas afiadas cortam bambu, mas amuletos dobram as leis espirituais. Pressione TAB para forjar e equipar seus talismãs!',
        completedText: 'Sinta a ressonância do chakra em seu quimono... Use seus amuletos com sabedoria.'
      },
      {
        id: 'explorer_ren',
        name: 'Explorador Ren',
        portrait: '😾',
        x: 2380,
        y: 1980,
        pitch: 1.0,
        initialText: 'Pelas nove vidas! Você quebrou a parede! Tome este Amuleto do Passo Fantasma como agradecimento!',
        completedText: 'Com o Passo Fantasma, use Shift para atravessar perigos como uma sombra.'
      }
    ];

    // Paredes de Escalada
    this.wallCliffs = [
      { x: 2950, y: 200, w: 60, h: 1450, side: -1 }
    ];

    // Espíritos Luminosos (Wisps)
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

    // Corrente de Vento
    this.windChasm = { x: 2000, y: 600, w: 350, h: 1200, lift: -11.5 };

    // Santuários
    this.meditationShrines = [
      { x: 300, y: 1620, name: 'Santuário das Cerejeiras', lit: true },
      { x: 3200, y: 990, name: 'Santuário dos Espíritos', lit: true }
    ];

    // Pergaminhos
    this.scrolls = [
      { id: 1, x: 690, y: 920, collected: false, name: 'Pergaminho 1' },
      { id: 2, x: 2810, y: 380, collected: false, name: 'Pergaminho 2' },
      { id: 3, x: 2400, y: 2040, collected: false, name: 'Pergaminho 3' }
    ];

    // Efeitos
    this.particles = [];
    this.sakuraPetals = [];
    this.slashes = [];

    this.initSakura();
    this.setupControls();
  }

  resizeCanvas() {
    this.viewWidth = this.canvas.width = window.innerWidth;
    this.viewHeight = this.canvas.height = window.innerHeight;
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
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        this.tryDash();
      }
      if (e.code === 'Tab') {
        e.preventDefault();
        this.toggleAmuletsModal();
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
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    const modal = document.getElementById('pause-menu-overlay');
    if (modal) {
      if (this.isPaused) modal.classList.add('active');
      else modal.classList.remove('active');
    }
  }

  toggleAmuletsModal() {
    const modal = document.getElementById('amulets-modal');
    if (modal) {
      modal.classList.toggle('active');
      this.updateAmuletsUI();
    }
  }

  updateAmuletsUI() {
    const p = this.player;
    // Slots ativos
    const slot0 = document.getElementById('notch-0');
    const slot1 = document.getElementById('notch-1');
    const iconMap = { storm_claw: '🗡️', lotus_wings: '🌸', spirit_eye: '👁️', shadow_dash: '💨' };

    if (slot0) {
      slot0.className = `notch-slot ${p.equippedAmulets[0] ? 'equipped' : 'empty'}`;
      slot0.textContent = p.equippedAmulets[0] ? iconMap[p.equippedAmulets[0]] : '';
    }
    if (slot1) {
      slot1.className = `notch-slot ${p.equippedAmulets[1] ? 'equipped' : 'empty'}`;
      slot1.textContent = p.equippedAmulets[1] ? iconMap[p.equippedAmulets[1]] : '';
    }

    document.querySelectorAll('.amulet-item').forEach(item => {
      const id = item.dataset.amulet;
      const isEquipped = p.equippedAmulets.includes(id);
      const isUnlocked = p.unlockedAmulets.includes(id);

      item.classList.toggle('equipped', isEquipped);
      const btn = item.querySelector('.btn-amulet-toggle');
      if (btn) {
        btn.disabled = !isUnlocked;
        btn.textContent = isEquipped ? 'Desequipar' : (isUnlocked ? 'Equipar' : 'Bloqueado');
        btn.classList.toggle('active', isEquipped);
      }
    });
  }

  toggleAmulet(amuletId) {
    const p = this.player;
    if (!p.unlockedAmulets.includes(amuletId)) return;

    if (p.equippedAmulets.includes(amuletId)) {
      p.equippedAmulets = p.equippedAmulets.filter(id => id !== amuletId);
    } else {
      if (p.equippedAmulets.length >= 2) {
        p.equippedAmulets.shift(); // Remove o mais antigo se já tiver 2
      }
      p.equippedAmulets.push(amuletId);
    }
    this.updateAmuletsUI();
    sfx.playCollect();
  }

  tryDash() {
    const p = this.player;
    if (!p.equippedAmulets.includes('shadow_dash')) return;
    if (p.dashCooldown > 0) return;

    p.isDashing = true;
    p.dashTimer = 14;
    p.dashCooldown = 40;
    p.vx = p.facing * 24.0;
    p.vy = 0;
    sfx.playDash();

    for (let i = 0; i < 12; i++) {
      this.particles.push({
        x: p.x + 35,
        y: p.y + 60,
        vx: -p.facing * (Math.random() * 4 + 2),
        vy: (Math.random() - 0.5) * 4,
        life: 18,
        maxLife: 18,
        color: '#38bdf8',
        size: 5
      });
    }
  }

  handleJumpPress() {
    const p = this.player;
    const hasLotus = p.equippedAmulets.includes('lotus_wings');
    const jumpBoost = hasLotus ? 1.08 : 1.0;

    if (p.isGrounded) {
      p.vy = p.jumpForce * jumpBoost;
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
      p.vy = p.doubleJumpForce * jumpBoost;
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

      const hasStormClaw = p.equippedAmulets.includes('storm_claw');
      const reachMultiplier = hasStormClaw ? 1.4 : 1.0;

      sfx.playSlash();

      this.slashes.push({
        x: p.x + (p.facing === 1 ? 55 : -20),
        y: p.isDownslashing ? p.y + 90 : p.y + 40,
        facing: p.facing,
        isDown: p.isDownslashing,
        reach: reachMultiplier,
        life: 14,
        maxLife: 14
      });

      // Checar acerto em Paredes Destrutíveis
      for (const wall of this.destructibleWalls) {
        if (!wall.destroyed) {
          const slashBox = {
            x: p.facing === 1 ? p.x + 30 : p.x - 60 * reachMultiplier,
            y: p.y,
            w: 80 * reachMultiplier,
            h: 120
          };
          if (slashBox.x < wall.x + wall.w && slashBox.x + slashBox.w > wall.x &&
              slashBox.y < wall.y + wall.h && slashBox.y + slashBox.h > wall.y) {
            wall.hits++;
            sfx.playBreak();
            for (let i = 0; i < 15; i++) {
              this.particles.push({
                x: wall.x + wall.w / 2,
                y: wall.y + Math.random() * wall.h,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 25,
                maxLife: 25,
                color: '#64748b',
                size: 5
              });
            }
            if (wall.hits >= wall.maxHits) {
              wall.destroyed = true;
              this.showToast('PAREDE DESTRUÍDA!');
            }
          }
        }
      }

      // Checar Pogo
      if (p.isDownslashing) {
        for (const mush of this.pogoMushrooms) {
          if (p.x + 35 >= mush.x && p.x + 35 <= mush.x + mush.w &&
              p.y + 110 >= mush.y && p.y + 110 <= mush.y + 40) {
            p.vy = mush.bounceForce;
            p.canDoubleJump = true;
            p.isGliding = false;
            sfx.playPogo();
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

    // Se já estiver conversando, fecha o diálogo
    const dialogueBox = document.getElementById('dialogue-box');
    if (dialogueBox && dialogueBox.classList.contains('active')) {
      dialogueBox.classList.remove('active');
      return;
    }

    // 1. Interagir com NPCs
    for (const npc of this.npcs) {
      if (Math.hypot(p.x - npc.x, p.y - npc.y) < 100) {
        this.openNPCDialogue(npc);
        return;
      }
    }

    // 2. Interagir com Santuários
    for (const shrine of this.meditationShrines) {
      if (Math.hypot(p.x - shrine.x, p.y - shrine.y) < 120) {
        p.health = p.maxHealth;
        p.energy = p.maxEnergy;
        this.saveProgress(shrine.name);
        sfx.playSave();
        this.updateHollowKnightHUD();
        break;
      }
    }

    // 3. Interagir com Portão Rúnico
    const gate = this.keystoneGate;
    if (!gate.isOpen && Math.hypot(p.x - gate.x, p.y - (gate.y + 80)) < 120) {
      if (p.keystonesCollected >= gate.required) {
        gate.isOpen = true;
        sfx.playBreak();
        this.showToast('PORTÃO RÚNICO ABERTO!');
      } else {
        this.showToast(`REQUER ${gate.required} CHAVES (VOCÊ TEM ${p.keystonesCollected})`);
      }
    }
  }

  openNPCDialogue(npc) {
    const p = this.player;
    sfx.playVoiceChatter(npc.pitch);

    const isCompleted = p.questsCompleted.includes(npc.id);
    let text = isCompleted ? npc.completedText : npc.initialText;

    // Lógica especial de quests
    if (npc.id === 'elder_jin' && !isCompleted && p.keystonesCollected >= 2) {
      p.questsCompleted.push(npc.id);
      p.maxHealth = 120; // +1 Máscara de vida permanente!
      p.health = p.maxHealth;
      text = npc.completedText;
      this.updateHollowKnightHUD();
      sfx.playSave();
    } else if (npc.id === 'explorer_ren' && !isCompleted) {
      p.questsCompleted.push(npc.id);
      if (!p.unlockedAmulets.includes('shadow_dash')) {
        p.unlockedAmulets.push('shadow_dash');
      }
    } else if (npc.id === 'blacksmith_kumi') {
      this.toggleAmuletsModal();
    }

    const box = document.getElementById('dialogue-box');
    const speaker = document.getElementById('dialogue-speaker');
    const content = document.getElementById('dialogue-content');
    const portrait = document.getElementById('dialogue-portrait');

    if (box && speaker && content) {
      speaker.textContent = npc.name;
      content.textContent = text;
      if (portrait) portrait.textContent = npc.portrait;
      box.classList.add('active');
    }
  }

  saveProgress(checkpointName) {
    this.player.checkpointName = checkpointName;
    saveManager.saveGame(this.player, checkpointName);
    this.showToast('JOGO SALVO');
  }

  loadProgress(saveData) {
    if (!saveData) return;
    this.player.x = saveData.x;
    this.player.y = saveData.y;
    this.player.health = saveData.health || 100;
    this.player.maxHealth = saveData.maxHealth || 100;
    this.player.energy = saveData.energy || 100;
    this.player.scrollsCollected = saveData.scrolls || [];
    this.player.keystonesCollected = saveData.keystones || 0;
    this.player.equippedAmulets = saveData.equippedAmulets || ['storm_claw'];
    this.player.unlockedAmulets = saveData.unlockedAmulets || ['storm_claw', 'lotus_wings', 'spirit_eye'];
    this.player.questsCompleted = saveData.questsCompleted || [];
    this.player.checkpointName = saveData.checkpoint || 'Vila dos Samurais';

    this.scrolls.forEach(sc => {
      sc.collected = this.player.scrollsCollected.includes(sc.id);
    });

    this.updateHollowKnightHUD();
    this.showToast('CARREGADO');
    sfx.playSave();
  }

  showToast(msg) {
    const toast = document.getElementById('save-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2000);
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

  updateHollowKnightHUD() {
    const p = this.player;
    const maskCount = Math.floor(p.maxHealth / 20); // 5 ou 6 máscaras
    const currentMasks = Math.ceil((p.health / p.maxHealth) * maskCount);
    const container = document.getElementById('masks-container');
    if (container) {
      container.innerHTML = '';
      for (let i = 0; i < maskCount; i++) {
        const mask = document.createElement('div');
        mask.className = `mask-unit ${i < currentMasks ? 'full' : 'empty'}`;
        container.appendChild(mask);
      }
    }

    const liquid = document.getElementById('soul-liquid');
    if (liquid) liquid.style.height = `${(p.energy / p.maxEnergy) * 100}%`;

    const countEl = document.getElementById('hk-scroll-count');
    if (countEl) countEl.textContent = p.scrollsCollected.length;

    const keyEl = document.getElementById('hk-keystone-count');
    if (keyEl) keyEl.textContent = `🔑 ${p.keystonesCollected}/2`;
  }

  update() {
    if (this.isPaused) return;

    const p = this.player;
    const left = this.keys['KeyA'] || this.keys['ArrowLeft'];
    const right = this.keys['KeyD'] || this.keys['ArrowRight'];
    const isSprint = this.keys['ShiftLeft'] || this.keys['ShiftRight'];

    if (p.dashCooldown > 0) p.dashCooldown--;
    if (p.isDashing) {
      p.dashTimer--;
      if (p.dashTimer <= 0) p.isDashing = false;
    }

    // Setor para Trilha Sonora Adaptativa
    sfx.currentSector = p.y > 1750 ? 'cave' : 'village';

    // Atração Magnética de Almas (Amuleto Olho dos Ancestrais)
    const hasSpiritEye = p.equippedAmulets.includes('spirit_eye');
    if (hasSpiritEye) {
      for (const sc of this.scrolls) {
        if (!sc.collected && Math.hypot(p.x + 35 - sc.x, p.y + 55 - sc.y) < 220) {
          sc.x += (p.x + 35 - sc.x) * 0.08;
          sc.y += (p.y + 55 - sc.y) * 0.08;
        }
      }
    }

    // Plataformas Efêmeras de Lótus
    for (const lotus of this.lotusPlatforms) {
      if (lotus.fading) {
        lotus.timer++;
        if (lotus.timer > 90) { // 1.5s
          lotus.active = false;
          lotus.fading = false;
          lotus.respawnTimer = 180; // 3s
        }
      } else if (!lotus.active) {
        lotus.respawnTimer--;
        if (lotus.respawnTimer <= 0) {
          lotus.active = true;
          lotus.timer = 0;
        }
      }
    }

    // Corrente de Vento
    const wind = this.windChasm;
    const inWind = p.x >= wind.x && p.x <= wind.x + wind.w && p.y >= wind.y && p.y <= wind.y + wind.h;
    if (inWind) {
      if (p.isGliding || !p.isGrounded) {
        p.vy = Math.max(p.vy - 1.2, wind.lift);
      }
    }

    // Movimentação
    if (!p.isDashing) {
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

      // Gravidade & Planador
      const hasLotus = p.equippedAmulets.includes('lotus_wings');
      const glideFall = hasLotus ? 0.08 : p.glideGravity;

      if (p.isGliding && p.vy > 0) {
        p.vy = Math.min(p.vy + glideFall, hasLotus ? 1.4 : 2.5);
      } else if (!p.isWallSliding) {
        p.vy += p.gravity;
        if (p.vy > 18) p.vy = 18;
      }

      p.x += p.vx;
      p.y += p.vy;
    } else {
      p.x += p.vx;
    }

    p.x = Math.max(20, Math.min(this.worldWidth - 90, p.x));
    p.y = Math.max(50, Math.min(this.worldHeight - 130, p.y));

    // Colisão com Plataformas
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

    // Colisão com Plataformas de Lótus
    for (const lotus of this.lotusPlatforms) {
      if (lotus.active && footX >= lotus.x && footX <= lotus.x + lotus.w) {
        if (p.vy >= 0 && footY >= lotus.y && footY - p.vy <= lotus.y + 20) {
          p.y = lotus.y - 110;
          p.vy = 0;
          p.isGrounded = true;
          p.canDoubleJump = true;
          p.isGliding = false;
          lotus.fading = true;
          break;
        }
      }
    }

    // Colisão com Portão Rúnico (bloqueio horizontal)
    const gate = this.keystoneGate;
    if (!gate.isOpen && p.x + 70 >= gate.x && p.x <= gate.x + gate.w && p.y + 110 >= gate.y && p.y <= gate.y + gate.h) {
      p.x = gate.x - 70;
      p.vx = 0;
    }

    // Colisão com Paredes Destrutíveis
    for (const wall of this.destructibleWalls) {
      if (!wall.destroyed && p.x + 70 >= wall.x && p.x <= wall.x + wall.w && p.y + 110 >= wall.y && p.y <= wall.y + wall.h) {
        p.x = wall.x - 70;
        p.vx = 0;
      }
    }

    // Coleta de Chaves de Espírito
    for (const key of this.keystones) {
      if (!key.collected && Math.hypot(p.x + 35 - key.x, p.y + 55 - key.y) < 55) {
        key.collected = true;
        p.keystonesCollected++;
        sfx.playCollect();
        this.showToast(`CHAVE DE ESPÍRITO ENCONTRADA (${p.keystonesCollected}/2)`);
        this.updateHollowKnightHUD();
      }
    }

    // Coleta de Pergaminhos
    for (const sc of this.scrolls) {
      if (!sc.collected && Math.hypot(p.x + 35 - sc.x, p.y + 55 - sc.y) < 55) {
        sc.collected = true;
        p.scrollsCollected.push(sc.id);
        sfx.playCollect();
        this.updateHollowKnightHUD();
      }
    }

    // Prompt de Interação Próxima
    let nearTarget = false;
    const promptEl = document.getElementById('interact-prompt');
    const promptText = document.getElementById('interact-text');

    for (const npc of this.npcs) {
      if (Math.hypot(p.x - npc.x, p.y - npc.y) < 100) {
        nearTarget = true;
        if (promptText) promptText.textContent = `Conversar com ${npc.name.split(' ')[0]}`;
        break;
      }
    }
    if (!nearTarget) {
      for (const shrine of this.meditationShrines) {
        if (Math.hypot(p.x - shrine.x, p.y - shrine.y) < 120) {
          nearTarget = true;
          if (promptText) promptText.textContent = 'Meditar & Salvar';
          break;
        }
      }
    }
    if (promptEl) promptEl.classList.toggle('show', nearTarget);

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

    // 1. Portão Rúnico (se fechado)
    const gate = this.keystoneGate;
    if (!gate.isOpen) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(gate.x, gate.y, gate.w, gate.h);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.strokeRect(gate.x, gate.y, gate.w, gate.h);
      // Runas brilhantes
      ctx.fillStyle = '#38bdf8';
      ctx.font = '16px serif';
      ctx.fillText('⛩️', gate.x + 8, gate.y + 50);
      ctx.fillText('🔒', gate.x + 8, gate.y + 100);
    }

    // 2. Paredes Destrutíveis
    for (const wall of this.destructibleWalls) {
      if (!wall.destroyed) {
        ctx.fillStyle = '#334155';
        ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.strokeRect(wall.x, wall.y, wall.w, wall.h);
        // Rachaduras
        ctx.strokeStyle = '#0f172a';
        ctx.beginPath();
        ctx.moveTo(wall.x + 10, wall.y + 20); ctx.lineTo(wall.x + 25, wall.y + 60); ctx.lineTo(wall.x + 8, wall.y + 120);
        ctx.stroke();
      }
    }

    // 3. Plataformas de Lótus Efêmeras
    for (const lotus of this.lotusPlatforms) {
      if (lotus.active) {
        ctx.save();
        if (lotus.fading) {
          ctx.globalAlpha = 1.0 - (lotus.timer / 90.0) * 0.7;
          ctx.translate((Math.random() - 0.5) * 3, 0); // Tremor
        }
        ctx.fillStyle = '#14b8a6';
        ctx.beginPath();
        ctx.ellipse(lotus.x + lotus.w / 2, lotus.y + 10, lotus.w / 2, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#5eead4';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }
    }

    // 4. Chaves de Espírito (Keystones)
    for (const key of this.keystones) {
      if (!key.collected) {
        const hoverY = key.y + Math.sin(Date.now() * 0.006) * 5;
        ctx.fillStyle = '#fbbf24';
        ctx.font = '22px sans-serif';
        ctx.fillText('🔑', key.x - 11, hoverY + 8);
      }
    }

    // 5. NPCs no Mundo
    for (const npc of this.npcs) {
      ctx.save();
      ctx.translate(npc.x, npc.y + 30);
      // Sombra
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.beginPath(); ctx.ellipse(0, 0, 20, 6, 0, 0, Math.PI * 2); ctx.fill();
      // Ícone / Retrato estilizado
      ctx.font = '32px sans-serif';
      ctx.fillText(npc.portrait, -16, -10);
      ctx.restore();
    }

    // 6. Espíritos Luminosos (Wisps)
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

    // 7. Cogumelos Bioluminescentes (Pogo)
    for (const mush of this.pogoMushrooms) {
      ctx.fillStyle = mush.color;
      ctx.beginPath();
      ctx.ellipse(mush.x + mush.w / 2, mush.y + 10, mush.w / 2, mush.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 8. Pergaminhos
    for (const sc of this.scrolls) {
      if (!sc.collected) {
        const hoverY = sc.y + Math.sin(Date.now() * 0.005) * 6;
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath(); ctx.arc(sc.x, hoverY, 14, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#b45309';
        ctx.fillRect(sc.x - 8, hoverY - 6, 16, 12);
      }
    }

    // 9. Pétalas
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

    // 10. Partículas
    for (const pt of this.particles) {
      ctx.fillStyle = pt.color;
      ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2); ctx.fill();
    }

    // 11. Desenhar Personagem
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

    // 12. Rastro de Corte da Katana
    for (const sl of this.slashes) {
      ctx.save();
      ctx.translate(sl.x, sl.y);
      ctx.scale(sl.facing, 1);
      const reach = sl.reach || 1.0;
      ctx.strokeStyle = `rgba(239, 68, 68, ${sl.life / sl.maxLife})`;
      ctx.lineWidth = 7 * reach;
      ctx.beginPath();
      if (sl.isDown) {
        ctx.arc(0, 0, 45 * reach, 0.2 * Math.PI, 0.8 * Math.PI);
      } else {
        ctx.arc(0, 0, 45 * reach, -0.6 * Math.PI, 0.4 * Math.PI);
      }
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }
}

// --- 6. CONTROLE DO MENU PRINCIPAL & INICIALIZAÇÃO ---
function setupMainMenu(game) {
  const menuOverlay = document.getElementById('main-menu-overlay');
  const optionsModal = document.getElementById('options-modal');
  const pauseModal = document.getElementById('pause-menu-overlay');
  const amuletsModal = document.getElementById('amulets-modal');

  saveManager.updateMenuTag();

  const newGameBtn = document.getElementById('menu-btn-new-game');
  if (newGameBtn) {
    newGameBtn.addEventListener('click', () => {
      menuOverlay.classList.add('hidden');
      game.player.x = 350;
      game.player.y = 1580;
      game.player.health = 100;
      game.updateHollowKnightHUD();
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
        alert('Nenhum jogo salvo encontrado.');
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
      document.getElementById('tab-game').classList.remove('active');
      document.getElementById('tab-studio').classList.add('active');
    });
  }

  const switchStudioBtn = document.getElementById('btn-switch-studio');
  if (switchStudioBtn) {
    switchStudioBtn.addEventListener('click', () => {
      document.getElementById('tab-game').classList.remove('active');
      document.getElementById('tab-studio').classList.add('active');
    });
  }

  const backToGameBtn = document.getElementById('btn-back-to-game');
  if (backToGameBtn) {
    backToGameBtn.addEventListener('click', () => {
      document.getElementById('tab-studio').classList.remove('active');
      document.getElementById('tab-game').classList.add('active');
    });
  }

  const openAmuletsBtn = document.getElementById('btn-open-amulets');
  if (openAmuletsBtn) {
    openAmuletsBtn.addEventListener('click', () => {
      game.toggleAmuletsModal();
    });
  }

  const closeAmuletsBtn = document.getElementById('btn-close-amulets');
  if (closeAmuletsBtn) {
    closeAmuletsBtn.addEventListener('click', () => {
      if (amuletsModal) amuletsModal.classList.remove('active');
    });
  }

  // Botoes de Equipar Amuletos
  document.querySelectorAll('.btn-amulet-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.amulet;
      game.toggleAmulet(id);
    });
  });

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

  const bgmSlider = document.getElementById('opt-bgm-vol');
  if (bgmSlider) {
    bgmSlider.addEventListener('input', (e) => {
      sfx.bgmVolume = e.target.value / 100.0;
      document.getElementById('bgm-vol-val').textContent = `${e.target.value}%`;
    });
  }

  const modalSaveBtn = document.getElementById('btn-modal-save-now');
  if (modalSaveBtn) {
    modalSaveBtn.addEventListener('click', () => {
      game.saveProgress('Menu de Opções');
      document.getElementById('save-info-msg').textContent = 'Salvo.';
    });
  }

  const clearSaveBtn = document.getElementById('btn-modal-clear-save');
  if (clearSaveBtn) {
    clearSaveBtn.addEventListener('click', () => {
      if (confirm('Apagar dados salvos?')) {
        saveManager.clearSave();
        document.getElementById('save-info-msg').textContent = 'Apagado.';
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
    game.updateHollowKnightHUD();

    function mainLoop(timestamp) {
      studio.render(timestamp);
      game.update();
      game.render();
      requestAnimationFrame(mainLoop);
    }
    requestAnimationFrame(mainLoop);
  });
});
