import os
import sys
import glob
import json
from PIL import Image
import numpy as np
from scipy import ndimage

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

# 4 níveis acima: scripts -> character-animator -> skills -> .agents -> GameProject
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))
TARGET_CANVAS = 512
TARGET_BASELINE_Y = 430
TARGET_BODY_HEIGHT = 218.0
SAFE_MARGIN = 20

ANIMATIONS = {
    "idle": { "type": "ground", "frames": 6, "fps": 4.0, "strip_name": "cat_warrior_idle.png" },
    "run": { "type": "ground", "frames": 8, "fps": 8.0, "strip_name": "cat_warrior_run.png" },
    "walk": { "type": "ground", "frames": 8, "fps": 6.0, "strip_name": "cat_warrior_walk.png" },
    "jump": { "type": "air", "frames": 5, "fps": 6.0, "strip_name": "cat_warrior_jump.png" },
    "glide": { "type": "air", "frames": 6, "fps": 5.0, "strip_name": "cat_warrior_glide.png" },
    "attack_thrust": { "type": "ground", "frames": 6, "fps": 12.0, "strip_name": "cat_warrior_attack_thrust.png" },
    "attack_slash": { "type": "ground", "frames": 4, "fps": 10.0, "strip_name": "cat_warrior_attack_slash.png" },
    "attack_combo": { "type": "ground", "frames": 8, "fps": 11.0, "strip_name": "cat_warrior_attack_combo.png" },
    "attack_spin": { "type": "spin", "frames": 8, "fps": 11.0, "strip_name": "cat_warrior_attack_spin.png" },
    "attack_downslash": { "type": "downslash", "frames": 8, "fps": 12.0, "strip_name": "cat_warrior_attack_downslash.png" },
    "skid": { "type": "ground", "frames": 4, "fps": 8.0, "strip_name": "cat_warrior_skid.png" },
    "slide": { "type": "ground", "frames": 4, "fps": 8.0, "strip_name": "cat_warrior_slide.png" },
    "turn": { "type": "ground", "frames": 4, "fps": 8.0, "strip_name": "cat_warrior_turn.png" }
}

def audit_all():
    print("=" * 80)
    print("AUDITORIA TECNICA E VISUAL DE SPRITES - GATINHO SAMURAI")
    print(f"Project Root: {PROJECT_ROOT}")
    print("=" * 80)
    
    failures = []
    warnings = []
    total_frames_inspected = 0

    for anim_name, config in ANIMATIONS.items():
        folder = os.path.join(PROJECT_ROOT, "assets", "frames", "run" if anim_name == "walk" else anim_name)
        files = sorted(glob.glob(os.path.join(folder, "*.png")))
        
        if len(files) != config["frames"]:
            failures.append(f"[{anim_name}] Quantidade incorreta de frames: esperado {config['frames']}, encontrado {len(files)}")
            
        for idx, f in enumerate(files):
            total_frames_inspected += 1
            img = Image.open(f).convert("RGBA")
            arr = np.array(img).astype(float)
            w, h = img.size
            
            # Critério 1: Resolução
            if w != TARGET_CANVAS or h != TARGET_CANVAS:
                failures.append(f"[{anim_name}_{idx}] Dimensão inválida: {w}x{h} (esperado {TARGET_CANVAS}x{TARGET_CANVAS})")
                continue
                
            alpha = arr[:, :, 3]
            nz = np.where(alpha > 15)
            if len(nz[0]) == 0:
                failures.append(f"[{anim_name}_{idx}] Frame 100% transparente ou vazio!")
                continue
                
            min_y, max_y = np.min(nz[0]), np.max(nz[0])
            min_x, max_x = np.min(nz[1]), np.max(nz[1])
            cw = max_x - min_x + 1
            ch = max_y - min_y + 1
            
            # Critério 2: Zero Clipping (Margem de segurança)
            touch_left = min_x < SAFE_MARGIN
            touch_right = max_x > (TARGET_CANVAS - SAFE_MARGIN)
            touch_top = min_y < SAFE_MARGIN
            touch_bot = max_y > (TARGET_CANVAS - SAFE_MARGIN)
            if touch_left or touch_right or touch_top or touch_bot:
                failures.append(f"[{anim_name}_{idx}] CLIPPING DETECTADO! Margem violada em X:[{min_x}, {max_x}], Y:[{min_y}, {max_y}]")
                
            # Critério 3: Zero Neighbor Invasion (Fragmentos isolados de vizinhos)
            labeled, num_features = ndimage.label(alpha > 20)
            if num_features > 1:
                sizes = ndimage.sum(alpha > 20, labeled, range(1, num_features + 1))
                sorted_sizes = sorted(sizes, reverse=True)
                if len(sorted_sizes) > 1 and sorted_sizes[1] > 120:
                    failures.append(f"[{anim_name}_{idx}] INVASAO DETECTADA! Múltiplos componentes grandes ({sorted_sizes[0]}px e {sorted_sizes[1]}px)")
                    
            # Critério 4: Escala Anatômica 1:1
            if config["type"] == "ground" and anim_name in ["idle", "run"]:
                if abs(ch - TARGET_BODY_HEIGHT) > 15:
                    warnings.append(f"[{anim_name}_{idx}] Desvio de altura corporal: {ch}px (padrão ~{TARGET_BODY_HEIGHT}px)")
                    
            # Critério 5: Ground Baseline
            if config["type"] == "ground":
                if abs(max_y - TARGET_BASELINE_Y) > 8:
                    failures.append(f"[{anim_name}_{idx}] DESALINHAMENTO DE CHAO: pés em y={max_y} (esperado y={TARGET_BASELINE_Y})")
                    
            # Critério 6: Despill de Verde
            r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
            pure_green = (g > 150) & (g > r * 1.3) & (g > b * 1.3) & (alpha > 50)
            if np.sum(pure_green) > 5:
                failures.append(f"[{anim_name}_{idx}] HALO VERDE RESIDUAL (#00FF00): {np.sum(pure_green)} pixels verdes detectados!")
                
            # Critério 7: Pureza de Camada (Sem chamas)
            fire_pixels = (r > 220) & (g > 90) & (b < 40) & (alpha > 40) & (arr[:, :, 0] - arr[:, :, 2] > 170)
            if np.sum(fire_pixels) > 250:
                warnings.append(f"[{anim_name}_{idx}] Possível efeito de fogo detectado no corpo: {np.sum(fire_pixels)} pixels")

    # 8. Sincronização Atômica das 4 Pastas
    sheets_dir = os.path.join(PROJECT_ROOT, "assets", "spritesheets")
    for anim_name, config in ANIMATIONS.items():
        sheet_file = os.path.join(sheets_dir, config["strip_name"])
        if not os.path.exists(sheet_file):
            failures.append(f"Spritesheet ausente: {config['strip_name']}")
            
    prev_dir = os.path.join(PROJECT_ROOT, "assets", "previews")
    for anim_name in ANIMATIONS.keys():
        gif_file = os.path.join(prev_dir, f"{anim_name}.gif")
        if not os.path.exists(gif_file):
            failures.append(f"GIF de preview ausente: {anim_name}.gif")
    if not os.path.exists(os.path.join(prev_dir, "showcase_combat.gif")):
        failures.append("showcase_combat.gif ausente em assets/previews/")
        
    tres_file = os.path.join(PROJECT_ROOT, "scenes", "player", "player_sprite_frames.tres")
    if not os.path.exists(tres_file):
        failures.append("player_sprite_frames.tres ausente em scenes/player/")

    vfx_tres = os.path.join(PROJECT_ROOT, "scenes", "vfx", "slash_vfx.tres")
    if not os.path.exists(vfx_tres):
        failures.append("slash_vfx.tres ausente em scenes/vfx/")

    print(f"\nTotal de frames auditados: {total_frames_inspected}")
    print(f"Falhas criticas encontradas: {len(failures)}")
    print(f"Avisos de qualidade: {len(warnings)}")
    
    if failures:
        print("\n" + "!" * 80)
        print("AUDITORIA REPROVADA (ZERO TOLERANCE). LISTA DE NAO-CONFORMIDADES:")
        print("!" * 80)
        for f in failures:
            print(f"  [X] {f}")
        return False
    else:
        print("\n" + "=" * 80)
        print("100% DOS CRITERIOS DE QUALIDADE TECNICA E VISUAL APROVADOS!")
        print("=" * 80)
        if warnings:
            print("\nAvisos informativos:")
            for w in warnings:
                print(f"  [!] {w}")
        return True

if __name__ == "__main__":
    success = audit_all()
    sys.exit(0 if success else 1)
