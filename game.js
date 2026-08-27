// ==============================================================================
// GATINHO SAMURAI: ECOS MÍSTICOS - MOTOR METROIDVANIA EXPANDIDO V4
// Física Fluida estilo Ori, Gancho Auto-Targeting, Colisão e Game Feel Avançado
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

  playGrapple() {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(980, now + 0.16);
    gain.gain.setValueAtTime(0.28 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.19);
  }

  playGrappleLaunch() {
    if (!this.enabled || this.sfxVolume <= 0) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(1420, now + 0.24);
    gain.gain.setValueAtTime(0.38 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
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
const npcImages = {};
const enemyImages = {};
let assetsReady = false;

function initAssets(callback) {
  try {
    if (typeof ASSETS_BUNDLE !== 'undefined') {
      Object.keys(ASSETS_BUNDLE).forEach(key => {
        const item = ASSETS_BUNDLE[key];
        if (Array.isArray(item)) {
          frameImages[key] = [];
          item.forEach(src => {
            const img = new Image();
            img.src = src;
            frameImages[key].push(img);
          });
        } else if (typeof item === 'object' && item !== null) {
          if (key === 'environment') {
            Object.keys(item).forEach(k => {
              const img = new Image();
              img.src = item[k];
              envImages[k] = img;
            });
          } else if (key === 'npcs') {
            Object.keys(item).forEach(k => {
              const img = new Image();
              img.src = item[k];
              npcImages[k] = img;
            });
          } else if (key === 'iguana' || key === 'enemies') {
            enemyImages[key] = enemyImages[key] || {};
            Object.keys(item).forEach(anim => {
              if (Array.isArray(item[anim])) {
                enemyImages[key][anim] = [];
                item[anim].forEach(src => {
                  const img = new Image();
                  img.src = src;
                  enemyImages[key][anim].push(img);
                });
              }
            });
          }
        }
      });
      assetsReady = true;
    }
  } catch (err) {
    console.error("Aviso ao carregar ASSETS_BUNDLE:", err);
  } finally {
    if (typeof callback === 'function') {
      callback();
    }
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
    const fpsMap = {
      idle: 5,
      walk: 8,
      run: 11,
      jump: 8,
      glide: 6,
      attack: 14,
      attack_combo: 14,
      attack_spin: 14,
      attack_downslash: 16,
      skid: 10,
      slide: 10,
      turn: 10
    };
    this.fps = fpsMap[animKey] || 10;

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

    // Dimensões do Cenário de Teste
    this.worldWidth = 3640;
    this.worldHeight = 720;

    // Jogador Recalibrado para Física Fluida Estilo Ori
    this.player = {
      x: 400,
      y: 520,
      vx: 0,
      vy: 0,
      speed: 5.5,             // Velocidade base de caminhada
      sprintSpeed: 8.5,       // Velocidade de corrida suave
      accel: 0.65,            // Aceleração no chão
      friction: 0.55,         // Atrito/desaceleração no chão
      airAccel: 0.42,         // Controle aéreo suave
      airDrag: 0.95,          // Arrasto no ar
      jumpForce: -14.0,       // Impulso do pulo base
      doubleJumpForce: -13.5, // Pulo duplo
      gravity: 0.65,          // Gravidade estável
      maxFallSpeed: 14.0,     // Velocidade terminal de queda
      glideGravity: 0.09,     // Gravidade ultra-suave com planador
      maxGlideFallSpeed: 2.0, // Queda suave no planador
      glideSteerSpeed: 6.5,   // Deslocamento horizontal do planador
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
      // Squash and stretch
      scaleX: 1.0,
      scaleY: 1.0,
      // Coyote time e Jump buffer
      coyoteTimer: 0,         // 0.12s coyote time
      jumpBufferTimer: 0,     // 0.10s jump buffer
      dropThroughTimer: 0,    // Drop through one-way platforms (S + Space)
      // Gancho de Escalada (Grappling Hook)
      isGrappling: false,
      grappleTarget: null,
      grappleTargetPos: { x: 0, y: 0 },
      grapplePullSpeed: 18.5,
      grappleCooldown: 0,     // 0.5s cooldown para evitar spam
      // Vida & Energia (Hollow Knight Masks)
      health: 100,
      maxHealth: 100,
      energy: 100,
      maxEnergy: 100,
      scrollsCollected: [],
      keystonesCollected: 0,
      equippedAmulets: ['storm_claw'],
      unlockedAmulets: ['storm_claw', 'lotus_wings', 'spirit_eye'],
      questsCompleted: [],
      checkpointName: 'Cenário de Teste',
      dashCooldown: 0,
      isDashing: false,
      dashTimer: 0
    };

    this.cameraX = 0;
    this.cameraY = 0;
    this.screenShake = 0;
    this.screenShakeTimer = 0;
    this.keys = {};
    this.isPaused = false;
    this.activeGrappleTarget = null;

    // Inicialização da Plataforma e Âncoras
    this.updateGroundLayout();

    // 🪷 Plataformas Efêmeras de Lótus (Ori Style)
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
      { id: 1, x: 670, y: 880, collected: false },
      { id: 2, x: 2100, y: 1720, collected: false }
    ];

    // 🐱 NPCs com Sprites, Respiração Ociosa e Missões
    this.npcs = [
      {
        id: 'elder_jin',
        name: 'Mestre Ancião Jin',
        portrait: '🐱',
        x: 420,
        y: 1570,
        pitch: 0.85,
        theme: '#fbbf24',
        initialText: 'Os espíritos do vale estão inquietos. Traga-me as 2 Chaves de Espírito escondidas nos telhados e no rio para abrir o grande portão.',
        completedText: 'Você provou sua disciplina! Tome este Fragmento de Máscara Sagrada. Sua vida máxima foi expandida!'
      },
      {
        id: 'blacksmith_kumi',
        name: 'Ferreira Kumi',
        portrait: '😼',
        x: 920,
        y: 1570,
        pitch: 1.25,
        theme: '#f97316',
        initialText: 'Espadas afiadas cortam bambu, mas amuletos dobram as leis espirituais. Pressione TAB para forjar e equipar seus talismãs!',
        completedText: 'Sinta a ressonância do chakra em seu quimono... Use seus amuletos com sabedoria.'
      },
      {
        id: 'explorer_ren',
        name: 'Explorador Ren',
        portrait: '😾',
        x: 2380,
        y: 1980,
        pitch: 1.05,
        theme: '#38bdf8',
        initialText: 'Pelas nove vidas! Você quebrou a parede! Tome este Amuleto do Passo Fantasma como agradecimento!',
        completedText: 'Com o Passo Fantasma, use Shift para atravessar perigos como uma sombra.'
      }
    ];

    // Paredes de Escalada (Wall Cling)
    this.wallCliffs = [
      { x: 2950, y: 200, w: 60, h: 1450, side: -1 }
    ];

    // Espíritos Luminosos (Wisps - Bash / Grapple Targets)
    this.spiritWisps = [
      { id: 'wisp_1', x: 2540, y: 780, color: '#fbbf24', auraRadius: 28, type: 'gold' },
      { id: 'wisp_2', x: 2710, y: 560, color: '#38bdf8', auraRadius: 28, type: 'blue' },
      { id: 'wisp_3', x: 2820, y: 340, color: '#fbbf24', auraRadius: 28, type: 'gold' }
    ];

    // Cogumelos Bioluminescentes (Pogo)
    this.pogoMushrooms = [
      { x: 2880, y: 1655, w: 60, h: 30, color: '#22c55e', bounceForce: -18.0 },
      { x: 3380, y: 1655, w: 60, h: 30, color: '#06b6d4', bounceForce: -19.0 },
      { x: 2200, y: 1830, w: 55, h: 25, color: '#a855f7', bounceForce: -17.5 }
    ];

    // Corrente de Vento Ascendente
    this.windChasm = { x: 2000, y: 600, w: 350, h: 1200, lift: -9.5 };

    // Santuários
    this.meditationShrines = [
      { x: 300, y: 1620, name: 'Santuário das Cerejeiras', lit: true },
      { x: 3200, y: 990, name: 'Santuário dos Espíritos', lit: true }
    ];

    // Pergaminhos
    this.scrolls = [
      { id: 1, x: 690, y: 860, collected: false, name: 'Pergaminho 1' },
      { id: 2, x: 2810, y: 380, collected: false, name: 'Pergaminho 2' },
      { id: 3, x: 2400, y: 2040, collected: false, name: 'Pergaminho 3' }
    ];

    // Efeitos e Partículas
    this.particles = [];
    this.sakuraPetals = [];
    this.slashes = [];

    this.initSakura();
    this.setupControls();
  }

  resizeCanvas() {
    this.viewWidth = this.canvas.width = window.innerWidth;
    this.viewHeight = this.canvas.height = window.innerHeight;
    this.worldWidth = 3640;
    this.worldHeight = this.viewHeight;
    this.updateGroundLayout();
  }

  updateGroundLayout() {
    const bleedY = 18; // 18px de bleed/overscan abaixo da tela para cobrir 100% sem margem
    const groundBottom = this.viewHeight + bleedY;
    const groundSurface = groundBottom - 90;

    this.platforms = [
      { x: 0, y: groundSurface, w: this.worldWidth, h: 90 + bleedY + 40, type: 'straight_ground', solid: true }
    ];

    this.grappleAnchors = [
      { id: 'g_lantern_1', x: 300,  y: groundSurface, type: 'lantern', name: 'Lanterna de Pedra 1' },
      { id: 'g_lantern_2', x: 1200, y: groundSurface, type: 'lantern', name: 'Lanterna de Pedra 2' },
      { id: 'g_lantern_3', x: 2100, y: groundSurface, type: 'lantern', name: 'Lanterna de Pedra 3' },
      { id: 'g_lantern_4', x: 3000, y: groundSurface, type: 'lantern', name: 'Lanterna de Pedra 4' }
    ];

    if (this.player && this.player.isGrounded) {
      this.player.y = groundSurface - 110;
    }
  }

  addScreenShake(intensity = 6.0, durationSec = 0.15) {
    this.screenShake = Math.max(this.screenShake, intensity);
    this.screenShakeTimer = Math.max(this.screenShakeTimer, durationSec);
  }

  initSakura() {
    this.sakuraPetals = [];
    for (let i = 0; i < 75; i++) {
      this.sakuraPetals.push(this.createSakuraPetal(true));
    }
  }

  createSakuraPetal(randomY = false) {
    const isRare = Math.random() < 0.12; // 12% são pétalas espirituais raras douradas
    const baseOpacity = isRare ? 0.75 + Math.random() * 0.25 : 0.35 + Math.random() * 0.55;
    const bleedY = 18;
    const groundSurface = (this.viewHeight || 720) + bleedY - 90;
    return {
      x: Math.random() * this.worldWidth,
      y: randomY ? Math.random() * (groundSurface - 20) : -15 - Math.random() * 60,
      size: isRare ? 5 + Math.random() * 3.5 : 3 + Math.random() * 4.5,
      speedX: 0.35 + Math.random() * 1.25,
      speedY: 0.45 + Math.random() * 1.15,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 0.02 + Math.random() * 0.03,
      swayAmp: 0.5 + Math.random() * 1.1,
      angle: Math.random() * Math.PI * 2,
      rotSpeed: 0.015 + Math.random() * 0.025,
      baseOpacity: baseOpacity,
      opacity: baseOpacity,
      isRare: isRare,
      grounded: false,
      fadeTimer: 3.0,
      groundY: groundSurface - 2 + (Math.random() - 0.5) * 6
    };
  }

  setupControls() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;

      // Pulo e Descida de Telhado (S + Espaço)
      if (['Space', 'KeyW', 'ArrowUp'].includes(e.code)) {
        const isDown = this.keys['KeyS'] || this.keys['ArrowDown'];
        if (isDown && this.player.isGrounded) {
          this.tryDropThroughPlatform();
        } else {
          this.player.jumpBufferTimer = 0.10; // Jump buffer
          this.handleJumpPress();
        }
      }

      // Gancho de Escalada / Bash: K, F, Q
      if (['KeyK', 'KeyF', 'KeyQ'].includes(e.code)) {
        this.tryGrapplingHook();
      }

      // Ataque: J, Z, X
      if (['KeyJ', 'KeyZ', 'KeyX'].includes(e.code)) {
        this.triggerAttack();
      }

      // Interação: E
      if (e.code === 'KeyE') {
        this.tryInteract();
      }

      // Esquiva / Dash: Shift
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        this.tryDash();
      }

      // Menu de Amuletos: Tab
      if (e.code === 'Tab') {
        e.preventDefault();
        this.toggleAmuletsModal();
      }

      // Pausa: Escape
      if (e.code === 'Escape') {
        this.togglePause();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;

      // Variable Jump Height: Corta a altura do pulo ao soltar a tecla
      if (['Space', 'KeyW', 'ArrowUp'].includes(e.code)) {
        if (this.player.vy < -3.0) {
          this.player.vy = Math.max(this.player.vy * 0.52, -3.0);
        }
        if (this.player.isGliding) this.player.isGliding = false;
      }
    });

    // Controles de Mouse
    this.canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.triggerAttack();
      } else if (e.button === 2) {
        e.preventDefault();
        this.tryGrapplingHook();
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
        p.equippedAmulets.shift();
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
    p.dashCooldown = 36;
    p.vx = p.facing * 18.0;
    p.vy = 0;
    p.scaleX = 1.35;
    p.scaleY = 0.75;
    this.addScreenShake(3.5, 0.1);
    sfx.playDash();

    for (let i = 0; i < 14; i++) {
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

  tryDropThroughPlatform() {
    const p = this.player;
    p.dropThroughTimer = 0.22;
    p.isGrounded = false;
    p.y += 4;
    p.vy = 3.5;
    this.spawnDust(p.x + 35, p.y + 80, 5, 'rgba(148, 163, 184, 0.6)');
  }

  handleJumpPress() {
    const p = this.player;
    const hasLotus = p.equippedAmulets.includes('lotus_wings');
    const jumpBoost = hasLotus ? 1.08 : 1.0;

    // Se estiver em estado de Grapple, solta com impulso vertical
    if (p.isGrappling) {
      this.releaseGrappleLaunch();
      return;
    }

    // Pulo no chão ou Coyote Time
    if (p.isGrounded || p.coyoteTimer > 0) {
      p.vy = p.jumpForce * jumpBoost;
      p.isGrounded = false;
      p.coyoteTimer = 0;
      p.canDoubleJump = true;
      p.jumpBufferTimer = 0;
      p.scaleX = 0.80;
      p.scaleY = 1.28;
      this.spawnDust(p.x + 35, p.y + 110, 8);
      sfx.playJump(false);
    } else if (p.isWallSliding) {
      p.vy = p.jumpForce * 0.95;
      p.vx = -p.wallDir * (p.sprintSpeed * 1.15);
      p.facing = -p.wallDir;
      p.isWallSliding = false;
      p.canDoubleJump = true;
      p.scaleX = 0.85;
      p.scaleY = 1.25;
      this.spawnDust(p.x + 35, p.y + 70, 10, '#38bdf8');
      sfx.playJump(true);
    } else if (p.canDoubleJump) {
      p.vy = p.doubleJumpForce * jumpBoost;
      p.canDoubleJump = false;
      p.scaleX = 0.80;
      p.scaleY = 1.30;
      this.spawnDust(p.x + 35, p.y + 80, 12, '#fbbf24');
      sfx.playJump(true);
    }
  }

  // Auto-targeting: Procura o melhor ponto de ancoragem para o Gancho
  findBestGrappleTarget() {
    const p = this.player;
    const px = p.x + 35;
    const py = p.y + 50;
    const maxRange = 440;

    let bestTarget = null;
    let minScore = Infinity;

    // 1. Procurar nas âncoras dedicadas do cenário
    const time = Date.now() * 0.002;
    for (const anchor of this.grappleAnchors) {
      let ax = anchor.x;
      let ay = anchor.y;
      if (anchor.type === 'floating_stone') {
        ay = anchor.baseY + Math.sin(time + anchor.phase) * 16;
      }

      const dx = ax - px;
      const dy = ay - py;
      const dist = Math.hypot(dx, dy);

      if (dist <= maxRange) {
        // Priorizar pontos à frente e acima do personagem
        const dirX = dx / dist;
        const dirY = dy / dist;
        const forwardScore = dirX * p.facing;
        const upwardScore = -dirY;

        if (forwardScore > -0.35 && upwardScore > -0.45) {
          const score = dist - forwardScore * 85 - upwardScore * 65;
          if (score < minScore) {
            minScore = score;
            bestTarget = { ...anchor, currentX: ax, currentY: ay };
          }
        }
      }
    }

    // 2. Wisps também servem de âncoras/Bash
    const wispTime = Date.now() * 0.003;
    for (const wisp of this.spiritWisps) {
      const curX = wisp.x + Math.sin(wispTime) * 12;
      const curY = wisp.y + Math.sin(wispTime * 2) * 8;
      const dx = curX - px;
      const dy = curY - py;
      const dist = Math.hypot(dx, dy);

      if (dist <= maxRange) {
        const dirX = dx / dist;
        const forwardScore = dirX * p.facing;
        const score = dist - forwardScore * 75;
        if (score < minScore) {
          minScore = score;
          bestTarget = { id: wisp.id, type: 'wisp', color: wisp.color, currentX: curX, currentY: curY };
        }
      }
    }

    return bestTarget;
  }

  tryGrapplingHook() {
    const p = this.player;
    if (p.grappleCooldown > 0) return; // Cooldown ativo de 0.5s

    const target = this.findBestGrappleTarget();
    if (target) {
      p.isGrappling = true;
      p.grappleTarget = target;
      p.grappleTargetPos = { x: target.currentX, y: target.currentY };
      p.grappleCooldown = 0.5; // Inicia cooldown de 0.5s
      p.canDoubleJump = true;
      p.isGliding = false;
      p.scaleX = 0.85;
      p.scaleY = 1.25;

      this.addScreenShake(3.0, 0.08);
      sfx.playGrapple();

      // Partículas no ponto de conexão
      for (let i = 0; i < 12; i++) {
        this.particles.push({
          x: target.currentX,
          y: target.currentY,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 18,
          maxLife: 18,
          color: target.color || '#38bdf8',
          size: 4
        });
      }
    }
  }

  releaseGrappleLaunch() {
    const p = this.player;
    p.isGrappling = false;
    p.grappleCooldown = 0.5; // Garante cooldown ao desengatar

    // Lançamento com impulso para cima e na direção
    p.vy = -14.8;
    p.vx = p.facing * (p.sprintSpeed * 1.25);
    p.canDoubleJump = true;
    p.scaleX = 0.78;
    p.scaleY = 1.32;

    this.addScreenShake(4.5, 0.12);
    sfx.playGrappleLaunch();

    for (let i = 0; i < 16; i++) {
      this.particles.push({
        x: p.x + 35,
        y: p.y + 60,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8 - 3,
        life: 20,
        maxLife: 20,
        color: '#38bdf8',
        size: 5
      });
    }
  }

  triggerAttack() {
    const p = this.player;
    if (!p.isAttacking) {
      p.isAttacking = true;
      p.attackTimer = 0;
      p.comboCount = (p.comboCount || 0) + 1;

      const isDown = this.keys['KeyS'] || this.keys['ArrowDown'];
      if (!p.isGrounded && isDown) {
        p.isDownslashing = true;
        p.attackType = 'attack_downslash';
        p.vy = Math.max(p.vy, 16.0); // Mergulho vertical acelerado
        this.addScreenShake(6.0, 0.15);
      } else if (!p.isGrounded) {
        p.isDownslashing = false;
        p.attackType = 'attack_combo';
        p.vy *= 0.40; // Micro-Stall Aéreo (Air Hang)
        this.addScreenShake(4.5, 0.10);
      } else {
        p.isDownslashing = false;
        // Alternância de combo no chão: Corte Horizontal <-> Giro 360°
        p.attackType = (p.comboCount % 2 === 0) ? 'attack_spin' : 'attack_combo';
        this.addScreenShake(4.0, 0.09);
      }
      p.state = p.attackType;
      p.frameIndex = 0;

      const hasStormClaw = p.equippedAmulets.includes('storm_claw');
      const reachMultiplier = hasStormClaw ? 1.45 : 1.0;

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
            w: 85 * reachMultiplier,
            h: 120
          };
          if (slashBox.x < wall.x + wall.w && slashBox.x + slashBox.w > wall.x &&
              slashBox.y < wall.y + wall.h && slashBox.y + slashBox.h > wall.y) {
            wall.hits++;
            this.addScreenShake(6.0, 0.15);
            sfx.playBreak();
            for (let i = 0; i < 18; i++) {
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
              this.addScreenShake(12.0, 0.28);
              this.showToast('PAREDE DESTRUÍDA!');
            }
          }
        }
      }

      // Checar Pogo em Cogumelos
      if (p.isDownslashing) {
        for (const mush of this.pogoMushrooms) {
          if (p.x + 35 >= mush.x && p.x + 35 <= mush.x + mush.w &&
              p.y + 110 >= mush.y && p.y + 110 <= mush.y + 40) {
            p.vy = mush.bounceForce;
            p.canDoubleJump = true;
            p.isGliding = false;
            p.scaleX = 0.75;
            p.scaleY = 1.35;
            this.addScreenShake(4.0, 0.10);
            sfx.playPogo();
            for (let i = 0; i < 12; i++) {
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

    const dialogueBox = document.getElementById('dialogue-box');
    if (dialogueBox && dialogueBox.classList.contains('active')) {
      dialogueBox.classList.remove('active');
      return;
    }

    // 1. Interagir com NPCs
    for (const npc of this.npcs) {
      if (Math.hypot(p.x - npc.x, p.y - npc.y) < 110) {
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
        this.addScreenShake(8.0, 0.2);
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

    if (npc.id === 'elder_jin' && !isCompleted && p.keystonesCollected >= 2) {
      p.questsCompleted.push(npc.id);
      p.maxHealth = 120; // +1 Máscara de vida (Total: 6 Máscaras)
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
    const maskCount = Math.floor(p.maxHealth / 20);
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

  // --- FÍSICA FIXED-STEP (60Hz Ticks) ---
  fixedUpdate(dt) {
    if (this.isPaused) return;

    const p = this.player;
    const left = this.keys['KeyA'] || this.keys['ArrowLeft'];
    const right = this.keys['KeyD'] || this.keys['ArrowRight'];
    const isSprint = this.keys['ShiftLeft'] || this.keys['ShiftRight'];

    // Atualização de Timers
    if (p.coyoteTimer > 0) p.coyoteTimer -= dt;
    if (p.jumpBufferTimer > 0) p.jumpBufferTimer -= dt;
    if (p.dropThroughTimer > 0) p.dropThroughTimer -= dt;
    if (p.grappleCooldown > 0) p.grappleCooldown -= dt;
    if (p.dashCooldown > 0) p.dashCooldown--;
    if (p.isDashing) {
      p.dashTimer--;
      if (p.dashTimer <= 0) p.isDashing = false;
    }
    if (this.screenShakeTimer > 0) {
      this.screenShakeTimer -= dt;
      if (this.screenShakeTimer <= 0) this.screenShake = 0;
    }

    // Squash and stretch lerp de volta ao normal
    p.scaleX += (1.0 - p.scaleX) * 0.16;
    p.scaleY += (1.0 - p.scaleY) * 0.16;

    // Planador Estável: Ativa e mantém aberto enquanto o botão de pulo estiver SEGURADO no ar caindo
    const isHoldingJump = this.keys['Space'] || this.keys['KeyW'] || this.keys['ArrowUp'];
    if (!p.isGrounded && !p.isGrappling && isHoldingJump && p.vy >= 0) {
      if (!p.isGliding) {
        p.isGliding = true;
        sfx.playGlide();
      }
    } else if (p.isGrounded || !isHoldingJump) {
      p.isGliding = false;
    }

    // Atualizar retículo de auto-targeting
    this.activeGrappleTarget = this.findBestGrappleTarget();

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
        if (lotus.timer > 90) {
          lotus.active = false;
          lotus.fading = false;
          lotus.respawnTimer = 180;
        }
      } else if (!lotus.active) {
        lotus.respawnTimer--;
        if (lotus.respawnTimer <= 0) {
          lotus.active = true;
          lotus.timer = 0;
        }
      }
    }

    // Corrente de Vento Ascendente
    const wind = this.windChasm;
    const inWind = p.x >= wind.x && p.x <= wind.x + wind.w && p.y >= wind.y && p.y <= wind.y + wind.h;
    if (inWind && (p.isGliding || !p.isGrounded)) {
      p.vy = Math.max(p.vy - 1.1, wind.lift);
    }

    // FÍSICA DE GRAPPLING HOOK (ELASTIC ROPE)
    if (p.isGrappling && p.grappleTarget) {
      const gx = p.grappleTargetPos.x;
      const gy = p.grappleTargetPos.y;
      const dx = gx - (p.x + 35);
      const dy = gy - (p.y + 50);
      const dist = Math.hypot(dx, dy);

      if (dist < 42) {
        // Chegou ao destino -> Lançamento com impulso vertical para cima
        this.releaseGrappleLaunch();
      } else {
        // Tração elástica em direção ao gancho
        const dirX = dx / dist;
        const dirY = dy / dist;
        p.vx += (dirX * p.grapplePullSpeed - p.vx) * 0.22;
        p.vy += (dirY * p.grapplePullSpeed - p.vy) * 0.22;
        p.x += p.vx;
        p.y += p.vy;
      }
    } else if (!p.isDashing) {
      // MOVIMENTAÇÃO NORMAL (ORI FLUID MOBILITY)
      const targetSpeed = isSprint ? p.sprintSpeed : p.speed;

      if (left) {
        p.facing = -1;
        if (p.isGrounded) {
          p.vx += (-targetSpeed - p.vx) * p.accel;
          if (Math.random() < 0.20) this.spawnDust(p.x + 45, p.y + 110, 1);
        } else {
          p.vx += (-targetSpeed - p.vx) * p.airAccel;
        }
      } else if (right) {
        p.facing = 1;
        if (p.isGrounded) {
          p.vx += (targetSpeed - p.vx) * p.accel;
          if (Math.random() < 0.20) this.spawnDust(p.x + 20, p.y + 110, 1);
        } else {
          p.vx += (targetSpeed - p.vx) * p.airAccel;
        }
      } else {
        if (p.isGrounded) {
          p.vx *= (1.0 - p.friction);
          if (Math.abs(p.vx) < 0.1) p.vx = 0;
        } else {
          p.vx *= p.airDrag;
        }
      }

      // Wall Cling
      p.isWallSliding = false;
      if (!p.isGrounded && p.vy > 0) {
        for (const wall of this.wallCliffs) {
          if (p.x + 70 >= wall.x && p.x <= wall.x + wall.w && p.y >= wall.y && p.y <= wall.y + wall.h) {
            if ((left && wall.side === 1) || (right && wall.side === -1)) {
              p.isWallSliding = true;
              p.wallDir = wall.side;
              p.vy = Math.min(p.vy, 2.8);
            }
          }
        }
      }

      // Gravidade & Planador Suave (Lotus Wings)
      const hasLotus = p.equippedAmulets.includes('lotus_wings');
      const glideFall = hasLotus ? 0.04 : p.glideGravity;
      const maxFall = hasLotus ? 1.4 : p.maxGlideFallSpeed;

      if (p.isGliding && p.vy > 0) {
        p.vy = Math.min(p.vy + glideFall, maxFall);
        if (left) p.vx = -p.glideSteerSpeed;
        else if (right) p.vx = p.glideSteerSpeed;
      } else if (!p.isWallSliding) {
        p.vy += p.gravity;
        if (p.vy > p.maxFallSpeed) p.vy = p.maxFallSpeed;
      }

      p.x += p.vx;
      p.y += p.vy;
    } else {
      // Dash ativo
      p.x += p.vx;
    }

    // Limites do Mundo
    p.x = Math.max(20, Math.min(this.worldWidth - 90, p.x));
    p.y = Math.max(50, Math.min(this.worldHeight - 130, p.y));

    // COLISÃO COM PLATAFORMAS (ONE-WAY E SÓLIDAS)
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
        // Se for One-Way e estiver dropando (S+Space), pula colisão
        if (plat.oneWay && p.dropThroughTimer > 0) {
          continue;
        }

        // Colisão com topo da plataforma
        if (p.vy >= 0 && footY >= plat.y && footY - p.vy <= plat.y + 24) {
          p.y = plat.y - 110;
          p.vy = 0;
          p.isGrounded = true;
          p.coyoteTimer = 0.12; // Coyote time renovado
          p.canDoubleJump = true;
          p.isGliding = false;
          p.isGrappling = false;

          // Efeito de impacto ao aterrissar (Squash & Sound)
          if (!prevGrounded) {
            p.scaleX = 1.26;
            p.scaleY = 0.76;
            this.spawnDust(footX, plat.y, 6);
            sfx.playStep();
          }

          // Jump buffer execution
          if (p.jumpBufferTimer > 0) {
            this.handleJumpPress();
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
          p.coyoteTimer = 0.12;
          p.canDoubleJump = true;
          p.isGliding = false;
          p.isGrappling = false;
          lotus.fading = true;
          break;
        }
      }
    }

    // Colisão Horizontal com Portão Rúnico
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
      if (Math.hypot(p.x - npc.x, p.y - npc.y) < 110) {
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

    // Animações do Jogador
    if (p.isAttacking) {
      p.state = p.attackType || 'attack_combo';
      p.attackTimer++;
      const curFrames = frameImages[p.state] || frameImages['attack_combo'] || [];
      p.frameIndex = Math.floor(p.attackTimer / 4);
      if (p.frameIndex >= curFrames.length) {
        p.isAttacking = false;
        p.isDownslashing = false;
        p.state = p.isGrounded ? 'idle' : 'jump';
        p.frameIndex = 0;
      }
    } else if (p.isGliding) {
      p.state = 'glide';
      p.glideAnimTimer = (p.glideAnimTimer || 0) + 1;
      const glideList = frameImages['glide'] || [];
      p.frameIndex = glideList.length > 0 ? Math.floor(p.glideAnimTimer / 10) % glideList.length : 0;
    } else if (!p.isGrounded) {
      p.state = 'jump';
      p.glideAnimTimer = 0;
      p.frameIndex = p.vy < 0 ? 0 : 2;
    } else if (Math.abs(p.vx) > 0.3) {
      p.state = 'run';
      p.animTime += 1;
      const count = (frameImages['run'] || []).length;
      if (count > 0) {
        p.frameIndex = Math.floor(p.animTime / 6) % count;
        if (p.animTime % 12 === 0) sfx.playStep();
      }
    } else {
      p.state = 'idle';
      p.animTime += 0.5;
      const count = (frameImages['idle'] || []).length;
      if (count > 0) p.frameIndex = Math.floor(p.animTime / 30) % count;
    }

    // Câmera Horizontal Suave com Look-Ahead (Câmera Vertical Travada Perfeitamente no Chão)
    const lookAheadX = p.facing * 130 + p.vx * 16;
    const targetCamX = Math.max(0, Math.min(this.worldWidth - this.viewWidth, p.x + lookAheadX - this.viewWidth / 2 + 35));
    this.cameraX += (targetCamX - this.cameraX) * 0.08;
    this.cameraY = 0; // Fixada no nível do chão (base do tileset toca o ponto mais baixo da tela)

    // Partículas e Slashes
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
    // Atualização de Pétalas de Sakura com Colisão no Chão e Fade-out de 3s
    for (let i = 0; i < this.sakuraPetals.length; i++) {
      const petal = this.sakuraPetals[i];
      if (!petal.grounded) {
        petal.swayPhase += petal.swaySpeed;
        petal.x += petal.speedX + Math.sin(petal.swayPhase) * petal.swayAmp;
        petal.y += petal.speedY;
        petal.angle += petal.rotSpeed;

        // Pouso no Chão da Grama (não atravessa)
        if (petal.y >= petal.groundY) {
          petal.y = petal.groundY;
          petal.grounded = true;
          petal.fadeTimer = 3.0; // 3 segundos de fade out
          petal.angle = (Math.random() - 0.5) * 0.35; // Repousa suavemente na grama
        }
      } else {
        // Pétala no chão esvanecendo suavemente durante 3 segundos
        petal.fadeTimer -= 1 / 60;
        petal.opacity = petal.baseOpacity * Math.max(0, petal.fadeTimer / 3.0);

        if (petal.fadeTimer <= 0) {
          // Renascer suavemente no topo
          this.sakuraPetals[i] = this.createSakuraPetal(false);
        }
      }

      // Se sair da tela lateral
      if (petal.x > this.worldWidth + 30) {
        petal.x = -20;
      }
    }
  }

  // --- RENDERIZAÇÃO DO MUNDO & GAME FEEL ---
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

    // Aplicação de Screen Shake
    let shakeX = 0;
    let shakeY = 0;
    if (this.screenShake > 0) {
      shakeX = (Math.random() - 0.5) * this.screenShake * 2;
      shakeY = (Math.random() - 0.5) * this.screenShake * 2;
    }
    ctx.translate(-this.cameraX + shakeX, -this.cameraY + shakeY);

    // Desenhar Faixas do Chão Reto com Grama e Muro de Pedra (com 18px de bleed cobrindo 100% da base)
    const groundImg = envImages['ground_strip'];
    const bleedY = 18;
    const groundDrawY = this.viewHeight + bleedY - 130;
    if (groundImg && groundImg.complete) {
      const stripW = 910;
      const stripH = 130;
      const totalStrips = Math.ceil(this.worldWidth / stripW) + 1;
      for (let i = 0; i < totalStrips; i++) {
        ctx.drawImage(groundImg, i * stripW, groundDrawY, stripW, stripH);
      }
    }

    // Desenhar Lanternas de Pedra com Silhueta Limpa e Chama Mística Estética
    const lanternImg = envImages['stone_lantern'];
    const nowTime = Date.now() * 0.003;
    const groundSurface = this.viewHeight + bleedY - 90;

    for (const anchor of this.grappleAnchors) {
      const lx = anchor.x;
      const ly = groundSurface;
      const chamberY = ly - 36;

      // 1. Sprite da Lanterna de Pedra Lapidada (apoiada na grama)
      if (lanternImg && lanternImg.complete) {
        ctx.drawImage(lanternImg, lx - 30, ly - 62, 60, 68);
      }

      // 2. Chama Espiritual Interna da Lanterna (Suave, Orgânica e Mística)
      const flamePulse = Math.sin(nowTime * 4 + anchor.x) * 1.5;

      // Halo de iluminação ambiente âmbar suave
      const ambientGlow = ctx.createRadialGradient(lx, chamberY, 2, lx, chamberY, 30 + flamePulse);
      ambientGlow.addColorStop(0, 'rgba(254, 240, 138, 0.40)');
      ambientGlow.addColorStop(0.5, 'rgba(245, 158, 11, 0.18)');
      ambientGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(lx, chamberY, 30 + flamePulse, 0, Math.PI * 2);
      ctx.fill();

      // Núcleo da Chama Espiritual no interior da janela da lanterna
      const coreGlow = ctx.createRadialGradient(lx, chamberY, 1, lx, chamberY, 6.5 + flamePulse);
      coreGlow.addColorStop(0, '#ffffff');
      coreGlow.addColorStop(0.35, '#fde047');
      coreGlow.addColorStop(0.75, '#f97316');
      coreGlow.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(lx, chamberY, 6.5 + flamePulse, 0, Math.PI * 2);
      ctx.fill();

      // Pequenas fagulhas místicas subindo da lanterna
      const emberOffset = (Date.now() * 0.018 + anchor.x * 5) % 22;
      const emberY = chamberY - emberOffset;
      const emberAlpha = Math.max(0, 1.0 - emberOffset / 22.0);
      ctx.fillStyle = `rgba(251, 191, 36, ${emberAlpha * 0.75})`;
      ctx.beginPath();
      ctx.arc(lx + Math.sin(Date.now() * 0.006 + anchor.x) * 3, emberY, 1.6, 0, Math.PI * 2);
      ctx.fill();

      // 3. Retículo Rúnico Estético quando o Jogador está no Alcance / Mirado
      const isTargeted = this.activeGrappleTarget && this.activeGrappleTarget.id === anchor.id;
      if (isTargeted) {
        ctx.save();
        ctx.translate(lx, chamberY);

        const targetPulse = Math.sin(nowTime * 6) * 3;
        const ringRadius = 22 + targetPulse;

        // Anel de Energia Espiritual com Glow
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // 4 Marcadores Rúnicos Cardeais em Rotação Lenta
        for (let a = 0; a < 4; a++) {
          const angle = a * (Math.PI / 2) + nowTime * 1.5;
          const mx = Math.cos(angle) * (ringRadius + 4);
          const my = Math.sin(angle) * (ringRadius + 4);
          ctx.fillStyle = '#e0f2fe';
          ctx.beginPath();
          ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Tag Flutuante Elegante [K / F]
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(-24, -ringRadius - 22, 48, 18, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('K / F', 0, -ringRadius - 10);

        ctx.restore();
      }
    }

    // 6. LINHA DO GANCHO DE ESCALADA (SPIRIT TETHER)
    const p = this.player;
    if (p.isGrappling && p.grappleTarget) {
      ctx.save();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.moveTo(p.x + 35, p.y + 50);
      ctx.lineTo(p.grappleTargetPos.x, p.grappleTargetPos.y);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(p.x + 35, p.y + 50);
      ctx.lineTo(p.grappleTargetPos.x, p.grappleTargetPos.y);
      ctx.stroke();
      ctx.restore();
    }

    // 7. NPCs COM RESPIRAÇÃO OCIOSA & PROMPT
    const npcAnimTime = Date.now() * 0.003;
    for (const npc of this.npcs) {
      ctx.save();
      const breathSquash = Math.sin(npcAnimTime * 2.5) * 0.04;
      const breathBob = Math.sin(npcAnimTime * 2.5) * 3;

      ctx.translate(npc.x, npc.y + 30 + breathBob);
      ctx.scale(1.0 - breathSquash, 1.0 + breathSquash);

      // Sombra
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.beginPath(); ctx.ellipse(0, 0, 26, 8, 0, 0, Math.PI * 2); ctx.fill();

      // Aura sutil
      ctx.strokeStyle = npc.theme;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -35, 36 + Math.sin(npcAnimTime * 3) * 2, 0, Math.PI * 2);
      ctx.stroke();

      // Sprite do NPC
      const npcImg = npcImages[npc.id];
      if (npcImg && npcImg.complete) {
        const nw = 76;
        const nh = 86;
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(npcImg, -nw / 2, -nh, nw, nh);
      } else {
        ctx.font = '34px sans-serif';
        ctx.fillText(npc.portrait, -17, -8);
      }
      ctx.restore();
    }

    // 8. Espíritos Luminosos (Wisps)
    for (const wisp of this.spiritWisps) {
      const curX = wisp.x + Math.sin(nowTime) * 12;
      const curY = wisp.y + Math.sin(nowTime * 2) * 8;
      ctx.fillStyle = wisp.color;
      ctx.beginPath(); ctx.arc(curX, curY, 8, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = wisp.color;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(curX, curY, wisp.auraRadius + Math.sin(nowTime * 3) * 4, 0, Math.PI * 2); ctx.stroke();
    }

    // 9. Cogumelos Bioluminescentes (Pogo)
    for (const mush of this.pogoMushrooms) {
      ctx.fillStyle = mush.color;
      ctx.beginPath();
      ctx.ellipse(mush.x + mush.w / 2, mush.y + 10, mush.w / 2, mush.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 10. Pergaminhos
    for (const sc of this.scrolls) {
      if (!sc.collected) {
        const hoverY = sc.y + Math.sin(Date.now() * 0.005) * 6;
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath(); ctx.arc(sc.x, hoverY, 14, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#b45309';
        ctx.fillRect(sc.x - 8, hoverY - 6, 16, 12);
      }
    }

    // 11. Pétalas de Cerejeira com Variação, Brilho e Fade-out no Chão
    for (const petal of this.sakuraPetals) {
      if (petal.opacity <= 0.01) continue;
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.angle);
      ctx.globalAlpha = Math.max(0, Math.min(1, petal.opacity));

      if (petal.isRare) {
        // Pétala Espiritual Rara com Glow Dourado
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#fde68a';
      } else {
        ctx.fillStyle = '#fbcfe8';
      }

      ctx.beginPath();
      ctx.ellipse(0, 0, petal.size, petal.size * 0.48, 0, 0, Math.PI * 2);
      ctx.fill();

      // Sutil nervura central da pétala
      ctx.shadowBlur = 0;
      ctx.strokeStyle = petal.isRare ? '#f59e0b' : '#f472b6';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(-petal.size * 0.6, 0);
      ctx.lineTo(petal.size * 0.6, 0);
      ctx.stroke();

      ctx.restore();
    }

    // 12. Partículas de Efeitos
    for (const pt of this.particles) {
      ctx.fillStyle = pt.color;
      ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2); ctx.fill();
    }

    // 13. Desenho do Jogador com ALINHAMENTO EXATO DAS PATAS NO CHÃO & SQUASH
    let animKey = p.state;
    const frames = frameImages[animKey] || frameImages['attack_combo'] || frameImages['idle'];

    if (frames && frames[p.frameIndex] && frames[p.frameIndex].complete) {
      const frameImg = frames[p.frameIndex];
      const fw = frameImg.naturalWidth || 512;
      const fh = frameImg.naturalHeight || 512;
      
      // Escala 1:1 rigorosa para canvas uniforme de 512x512
      const baseScale = 0.425;

      ctx.save();
      // Pivot exatamente na base dos pés
      ctx.translate(p.x + 35, p.y + 110);
      ctx.scale(p.facing * (p.scaleX || 1.0), p.scaleY || 1.0);

      // Sombra diretamente colada nas patas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.50)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 26, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      const dw = fw * baseScale;
      const dh = fh * baseScale;
      // Alinhamento anatômico do chão: y=446 em 512px
      const footAnchorY = dh * (446.0 / 512.0);

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(frameImg, -dw / 2, -footAnchorY, dw, dh);
      ctx.restore();
    }

    // 14. Rastro de Corte da Katana
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
      const bleedY = 18;
      game.player.x = 400;
      game.player.y = (game.viewHeight || 720) + bleedY - 90 - 110;
      game.player.vx = 0;
      game.player.vy = 0;
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

// --- 7. LOOP PRINCIPAL COM DELTA-TIME INDEPENDENTE (FIXED TIMESTEP) ---
window.addEventListener('DOMContentLoaded', () => {
  initAssets(() => {
    const studio = new StudioAnimator();
    const game = new MetroidvaniaWorldGame();

    setupMainMenu(game);
    if (studio.canvas) studio.selectAnimation('idle');
    game.updateHollowKnightHUD();

    let lastTime = performance.now();
    let accumulator = 0;
    const FIXED_DT = 1 / 60; // 60Hz taxa física fixa

    function mainLoop(currentTime) {
      let deltaSec = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      if (deltaSec > 0.1) deltaSec = 0.1; // Previne espiral da morte em lag

      accumulator += deltaSec;
      while (accumulator >= FIXED_DT) {
        game.fixedUpdate(FIXED_DT);
        accumulator -= FIXED_DT;
      }

      studio.render(currentTime);
      game.render();
      requestAnimationFrame(mainLoop);
    }
    requestAnimationFrame(mainLoop);
  });
});
