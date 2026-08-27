---
name: project-owner
description: >-
  Project Owner and Lead Game Designer skill for 'Gatinho Samurai: Ecos Místicos'.
  Coordinates roadmap, backlog, quality assurance, and architecture across 3 strategic fronts:
  (1) Characters, NPCs & Enemies, (2) Environments, Props & Architecture, and (3) Game Mechanics, Physics & Combat in Godot 4.
---

# 👑 Project Owner: Gatinho Samurai (Godot 4 Metroidvania)

Esta skill define o papel e os protocolos de **Product Owner / Lead Game Designer** para o desenvolvimento de **Gatinho Samurai: Ecos Místicos** em **Godot 4**.

---

## 🎯 Visão do Produto & Pilares Centrais

1. **Game Feel de Alta Precisão (Ori & the Blind Forest + Hollow Knight)**:
   - Movimentação fluida, responsiva e com micro-compensações (*coyote time*, *jump buffer*, *variable jump height*, *squash & stretch*).
   - Combate ágil com impacto visceral (*hitstop*, *screenshake*, *knockback* e *pogo bounce*).
2. **Estética 2D Ilustrada HD com Profundidade**:
   - Cenários pintados em alta definição divididos em camadas de *Parallax2D*, combinados com iluminação dinâmica, partículas e névoa atmosférica.
3. **Progressão Metroidvania Orgânica**:
   - Gating por habilidades naturais (Gancho de Escalada, Amuleto do Passo Fantasma, Chaves Espirituais, Quebra de Paredes).
   - Exploração não-linear com segredos, NPCs com quests e chefes desafiadores.

---

## 🧭 As 3 Frentes de Desenvolvimento

```
                              ┌────────────────────────┐
                              │     PROJECT OWNER      │
                              │ (Visão & Governança)   │
                              └───────────┬────────────┘
         ┌────────────────────────────────┼────────────────────────────────┐
         ▼                                ▼                                ▼
┌──────────────────┐            ┌──────────────────┐            ┌──────────────────┐
│     FRENTE 1     │            │     FRENTE 2     │            │     FRENTE 3     │
│ Personagens,     │            │ Cenários, Objetos│            │ Mecânicas,       │
│ NPCs e Inimigos  │            │ e Construções    │            │ Física e Combate │
└──────────────────┘            └──────────────────┘            └──────────────────┘
```

---

### 🐱 FRENTE 1: Personagens, NPCs & Inimigos (Character & Enemy Design)

#### 1. Protagonista: Gato Samurai
- **Spritesheets HD & Ciclos**:
  - `Idle` (6 frames, 5 FPS): Respiração rítmica, cauda ondulante e foco calmo.
  - `Walk` & `Run` (8 frames): Passadas cadenciadas e corrida inclinada com flutter de capa.
  - `Jump` (5 fases): Crouch, Leap, Apex Tuck, Fall e Landing.
  - `Turn`, `Skid/Brake`, `Slide/Dash`: Transições de alta fidelidade sem corte de quadros.
  - `Attack Combo` (3 slices): Ataques horizontais rápidos e *Downslash* (Pogo).

#### 2. Inimigos Comuns & Sub-Chefes
- **Bandido Iguana Ronin (Tier 1 Mob)**:
  - IA de Patrulha com detecção frontal de 120° (raio de 160px).
  - Ataque *Lunge Slash* telegrafado com adaga *Tanto*.
  - Estados: `Patrol` -> `Alert` -> `Lunge` -> `Hurt` -> `Death`.
  - Spritesheets dedicados: `idle`, `walk`, `attack`, `hurt`, `death`.
- **Morcego dos Penhascos / Espírito Corrompido (Tier 1 Flying)**:
  - Movimento senoidal no ar, mergulho agressivo quando o jogador passa por baixo.

#### 3. Chefes de Setor (Boss Design)
- **Senhor da Guerra Iguana (Chefe do Ato 1)**:
  - Escala `1.5x`, vestindo armadura *Jinbaori* carmesim e empunhando Grande Espada *Ōdachi*.
  - **Fase 1**: Sequência de corte horizontal de 180°, golpe descendente sísmico e recuo tático.
  - **Fase 2**: Investida veloz com perfuração (*Dash Thrust*), invocação de adagas e tempo de recuperação reduzido.
  - Mecânica de *Stagger* (atordoamento de 2.0s ao receber golpes pesados).

#### 4. NPCs e Quests
- **Mestre Ancião Jin**: Mentor da vila; entrega a missão das 2 Chaves de Espírito para abrir o Portão Rúnico.
- **Ferreira Kumi**: Mestra de forja; introduz o sistema de Amuletos e talismãs.
- **Explorador Ren**: NPC preso nas Ruínas Subterrâneas; recompensa o resgate com o Amuleto do Passo Fantasma (*Shadow Dash*).

---

### 🏯 FRENTE 2: Cenários, Objetos & Construções (World & Environment)

#### 1. Setores do Mundo Ilustrado HD (Parallax2D)
- **Setor 1 - Vila dos Samurais & Grande Pagoda Vermelha**:
  - Casas de madeira tradicionais com beirais escaláveis (*one-way platforms*).
  - Grande Pagoda de 3 andares com lanternas suspensas para ancoragem do gancho.
  - Árvores de cerejeira (*Sakura*) com emissão contínua de pétalas.
- **Setor 2 - Ponte Ancestral de Pedra & Rio Sagrado**:
  - Construção de arcos de pedra com anéis de ferro para balanceio e travessia.
  - Água reflexiva com partículas de névoa e plataformas de lótus flutuantes.
- **Setor 3 - Penhascos Místicos & Fenda de Vento**:
  - Paredes verticais para *wall-slide* e *wall-jump*.
  - Ilhas de pedra flutuantes em oscilação senoidal harmônica.
  - Fenda com corrente de ar ascendente para planar com o quimono.
- **Setor 4 - Ruínas Subterrâneas & Tubulações Antigas**:
  - Túneis escuros com cogumelos bioluminescentes (pogo jump).
  - Paredes de pedra rachadas destruíveis com golpes de espada.

#### 2. Objetos Interativos & Props Físicos (Interactive Elements)
- **Âncoras de Gancho (Grapple Anchors)**: Lanternas, anéis e estalactites com destaque visual ao entrar no raio de mira.
- **Plataformas de Lótus Efêmeras**: Abrem-se ao toque e desvanecem após 1.2s, ressurgindo após 3.0s.
- **Santuários de Meditação**: Pontos de restauração total de vida/alma e *checkpoint* permanente.
- **Portão Rúnico (Keystone Gate)**: Barreira mágica que consome 2 *Keystones* para desbloquear a rota principal.
- **Cogumelos Pogo**: Superfícies elásticas que impulsionam o jogador verticalmente ao desferir um *Downslash*.

---

### ⚙️ FRENTE 3: Mecânicas Técnicas, Física & Combate (Engine & Gameplay)

#### 1. Cinemática & Física do Jogador (Godot `CharacterBody2D`)
- **Parâmetros Calibrados**:
  - `speed`: 330.0 px/s | `sprint_speed`: 510.0 px/s
  - `acceleration`: 0.65 | `friction`: 0.55
  - `jump_velocity`: -840.0 px/s | `double_jump_velocity`: -810.0 px/s
  - `gravity`: 2400.0 px/s² | `max_fall_speed`: 950.0 px/s
  - `glide_gravity`: 350.0 px/s² | `glide_max_fall`: 140.0 px/s
- **Assistências de Game Feel**:
  - **Coyote Time**: Janela de tolerância de `0.12s` para pular após sair de uma beirada.
  - **Jump Buffering**: Registro de input de pulo até `0.10s` antes de tocar o chão.
  - **Variable Jump Cut**: Redução de 48% da velocidade vertical ao soltar o botão no ar.
  - **Platform Drop-Through**: Pressionar `Baixo + Pulo` atravessa plataformas *one-way*.

#### 2. Sistema de Habilidades & Travessia
- **Gancho de Escalada (Grappling Hook / Bash)**:
  - Sistema de auto-mira na âncora mais próxima dentro do raio de 280px e cone de 80°.
  - Puxada em arco veloz com aceleração inicial e liberação suave no ápice.
  - Cooldown de 0.5s para evitar exploits de voo infinito.
- **Planador com Quimono (Spirit Glider)**:
  - Ativado segurando o botão de pulo durante a queda.
  - Movimentação horizontal aumentada com queda lenta amortecida.
- **Esquiva Sombria (Shadow Dash)**:
  - Arrancada horizontal de 18.0x com 12 frames de invulnerabilidade (*I-frames*).

#### 3. Combate, Dano & Impacto
- **Hitstop & Freeze Frame**: Pausa de 0.06s na animação ao conectar golpes para sensação de peso.
- **Knockback Bidirecional**: Empurrão suave no inimigo e leve recuo no jogador (*recoil*).
- **Pogo Bounce**: Ao acertar inimigos, espinhos ou cogumelos com golpe para baixo (*Downslash*), o jogador é impulsionado para cima e recupera o pulo duplo.
- **HUD & Recursos (Estilo Hollow Knight)**:
  - Soul Orb (Orbe de Alma/Espírito) para canalização de cura e técnicas.
  - Máscaras de Vida (Segmentos discretos de 20 HP cada).
  - Sistema de Amuletos com slots (Notches) configuráveis em santuários.

---

## 📋 Checklist de Validação do Project Owner

Antes de aprovar qualquer entrega ou commit nas 3 frentes:
1. [ ] **Frente 1**: A animação tem contorno limpo, sem artefatos de fundo e com taxa de quadros coerente com a tabela mestre?
2. [ ] **Frente 2**: As colisões das plataformas batem perfeitamente com os limites visuais dos objetos na escala do mundo?
3. [ ] **Frente 3**: O controle do personagem responde instantaneamente sem *input lag* perceptível e mantém *coyote time* funcional?
4. [ ] **Integração Godot 4**: O código está modularizado em nós (`CharacterBody2D`, `Area2D`, `AnimationPlayer`), sem referências circulares e com tratamento de sinais (`signals`) desacoplado?
