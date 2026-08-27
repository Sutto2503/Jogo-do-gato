---
name: character-animator
description: >-
  Lead 2D Character Animator & Sprite Pipeline Engineer for 'Gatinho Samurai: Ecos Místicos'.
  Specialized in 2D animation fluidity, 12 principles of animation, 8-frame combat cycles,
  AI chroma key generation (#00FF00), frame extraction pipelines, uniform 1:1 scale anchoring,
  mandatory auto-generation of spritesheets & previews, and seamless state transitions in Godot 4.
---

# 🎭 Character Animator: Gatinho Samurai (Godot 4 Metroidvania)

Esta skill governa os padrões de **qualidade visual, fluidez de movimentação, coerência anatômica, resolução uniforme e automação contínua de entregas** de todos os sprites, ciclos de combate e locomoção do protagonista e NPCs em **Godot 4**.

---

## 🎯 Pilares da Skill

1. **Princípios Clássicos de Animação 2D**:
   - **Anticipation & Squash**: Preparação clara da silhueta antes do disparo da ação.
   - **Smear Frames & Motion Lines**: Deformação dinâmica da espada e cauda durante os quadros de velocidade extrema.
   - **Follow-Through & Settling**: Amortecimento de capas, orelhas, quimono e bainha após o golpe.
2. **Distribuição Padrão de 8 Quadros (Cinematográfico Equilibrado)**:
   - `Frame 1` (Início / Saque): Posicionamento e início do vetor de força.
   - `Frames 2-4` (Aceleração / Golpe Ativo): Lâmina cortando o ar com rastro de fogo e chamas em arco.
   - `Frames 5-6` (Impacto / Ápice): Ponto de contato com hitstop visual e máxima expansão da energia.
   - `Frames 7-8` (Recuperação / Guarda): Retorno fluido à postura de guarda com estabilização do quimono.
3. **Mecânicas de Fluidez e Game Feel**:
   - **Micro-Stall Aéreo**: Redução de gravidade em 60% por 0.08s durante golpes aéreos para precisão cirúrgica.
   - **Transições Suaves**: Compatibilidade de pose inicial/final com `Idle`, `Run` e `Jump`.
4. **Resolução & Escala Anatômica 1:1 Invariável**:
   - **Escala de Corpo Imutável (1.0x)**: A altura do corpo do personagem (pés à cabeça) NUNCA deve sofrer downscaling ou upscaling arbitrário entre frames (~195-210px nativos).
   - **Canvas Espaçoso para Efeitos (512x512 px)**: Golpes com arcos de fogo largos, mergulhos verticais ou giros circulares exigem mais espaço. Usar SEMPRE canvas 512x512 para comportar chamas de até 450px de largura sem encolher o personagem nem cortar os efeitos.
   - **Ancoragem de Ponto de Contato (Ground Baseline)**: Todos os frames terrestres devem ter os pés do personagem fixados no mesmo `y_baseline` (ex: `y = 390` em canvas 512x512) para evitar flutuação ou trepidação no chão.
5. **Pipeline Técnico Chroma Key (#00FF00) & Anti-Invasão**:
   - **Segmentação por Componentes Conectados (`scipy.ndimage.label`)**: NUNCA usar divisão de grade matemática fixa (`w // cols`). Cada frame deve ter sua máscara alfa exclusiva gerada a partir do seu corpo + chamas vinculadas.
   - **Despill de Borda**: Ajustar canais verdes residuais no perímetro com interpolação de cor.
   - **Zero Invasão**: Qualquer pixel de sprites ou chamas vizinhas fora da máscara do quadro atual é forçado a `0` (100% transparente).

---

## 🔄 Protocolo de Atualização Obrigatória de Pastas (Pipeline de Entrega)

**SEMPRE que uma nova sprite ou animação de personagem for criada ou modificada, as seguintes 4 pastas DEVEM ser sincronizadas e atualizadas atomicamente:**

```
                                ┌────────────────────────┐
                                │   NOVA ANIMAÇÃO / IA   │
                                └───────────┬────────────┘
                                            │
         ┌──────────────────┬───────────────┴──────────────┬──────────────────┐
         ▼                  ▼                              ▼                  ▼
┌──────────────────┐┌────────────────────────┐┌──────────────────┐┌──────────────────┐
│  1. assets/frames││ 2. assets/spritesheets ││3. assets/previews││4. scenes/player/ │
│  PNGs individuais││ - Sheets individuais   ││ - GIFs animados  ││ player_sprite_   │
│  isolados e sem  ││ - Master Atlas 4096px  ││   por animação   ││ frames.tres      │
│  fundo (Chroma)  ││ - Atlas JSON Metadata  ││ - Showcase Geral ││ (Motor Godot 4)  │
└──────────────────┘└────────────────────────┘└──────────────────┘└──────────────────┘
```

1. **`assets/frames/<nome_animacao>/`**:
   - Salvar todos os frames individuais isolados em formato PNG $RGBA$ com fundo 100% transparente e nomeados sequencialmente (`<anim>_0.png` a `<anim>_N.png`).
2. **`assets/spritesheets/`**:
   - **Tiras Individuais**: Gerar `<personagem>_<nome_animacao>.png` (faixa horizontal contínua de todos os frames).
   - **Atlas Mestre Consolidado**: Atualizar `cat_warrior_all_animations.png` integrando a nova animação à grade matricial.
   - **Metadados JSON**: Atualizar `cat_warrior_atlas.json` com as coordenadas $(x, y, w, h)$ exatas de cada frame no atlas mestre.
3. **`assets/previews/`**:
   - **GIFs Individuais**: Gerar `<nome_animacao>.gif` com o FPS calibrado e loop infinito (`loop=0`).
   - **Showcase Consolidado**: Atualizar `showcase_combat.gif` com a sequência combinada de ações.
4. **`scenes/player/player_sprite_frames.tres`**:
   - Registrar as novas instâncias de textura `ExtResource` e configurar a taxa de quadros e tipo de loop no recurso do Godot 4.

---

## 📐 Tabela Mestre de Animações (Godot 4)

| Animação | Qtd Quadros | FPS Base | Resolução Canvas | Tipo de Loop | Comportamento Especial |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `idle` | 6 | 5.0 | 256x256 | Loop | Respiração rítmica e oscilação de cauda |
| `run` | 8 | 11.0 | 256x256 | Loop | Passadas cadenciadas com flutter de capa |
| `jump` | 5 | 8.0 | 256x256 | Clamp | Fases de subida, ápice e queda |
| `glide` | 5 | 6.0 | 512x512 / 256 | Loop | Queda lenta, pipa de bambu e vento |
| `attack` | 8 | 14.0 | 512x512 | Clamp | Combo de corte horizontal com arco de fogo |
| `attack_spin` | 8 | 14.0 | 512x512 | Clamp | Giro 360° com anel completo de chamas |
| `downslash` | 8 | 16.0 | 512x512 | Clamp | Mergulho vertical com rebote pogo |
| `skid` | 4 | 10.0 | 256x256 | Clamp | Frenagem rápida após corrida |
| `slide` | 4 | 10.0 | 256x256 | Clamp | Deslize sob obstáculos baixos |
| `turn` | 4 | 10.0 | 256x256 | Clamp | Transição rápida de inversão de direção |
