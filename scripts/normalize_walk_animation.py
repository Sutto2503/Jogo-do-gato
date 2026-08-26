import os
import glob
from PIL import Image

def normalize_and_animate():
    input_dir = 'assets/transparent_cats'
    out_anim_dir = 'assets/animacao_andando'
    os.makedirs(out_anim_dir, exist_ok=True)
    os.makedirs('assets/gifs', exist_ok=True)
    os.makedirs('assets/strips', exist_ok=True)

    # 1. Load the 4 primary cropped images
    raw_images = []
    for i in [1, 2, 3, 4]:
        path = f'{input_dir}/gato_samurai_{i}_cropped.png'
        if not os.path.exists(path):
            path = f'{input_dir}/gato_samurai_{i}.png'
        im = Image.open(path).convert('RGBA')
        raw_images.append((i, im))

    # Target specifications
    CANVAS_W = 350
    CANVAS_H = 380
    TARGET_CHAR_H = 330.0  # Uniform character height in pixels
    GROUND_Y = 360        # Ground contact line (feet level)
    ANCHOR_X = 175        # Horizontal center line for head/torso

    normalized_frames = []

    for idx, (num, im) in enumerate(raw_images):
        w, h = im.size
        pixels = im.load()

        # Find bounds
        y_min = None
        for y in range(h):
            for x in range(w):
                if pixels[x, y][3] > 60:
                    y_min = y
                    break
            if y_min is not None:
                break

        y_max = None
        for y in range(h - 1, -1, -1):
            for x in range(w):
                if pixels[x, y][3] > 60:
                    y_max = y
                    break
            if y_max is not None:
                break

        char_height = y_max - y_min + 1

        # Calculate Head Center X (sampling upper torso/head region)
        head_xs = []
        for y in range(y_min + 15, y_min + 75):
            for x in range(w):
                if pixels[x, y][3] > 100:
                    head_xs.append(x)
        head_center_x = sum(head_xs) / len(head_xs) if head_xs else w / 2

        # Scale calculation to make character EXACT same height
        scale = TARGET_CHAR_H / char_height
        new_w = int(round(w * scale))
        new_h = int(round(h * scale))

        # High quality resampling
        scaled_im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
        scaled_pixels = scaled_im.load()

        scaled_head_x = head_center_x * scale
        scaled_y_max = y_max * scale

        # Target placement on uniform canvas
        paste_x = int(round(ANCHOR_X - scaled_head_x))
        paste_y = int(round(GROUND_Y - scaled_y_max))

        canvas = Image.new('RGBA', (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
        canvas.paste(scaled_im, (paste_x, paste_y), scaled_im)

        normalized_frames.append(canvas)

        # Save individual normalized frame
        frame_path = f'{out_anim_dir}/gato_walk_frame_{num}.png'
        canvas.save(frame_path)

        # Also overwrite/standardize the transparent_cats folder files
        canvas.save(f'{input_dir}/gato_samurai_{num}.png')
        print(f"Normalized Gato {num}: original char_h={char_height} -> scaled char_h={TARGET_CHAR_H:.0f}, Canvas={CANVAS_W}x{CANVAS_H}")

    # 2. Build seamless walk sequence
    # Poses:
    # Frame 0: Gato 1 (passing pose / contato neutro)
    # Frame 1: Gato 2 (avanço com espada recuada)
    # Frame 2: Gato 4 (passo largo / propulsão)
    # Frame 3: Gato 3 (contato com pata estendida)
    # This forms a smooth 4-frame cycle: 1 -> 2 -> 4 -> 3 -> loop
    walk_cycle_indices = [0, 1, 2, 3] # [Gato 1, Gato 2, Gato 3, Gato 4]
    
    cycle_frames = [normalized_frames[i] for i in walk_cycle_indices]

    # 3. Generate Sprite Strip (Horizontal)
    strip_w = CANVAS_W * len(cycle_frames)
    strip = Image.new('RGBA', (strip_w, CANVAS_H), (0, 0, 0, 0))
    for i, f in enumerate(cycle_frames):
        strip.paste(f, (i * CANVAS_W, 0), f)
    
    strip_path = 'assets/strips/gato_andando_spritesheet.png'
    strip.save(strip_path)
    print(f"Saved Sprite Sheet: {strip_path} ({strip_w}x{CANVAS_H})")

    # 4. Generate Looping GIF (Perfect Infinite Loop @ 8 FPS)
    gif_path = 'assets/gifs/gato_andando_loop.gif'
    cycle_frames[0].save(
        gif_path,
        save_all=True,
        append_images=cycle_frames[1:],
        duration=130,  # ~8 FPS
        loop=0,        # Infinite loop
        disposal=2     # Clear frame before rendering next
    )
    print(f"Saved Looping GIF: {gif_path}")

    # Copy to artifacts directory
    art_dir = r'C:/Users/guisu/.gemini/antigravity/brain/3afda370-6baf-45d3-abbb-dd4808e27158'
    cycle_frames[0].save(
        os.path.join(art_dir, 'gato_andando_loop.gif'),
        save_all=True,
        append_images=cycle_frames[1:],
        duration=130,
        loop=0,
        disposal=2
    )
    for num, frame in enumerate(normalized_frames, 1):
        frame.save(os.path.join(art_dir, f'gato_samurai_{num}.png'))
    strip.save(os.path.join(art_dir, 'gato_andando_spritesheet.png'))

    # Also generate a slightly faster 10 FPS version for fast-action games
    gif_fast_path = 'assets/gifs/gato_andando_rapido.gif'
    cycle_frames[0].save(
        gif_fast_path,
        save_all=True,
        append_images=cycle_frames[1:],
        duration=95,   # ~10.5 FPS
        loop=0,
        disposal=2
    )
    cycle_frames[0].save(
        os.path.join(art_dir, 'gato_andando_rapido.gif'),
        save_all=True,
        append_images=cycle_frames[1:],
        duration=95,
        loop=0,
        disposal=2
    )

    print("All walk animations generated and saved successfully!")

if __name__ == '__main__':
    normalize_and_animate()
