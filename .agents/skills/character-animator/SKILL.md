---
name: character-animator
description: >-
  Lead 2D Character Animator & Sprite Pipeline Engineer for 'Gatinho Samurai: Ecos Místicos'.
  Specialized in 2D animation fluidity, 12 principles of animation, combat keyframing,
  AI chroma key generation (#00FF00), frame extraction pipelines, uniform 1:1 scale anchoring,
  mandatory auto-generation of spritesheets & previews, and seamless state transitions in Godot 4.
---

# 🎭 Character Animator: Cat Samurai

Governs **visual quality, invariant 1:1 anatomical scale, combat fluidity, and automated asset delivery** for sprites in **Godot 4**.

---

## 📐 Technical Invariants & Global Metrics

| Parameter | Mandatory Value | Specification / Rule |
| :--- | :--- | :--- |
| **Universal Canvas** | `512 x 512 px` | All exported frames must be transparent PNG $RGBA$. |
| **1:1 Anatomical Scale**| `~218 px` ($\pm 5\text{px}$) | Body height (feet to ear tip in idle/standing) remains constant across all poses. |
| **Ground Baseline** | `y = 430 px` ($\pm 2\text{px}$) | Vertical foot contact anchor for all grounded poses. |
| **Anti-Clipping Bounds**| `x, y ∈ [20, 492]` | Visible pixels must stay inside safe margins ($\ge 20\text{px}$ free border clearance). |
| **Chroma Key & Despill**| `#00FF00` | Pure green background with $0.90\times$ edge despill. |
| **VFX Architecture** | **Decoupled** | Character PNG contains ONLY feline anatomy + physical steel katana. Slashes/fire reside in `assets/vfx/`. |

---

## 🥇 Approach 1: AI Sprite Generation Standard

To prevent truncated katanas, sleeves, or tails (*zero truncation*):
1. **Ultra-Wide Strips (16:9 / 21:9)**: Maximum 4 characters per image with large empty chroma gaps between figures.
2. **Duo-Frame Pairs (1:1)**: 2 characters per image, ensuring $>500\text{px}$ free clearance around each silhouette.
3. **Morphological Extraction**: Isolate the unified character cluster (`ndimage.binary_dilation` + `ndimage.label`) to preserve long extended weapons without cutting (*Zero Neighbor Intrusion*).

---

## 🔄 Mandatory 4-Folder Delivery Pipeline (Atomic Sync)

Every sprite modification MUST atomically synchronize:

| Target Directory | Generated Content | Format / Engine Target |
| :--- | :--- | :--- |
| **`1. assets/frames/<anim>/`** | Isolated sequential frames | Transparent PNG $RGBA$ (`<anim>_0.png` .. `<anim>_N.png`) |
| **`2. assets/spritesheets/`** | Horizontal strips + Master Atlas | `<character>_<anim>.png` and `cat_warrior_atlas.json` |
| **`3. assets/previews/`** | Animated GIF previews | `<anim>.gif` (loop=0) and `showcase_combat.gif` |
| **`4. scenes/player/`** | Godot 4 Resource | `player_sprite_frames.tres` (Synchronized FPS and frame lists) |

---

## 🛡️ Quality Assurance: Auditor Subagent (QA Gatekeeper)

No batch can be delivered without formal approval from the **Auditor Subagent**.

### 🔍 10 Strict Acceptance Criteria (Zero Tolerance):
1. **Resolution**: 100% of frames exactly $512 \times 512\text{ px}$.
2. **Zero Clipping**: Free margin $\ge 20\text{ px}$ on all 4 boundaries ($[20, 492]$).
3. **Zero Neighbor Invasion**: 0% pixels from adjacent sprites (isolated unified cluster).
4. **1:1 Scale**: Standing body height $\approx 218\text{ px}$ ($\pm 5\text{px}$).
5. **Ground Baseline**: Feet anchored at $y = 430\text{ px}$ ($\pm 2\text{px}$) on ground poses.
6. **Chroma Despill**: Zero residual green halos (#00FF00) on perimeter.
7. **Pure Rig Layer**: Zero VFX/fire baked into character PNG.
8. **Weapon Integrity**: Zero flat amputations on katana blades, tails, or scabbards (full conical blade tip visible).
9. **Motion Continuity**: Seamless chronological vector following the 12 principles of 2D animation.
10. **Atomic Sync**: Full integrity across all 4 pipeline folders, `player_sprite_frames.tres`, and `slash_vfx.tres`.

### 🤖 Audit Execution Command:
```bash
python .agents/skills/character-animator/scripts/audit_sprites.py
```
- **Self-Refinement Loop**: If `Exit Code 1`, delivery is **automatically rejected** and auto-corrected until **100% Approval (`Exit Code 0`)** is achieved before commit or notification.


