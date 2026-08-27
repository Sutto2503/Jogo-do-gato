# ⚙️ Frente 3: Mecânicas Técnicas, Física e Combate

Documento mestre de especificações técnicas de jogabilidade, física de plataformas estilo *Ori*, combate visceral inspirado em *Hollow Knight* e arquitetura de nós no **Godot 4**.

---

## 1. 🎛️ Motor de Física e Cinemática do Jogador (`CharacterBody2D`)

### 🏃 1.1 Tabela de Parâmetros de Movimento Calibrados

| Variável | Valor Godot 4 | Descrição e Propósito de Design |
|---|:---:|---|
| `SPEED` | `330.0 px/s` | Velocidade horizontal base de caminhada responsiva |
| `SPRINT_SPEED` | `510.0 px/s` | Velocidade máxima em corrida contínua |
| `ACCEL` | `0.65` | Aceleração no solo (arranque sem sensação de patinação) |
| `FRICTION` | `0.55` | Desaceleração de parada instantânea no solo |
| `AIR_ACCEL` | `0.42` | Controle de direção no ar (permite micro-ajustes em saltos) |
| `AIR_DRAG` | `0.95` | Resistência do ar para curvas no salto |
| `JUMP_VELOCITY` | `-840.0 px/s` | Impulso inicial do pulo padrão |
| `DOUBLE_JUMP_VELOCITY`| `-810.0 px/s`| Segundo pulo no ar (resetado ao tocar solo ou realizar pogo) |
| `GRAVITY` | `2400.0 px/s²` | Gravidade padrão com queda pesada e ágil |
| `MAX_FALL_SPEED` | `950.0 px/s` | Velocidade terminal de queda |
| `GLIDE_GRAVITY` | `350.0 px/s²` | Gravidade atenuada ao acionar o Quimono Planador |
| `GLIDE_MAX_FALL` | `140.0 px/s` | Queda suave e controlada durante o voo |
| `GLIDE_STEER_SPEED` | `390.0 px/s` | Velocidade horizontal durante o planeio |

---

## 2. 🕹️ Algoritmos de Assistência e Game Feel

### ⏳ 2.1 Coyote Time (`0.12s`)
- **Implementação**: Ao deixar uma superfície de solo sem ter pulado (ex: cair de uma beirada), o temporizador de coyote time é ativado por `0.12s`.
- **Efeito**: Permite ao jogador executar um salto no primeiro frame após sair da borda, eliminando a frustração de "pulos comidos".

### 📥 2.2 Jump Buffering (`0.10s`)
- **Implementação**: Se o jogador pressionar o botão de pulo enquanto ainda está no ar a até `0.10s` do chão, a ação é enfileirada.
- **Efeito**: O pulo é disparado exatamente no frame em que o personagem toca o solo.

### 📐 2.3 Variable Jump Height (Corte de Altura)
- **Implementação**: Se a tecla de pulo for solta enquanto `velocity.y < -150.0`, a velocidade vertical ascendente é multiplicada por `0.52`.
- **Efeito**: Saltos curtos com toques rápidos e saltos longos ao manter o botão pressionado.

### 🪜 2.4 Plataformas Semi-Sólidas (Drop-Through)
- **Implementação**: Ao pressionar `Direção Baixo (S) + Pulo`, as máscaras de colisão com camadas *one-way* são temporariamente desativadas por `0.20s`.

---

## 3. 🎯 Sistema de Gancho e Travessia Aérea (Grappling Hook & Bash)

### 🪝 Mecânica de Auto-Targeting & Travamento
1. **Varredura Cônica**:
   - Raio máximo: `280px`.
   - Ângulo de visão: `80°` à frente da direção que o personagem está olhando.
2. **Priorização de Alvo**:
   - Distância euclidiana ponderada pelo ângulo de alinhamento com a mira.
3. **Retículo Visual**:
   - Quando uma âncora (lanterna, anel de ponte ou espírito wisp) entra na mira, um retículo rúnico dourado se acopla ao objeto.
4. **Física da Puxada**:
   - Velocidade de atração: `1100.0 px/s`.
   - Trajetória em curva Bezier suave que culmina num pequeno salto vertical ao chegar na âncora.
   - **Cooldown de Segurança**: `0.5s` para evitar impulsos infinitos sem pousar.

---

## 4. ⚔️ Sistema de Combate, Dano e Impacto

### 🗡️ 4.1 Sequência de Ataques & Hitbox
- **Ataque 1**: Corte rápido horizontal para frente (dano: 20).
- **Ataque 2**: Corte ascendente com maior raio de alcance (dano: 22).
- **Ataque 3 (Finalizador)**: Talho giratório de alto alcance com liberação de onda de choque (dano: 30).
- **Downslash (Ataque para baixo)**: Corte vertical em queda livre.

### 🦘 4.2 Pogo Bounce (Salto na Lâmina)
- Ao conectar um *Downslash* contra:
  - Inimigos terrestres ou chefes.
  - Cogumelos bioluminescentes.
  - Armadilhas de espinhos no solo.
- **Resultado Imediato**:
  - `velocity.y = -800.0 px/s` (Impulso ascendente instantâneo).
  - Recarga imediata da habilidade de pulo duplo e *dash*.
  - Efeito sonoro de impacto metálico (*playSlash*) e faíscas brancas no ponto de contato.

### 💥 4.3 Hitstop & Screen Shake
- **Hitstop**: Ao atingir um inimigo, o jogo pausa as atualizações visuais por `0.06s` (3 a 4 frames), gerando impacto visceral.
- **Screen Shake**: Tremor de câmera com intensidade proporcional ao ataque (`magnitude: 4.0 a 8.0`, `duração: 0.12s a 0.20s`).

---

## 5. 📿 Sistema de Amuletos e Recursos (Talismans & Notches)

O protagonista dispõe de até **2 Slots de Amuletos (Notches)** equipáveis em Santuários de Meditação:

| Amuleto | Ícone | Efeito de Mecânica |
|---|:---:|---|
| **Garra da Tempestade (Storm Claw)** | 🗡️ | Aumenta o tamanho da lâmina em +25% e adiciona projétil de ar cortante no 3º golpe |
| **Asas de Lótus (Lotus Wings)** | 🌸 | Permite planar com o Quimono sem consumir energia espiritual |
| **Olho do Espírito (Spirit Eye)** | 👁️ | Revela paredes falsas, rotas secretas e alcance estendido do Gancho |
| **Passo Fantasma (Shadow Dash)** | 💨 | Concede esquiva veloz com 12 frames de invulnerabilidade (*I-frames*) |

---

## 6. 🏛️ Arquitetura de Nós no Godot 4

```
[ MetroidvaniaWorld ] (Node2D)
 ├── [ ParallaxBackground ] (Parallax2D)
 │    ├── SkyLayer
 │    ├── MountainLayer
 │    └── ForegroundLayer
 ├── [ WorldTileMap / StaticColliders ] (TileMapLayer / StaticBody2D)
 ├── [ InteractiveProps ] (Node2D)
 │    ├── LanternAnchors (Area2D - GrappleTarget)
 │    ├── LotusPlatforms (AnimatableBody2D)
 │    ├── PogoMushrooms (Area2D)
 │    └── KeystoneGate (StaticBody2D)
 ├── [ NPCs ] (Node2D)
 │    └── NPC (Area2D + DialogueTrigger)
 ├── [ Enemies ] (Node2D)
 │    ├── IguanaBandit (CharacterBody2D + AIStateController)
 │    └── IguanaBoss (CharacterBody2D + BossStateMachine)
 ├── [ Player ] (CharacterBody2D)
 │    ├── CollisionShape2D
 │    ├── AnimatedSprite2D / AnimationPlayer
 │    ├── GrappleRayCast2D
 │    ├── AttackHitbox (Area2D)
 │    └── Camera2D (com script de Shake & Smooth Follow)
 └── [ UI_CanvasLayer ] (CanvasLayer)
      ├── HUD (SoulOrb, LifeMasks, KeystoneCounter)
      ├── DialogueBox
      └── AmuletMenu
```
