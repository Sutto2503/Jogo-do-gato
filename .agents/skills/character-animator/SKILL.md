---
name: character-animator
description: >-
  Lead 2D Character Animator & Sprite Pipeline Engineer for 'Gatinho Samurai: Ecos Místicos'.
  Specialized in 2D animation fluidity, 12 principles of animation, combat keyframing,
  AI chroma key generation (#00FF00), frame extraction pipelines, uniform 1:1 scale anchoring,
  mandatory auto-generation of spritesheets & previews, and seamless state transitions in Godot 4.
---

# 🎭 Character Animator: Cat Samurai & Metroidvania Pipeline

Governs **visual quality, Style DNA, invariant scale, combat timing, multi-entity hierarchies, Godot 4 hitboxes, and automated asset delivery**.

---

## 🎨 Style DNA & Canonical Color Registry

To enforce absolute visual continuity and eliminate chromatic drift across all AI generations:

| Hex Code | Color Name | Anatomical / Equipment Application |
| :--- | :--- | :--- |
| **`#E67E22`** | **Warm Amber Orange** | Primary ginger feline fur base (head, limbs, body, tail). |
| **`#FDFEFE`** | **Pearl White** | Secondary fur highlights: muzzle, underbelly, chest tuft, paw tips. |
| **`#D4AC0D`** | **Luminous Amber Gold**| Expressive feline irises, katana guard (*tsuba*), scabbard fittings. |
| **`#1C2833`** | **Obsidian Charcoal** | Ronin *gi* / kimono fabric, dark armor plating, scabbard body. |
| **`#C0392B`** | **Crimson Red** | Flowing *hachimaki* headband, scarf, armor cord laces (*odoshi*). |
| **`#27AE60`** | **Mystic Jade Green** | Spirit talisman bead, amulet core, mystical accessories. |
| **`#BDC3C7`** | **Folded Steel Silver** | Katana razor blade, *hamon* temper line, metallic rivets & buckles. |
| **`#78281F`** | **Oxblood Cordovan** | Leather strapping, sandal cords (*waraji*), scabbard accents. |

> **Mandatory AI Prompt Template Prefix:**
> `"2D HD hand-drawn sprite of an anthropomorphic ginger cat samurai, master ronin feline warrior, vibrant #E67E22 warm orange fur with #FDFEFE pearl white muzzle and chest, luminous #D4AC0D amber eyes, wearing #1C2833 obsidian dark ronin kimono, flowing #C0392B crimson red scarf, carrying a sharp #BDC3C7 steel katana with #D4AC0D gold guard, #27AE60 jade spirit charm, crisp clean 2D vector-like ink outlines, solid flat #00FF00 pure green background, high-contrast studio chroma lighting, zero background bleed, no realistic photographic textures, no baked light/fire VFX"`

---

## ⏱️ Animation Timing Chart & Smear Principles

| Phase | Duration / Ratio | Keyframe Dynamics & Engine Rules |
| :--- | :--- | :--- |
| **1. Wind-up (Anticipation)** | **~25%** of cycle | Extreme pose compression, center-of-mass drop, blade pulled back. |
| **2. Active Smear (Hit Frame)**| **Exactly 1 Frame** (~16–33ms) | Peak kinetic velocity; blade & limbs stretch along the motion vector arc. |
| **3. Hitstop (Impact Freeze)** | **3–5 Frames** pause (~50–83ms)| Visual pause on target contact for tactile weight and punch feel. |
| **4. Follow-Through & Settling**| **~40%** of cycle | Weapon overshoots target; cloth, scabbard, and tail settle with secondary wave physics. |
| **5. Aerial Micro-Stall** | **0.08s** (~5 frames) | Momentary gravity dampening (`velocity.y *= 0.1`) during aerial attacks for juggle combos. |

---

## 📐 Multi-Entity Asset Tiers & Spatial Invariants

Foot contact is anchored at normalized ground ratio $R_{\text{ground}} \approx 0.840$ ($y_{\text{base}} \approx 0.84 \times H$):

| Tier & Archetype | Canvas ($W \times H$) | Anatomical Height | Ground Baseline | Safe Margins | Spatial Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 0: Props / Objects** | `256 x 256 px` | Variable (`80-220px`) | `y = 215 px` ($\pm 2\text{px}$) | $[10, 246]$ | Static/destructible level assets. |
| **Tier 1: Small Minions** | `384 x 384 px` | `~140 px` ($\pm 5\text{px}$) | `y = 320 px` ($\pm 2\text{px}$) | $[16, 368]$ | Fast swarm enemies, compact hurtboxes. |
| **Tier 2: Player (Cat Samurai)**| `512 x 512 px` | `~218 px` ($\pm 5\text{px}$) | `y = 430 px` ($\pm 2\text{px}$) | $[20, 492]$ | Core benchmark; governs katana arcs. |
| **Tier 3: Elite Ronin** | `512 x 512 px` | `~240 px` ($\pm 8\text{px}$) | `y = 430 px` ($\pm 2\text{px}$) | $[20, 492]$ | Duelists slightly taller for readability. |
| **Tier 4: Colossal Yokai Bosses**| `768x768 / 1024x1024`| `~450-600 px` | `y = 650 / 860 px` | $\ge 30\text{px}$ margin | Screen-filling multi-segment bosses. |

---

## ⚔️ Godot 4 Collision & Hitbox Synchronization Protocol

* **Player Physics Hull (`CollisionShape2D`)**: `CapsuleShape2D(radius=16px, height=54px)` at local offset `Vector2(0, -27)` (anchors base at `y=0`). Layers: `collision_layer=2` (Player), `collision_mask=5` (World + Hazards).
* **Decoupled Combat Sync (`AttackArea2D` + `SlashVFX`)**:
  * **Ground Slash**: `SlashVFX` offset `(±28, -27)` $\leftrightarrow$ `AttackArea2D` offset `(±25, -27)`, `Rect(84x84)`. Active frames 2–4.
  * **Spin Finisher**: `SlashVFX` offset `(0, -27)` $\leftrightarrow$ `AttackArea2D` `Circle(r=48)`. Active at 360° apex.
  * **Downslash**: `SlashVFX` offset `(0, 5)` $\leftrightarrow$ `AttackArea2D` offset `(0, 10)`, `Rect(64x72)`. Active dive phase.
  * `AttackArea2D.monitoring = false` by default; toggles `true` strictly during active impact frames.

---

## 🥇 Approach 1: AI Generation Standard & Anti-Truncation

1. **Ultra-Wide Strips (16:9 / 21:9)**: Maximum 4 characters per sheet with wide empty chroma margins.
2. **Duo-Frame Pairs (1:1)**: 2 characters per sheet with $>500\text{px}$ clearance.
3. **Morphological Extraction**: `ndimage.binary_dilation` + `ndimage.label` to isolate the complete character cluster with uncut weapons.

---

## 🔄 Mandatory 4-Folder Delivery Pipeline & Tools

Every sprite modification MUST atomically synchronize:
1. **`assets/frames/<anim>/`**: Transparent PNGs (`<anim>_0.png` .. `<anim>_N.png`).
2. **`assets/spritesheets/`**: Strip PNGs and `cat_warrior_atlas.json`.
3. **`assets/previews/`**: Animated GIFs and `showcase_combat.gif`.
4. **`scenes/player/`**: Godot 4 `player_sprite_frames.tres` resource.
5. **Interactive Review Tool**: Use [`tools/sprite_viewer.html`](file:///c:/Work/GameProject/tools/sprite_viewer.html) for visual inspection, onion skinning, scrubber, and baseline alignment.

---

## 🛡️ Quality Assurance: Auditor Subagent (QA Gatekeeper)

### 🔍 10 Strict Acceptance Criteria (Zero Tolerance):
1. **Resolution**: 100% of frames exactly $512 \times 512\text{ px}$.
2. **Zero Clipping**: Margins $\ge 20\text{ px}$ on all 4 boundaries ($[20, 492]$).
3. **Zero Neighbor Invasion**: 0% pixels from adjacent sprites.
4. **1:1 Scale**: Standing body height $\approx 218\text{ px}$ ($\pm 5\text{px}$).
5. **Ground Baseline**: Feet anchored at $y = 430\text{ px}$ ($\pm 2\text{px}$) on ground poses.
6. **Chroma Despill**: Zero residual green halos (#00FF00).
7. **Pure Rig Layer**: Zero VFX/fire baked into character PNG.
8. **Weapon Integrity**: Zero flat amputations on katana blades, tails, or scabbards (full conical tip visible).
9. **Motion Continuity**: Seamless chronological vector following 12 principles.
10. **Atomic Sync**: Full integrity across 4 folders, `player_sprite_frames.tres`, and `slash_vfx.tres`.

### 🤖 Verification Command:
```bash
python .agents/skills/character-animator/scripts/audit_sprites.py
```
