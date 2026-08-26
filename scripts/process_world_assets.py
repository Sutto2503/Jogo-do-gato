import os
from PIL import Image, ImageEnhance, ImageFilter

def process_world_assets():
    src = 'assets/environment/metroidvania_world_art.png'
    if not os.path.exists(src):
        print(f"Error: {src} not found")
        return

    im = Image.open(src).convert('RGBA')
    w, h = im.size
    print(f"Original art size: {w}x{h}")

    # Generate 4K Ultra-Res High-Definition World Map (3840 x 2145)
    # Using high-quality Lanczos resampling
    target_w = 3840
    target_h = int(round(3840 * (h / w)))
    world_4k = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Slight contrast and vibrancy enhancement for Ori/Nine Sols glow
    enhancer = ImageEnhance.Color(world_4k)
    world_4k = enhancer.enhance(1.08)
    enhancer_con = ImageEnhance.Contrast(world_4k)
    world_4k = enhancer_con.enhance(1.05)
    
    world_4k_path = 'assets/environment/world_map_4k.png'
    world_4k.save(world_4k_path, optimize=True)
    print(f"Saved 4K World Map: {world_4k_path} ({target_w}x{target_h})")

    # Crop individual modular sectors and assets
    # 1. Sector 1: Village & Pagoda (x: 0..520, y: 150..572 in original)
    village = im.crop((0, 140, 510, h))
    village.save('assets/environment/sector_village_pagoda.png')

    # 2. Sector 2: Bridge & Sacred River (x: 460..710, y: 340..572 in original)
    bridge_river = im.crop((460, 340, 710, h))
    bridge_river.save('assets/environment/sector_bridge_river.png')

    # 3. Sector 3: Floating Stones & Spirit Wisps (x: 620..770, y: 100..360)
    wisps = im.crop((620, 100, 760, 350))
    wisps.save('assets/environment/sector_spirit_wisps.png')

    # 4. Sector 4: Mountain Cliff & Bioluminescent Overhang (x: 700..1024, y: 0..572)
    cliff = im.crop((700, 0, w, h))
    cliff.save('assets/environment/sector_cliff_caverns.png')

    # 5. Subterranean Pipes & Foundations (x: 0..1024, y: 460..572)
    pipes = im.crop((0, 450, w, h))
    pipes.save('assets/environment/subterranean_pipes.png')

    # 6. Sky & Mountain Parallax Background (x: 0..1024, y: 0..300)
    sky = im.crop((0, 0, w, 320))
    sky.save('assets/environment/twilight_sky_bg.png')

    print("All sector assets processed successfully!")

if __name__ == '__main__':
    process_world_assets()
