---
name: character-animator
description: >-
  Lead 2D Character Animator & Sprite Pipeline Engineer for 'Gatinho Samurai: Ecos Místicos'.
  Specialized in 2D animation fluidity, 12 principles of animation, 8-frame combat cycles,
  AI chroma key generation (#00FF00), frame extraction pipelines, uniform 1:1 scale anchoring,
  mandatory auto-generation of spritesheets & previews, and seamless state transitions in Godot 4.
---

# 🎭 Character Animator: Gatinho Samurai

Governa os padrões de **qualidade visual, escala anatômica 1:1, fluidez de combate e automação contínua de entrega** de sprites em **Godot 4**.

---

## 📐 Invariantes Técnicos e Métricas Globais

| Parâmetro | Valor Mandatório | Descrição / Regra |
| :--- | :--- | :--- |
| **Canvas Base** | `512 x 512 px` | Todos os frames exportados em PNG $RGBA$ transparente. |
| **Escala Anatômica 1:1** | `~218 px` ($\pm 5\text{px}$) | Altura do corpo (patas à cabeça em repouso) invariável entre poses. |
| **Linha de Base do Solo** | `y = 430 px` ($\pm 2\text{px}$) | Ancoragem vertical das patas em todas as poses de chão. |
| **Margem Anti-Clipping** | `x, y ∈ [20, 492]` | Conteúdo visível dentro da margem de segurança ($\ge 20\text{px}$ de borda livre). |
| **Chroma Key & Despill** | `#00FF00` | Fundo verde puro com despill de borda ($0.90\times$). |
| **Arquitetura VFX** | **Desacoplada** | PNG do gato contém apenas anatomia e katana física de aço. Efeitos de fogo/magia residem em `assets/vfx/`. |

---

## 🥇 Abordagem 1: Padrão de Geração de Sprites (IA)

Para evitar que katanas, mangas ou caudas sejam cortadas (*zero truncation*):
1. **Tiras Ultra-Espaçadas (16:9 / 21:9)**: Máximo 4 personagens por imagem, com grandes intervalos vazios entre figuras.
2. **Pares Duo-Frame (1:1)**: 2 personagens por imagem, garantindo $>500\text{px}$ de respiro ao redor de cada pose.
3. **Extração Morfológica**: Isolar o cluster unificado do personagem (`ndimage.binary_dilation` + `ndimage.label`) para preservar armas compridas e eliminar fragmentos de vizinhos (*Zero Invasão*).

---

## 🔄 Pipeline Obrigatório de 4 Pastas (Sincronização Atômica)

Toda modificação de sprite deve sincronizar atomicamente:

| Pasta de Destino | Conteúdo Gerado | Formato / Engine Target |
| :--- | :--- | :--- |
| **`1. assets/frames/<anim>/`** | Frames individuais isolados | PNG $RGBA$ (`<anim>_0.png` a `<anim>_N.png`) |
| **`2. assets/spritesheets/`** | Tiras horizontais + Atlas | `<personagem>_<anim>.png` e `cat_warrior_atlas.json` |
| **`3. assets/previews/`** | Previews animados em GIF | `<anim>.gif` (loop=0) e `showcase_combat.gif` |
| **`4. scenes/player/`** | Recurso do Godot 4 | `player_sprite_frames.tres` (FPS e frames sincronizados) |

---

## 🛡️ Governança de Qualidade: Subagente Avaliador (QA Gatekeeper)

Nenhum lote pode ser entregue sem aprovação formal do **Subagente Avaliador**.

### 🔍 Os 10 Critérios de Aceitação (Zero Tolerance):
1. **Resolução**: 100% dos frames em $512 \times 512\text{ px}$.
2. **Zero Clipping**: Margem livre $\ge 20\text{ px}$ em todas as 4 bordas ($[20, 492]$).
3. **Zero Invasão**: 0% de pixels de sprites vizinhos (cluster único isolado).
4. **Escala 1:1**: Altura do corpo em $\approx 218\text{ px}$ ($\pm 5\text{px}$).
5. **Ground Baseline**: Pés ancorados em $y = 430\text{ px}$ ($\pm 2\text{px}$) em poses terrestres.
6. **Despill Chroma**: Zero halos verdes residuais (#00FF00) nas bordas.
7. **Camada Pura**: Zero VFX ou fogo embutido no PNG do personagem.
8. **Integridade de Lâmina**: Proibido corte reto de espada, cauda ou bainha (lâmina inteira com ponta visível).
9. **Continuidade**: Sequência cronológica fluida seguindo os 12 princípios de animação.
10. **Sincronia Total**: Integridade das 4 pastas, `player_sprite_frames.tres` e `slash_vfx.tres`.

### 🤖 Comando de Execução da Auditoria:
```bash
python .agents/skills/character-animator/scripts/audit_sprites.py
```
- **Auto-Refinamento**: Se `Exit Code 1`, a entrega é **rejeitada** e corrigida automaticamente até atingir **100% de Aprovação (`Exit Code 0`)**.

