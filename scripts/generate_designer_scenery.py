import os
import json
import base64
from PIL import Image, ImageDraw, ImageFilter
import math

os.makedirs('assets/environment', exist_ok=True)
os.makedirs('assets/interactive', exist_ok=True)

# 1. GENERATE SACRED TORII GATE (180 x 180)
def create_torii_gate():
    im = Image.new('RGBA', (180, 180), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    
    # Top curved beam (Kasagi)
    d.polygon([(10, 25), (170, 25), (175, 12), (160, 10), (90, 16), (20, 10), (5, 12)], fill='#b91c1c')
    d.polygon([(5, 12), (175, 12), (170, 8), (10, 8)], fill='#18181b') # Black top ridge
    
    # Second beam (Nuki)
    d.rectangle([25, 42, 155, 52], fill='#dc2626')
    d.rectangle([25, 40, 155, 43], fill='#7f1d1d')
    
    # Pillars (Hashira)
    d.rectangle([40, 25, 56, 175], fill='#b91c1c')
    d.rectangle([124, 25, 140, 175], fill='#b91c1c')
    
    # Pillar highlight & shadow
    d.rectangle([40, 25, 44, 175], fill='#ef4444')
    d.rectangle([124, 25, 128, 175], fill='#ef4444')
    d.rectangle([52, 25, 56, 175], fill='#7f1d1d')
    d.rectangle([136, 25, 140, 175], fill='#7f1d1d')
    
    # Pillar base stones (Kamebara)
    d.rectangle([34, 165, 62, 178], fill='#3f3f46')
    d.rectangle([118, 165, 146, 178], fill='#3f3f46')
    
    # Tablet in center (Gakuzuka)
    d.rectangle([83, 25, 97, 43], fill='#18181b')
    d.rectangle([86, 28, 94, 40], fill='#fbbf24')
    
    im.save('assets/environment/torii_gate.png')
    print('Generated torii_gate.png')

# 2. GENERATE PAGODA TEMPLE MONUMENT (240 x 360)
def create_pagoda():
    im = Image.new('RGBA', (240, 360), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    
    # Base foundation (Stone podium)
    d.rectangle([20, 310, 220, 355], fill='#334155')
    d.rectangle([30, 312, 210, 318], fill='#64748b')
    # Stairs
    d.rectangle([90, 325, 150, 355], fill='#475569')
    d.rectangle([85, 335, 155, 355], fill='#64748b')
    d.rectangle([80, 345, 160, 355], fill='#94a3b8')
    
    # 3-Tiered Pagoda Tower
    tiers = [
        {'y_bot': 310, 'y_top': 230, 'body_w': 140, 'roof_w': 220, 'roof_y': 225},
        {'y_bot': 225, 'y_top': 150, 'body_w': 120, 'roof_w': 190, 'roof_y': 145},
        {'y_bot': 145, 'y_top': 75,  'body_w': 100, 'roof_w': 160, 'roof_y': 70}
    ]
    
    for t in tiers:
        # Body walls & columns
        bx0 = 120 - t['body_w'] // 2
        bx1 = 120 + t['body_w'] // 2
        d.rectangle([bx0, t['y_top'], bx1, t['y_bot']], fill='#7f1d1d') # Red wall
        d.rectangle([bx0 + 10, t['y_top'] + 10, bx1 - 10, t['y_bot'] - 10], fill='#fef08a') # Golden lighted window
        
        # Grid lines (Shoji)
        for gy in range(t['y_top'] + 10, t['y_bot'] - 10, 15):
            d.line([bx0 + 10, gy, bx1 - 10, gy], fill='#78350f', width=2)
        for gx in range(bx0 + 10, bx1 - 10, 18):
            d.line([gx, t['y_top'] + 10, gx, t['y_bot'] - 10], fill='#78350f', width=2)
            
        # Red Pillars
        d.rectangle([bx0, t['y_top'], bx0 + 10, t['y_bot']], fill='#b91c1c')
        d.rectangle([bx1 - 10, t['y_top'], bx1, t['y_bot']], fill='#b91c1c')
        
        # Roof (Curved oriental tiles)
        rx0 = 120 - t['roof_w'] // 2
        rx1 = 120 + t['roof_w'] // 2
        ry = t['roof_y']
        
        # Roof slope
        d.polygon([
            (rx0, ry + 15),
            (rx0 + 10, ry + 2),
            (120, ry - 14),
            (rx1 - 10, ry + 2),
            (rx1, ry + 15),
            (rx1 - 15, ry + 18),
            (120, ry),
            (rx0 + 15, ry + 18)
        ], fill='#1e293b') # Dark slate tiles
        
        # Gold roof rim
        d.line([(rx0, ry + 15), (rx0 + 10, ry + 2), (120, ry - 14), (rx1 - 10, ry + 2), (rx1, ry + 15)], fill='#f59e0b', width=3)
        
        # Hanging bells/lanterns on eaves
        d.ellipse([rx0 + 2, ry + 15, rx0 + 12, ry + 25], fill='#fbbf24')
        d.ellipse([rx1 - 12, ry + 15, rx1 - 2, ry + 25], fill='#fbbf24')

    # Spire / Finial (Sorin) on top
    d.rectangle([116, 15, 124, 65], fill='#f59e0b')
    for ring_y in range(25, 55, 6):
        d.ellipse([110, ring_y, 130, ring_y + 4], fill='#fbbf24')
    # Jewel on top
    d.polygon([(120, 5), (114, 15), (126, 15)], fill='#fef08a')
    
    im.save('assets/environment/pagoda_monument.png')
    print('Generated pagoda_monument.png')

# 3. GENERATE SAKURA CHERRY BLOSSOM TREE (220 x 200)
def create_sakura_tree():
    im = Image.new('RGBA', (220, 200), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    
    # Gnarled trunk and branches
    d.polygon([(100, 195), (115, 195), (110, 130), (125, 90), (105, 90), (95, 140)], fill='#451a03')
    d.polygon([(110, 130), (145, 100), (140, 92), (108, 120)], fill='#451a03')
    d.polygon([(100, 110), (70, 85), (65, 92), (95, 120)], fill='#451a03')
    
    # Blossom clusters (Soft layered pink/magenta/white)
    clusters = [
        (70, 70, 45, '#f472b6'), (65, 65, 38, '#fbcfe8'), (60, 60, 25, '#fff'),
        (140, 75, 50, '#f472b6'), (145, 70, 40, '#fbcfe8'), (140, 65, 26, '#fff'),
        (105, 50, 55, '#f472b6'), (105, 45, 45, '#fbcfe8'), (100, 40, 30, '#fff'),
        (45, 90, 35, '#ec4899'), (165, 95, 38, '#ec4899'), (110, 85, 40, '#f472b6')
    ]
    for cx, cy, r, color in clusters:
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)
        
    im.save('assets/environment/sakura_tree.png')
    print('Generated sakura_tree.png')

# 4. GENERATE MYSTICAL LEVITATING ISLANDS (160 x 90 and 100 x 60)
def create_floating_islands():
    # Large island
    im_lg = Image.new('RGBA', (160, 90), (0, 0, 0, 0))
    d_lg = ImageDraw.Draw(im_lg)
    
    # Top grass surface
    d_lg.polygon([(10, 25), (150, 25), (140, 35), (20, 35)], fill='#15803d')
    d_lg.polygon([(5, 20), (155, 20), (150, 26), (10, 26)], fill='#4ade80') # Lush green highlight
    
    # Rock body (Inverted jagged wedge)
    d_lg.polygon([(15, 30), (145, 30), (120, 65), (85, 85), (45, 60)], fill='#334155')
    d_lg.polygon([(15, 30), (85, 30), (85, 85), (45, 60)], fill='#475569') # Light side
    d_lg.polygon([(85, 30), (145, 30), (120, 65), (85, 85)], fill='#1e293b') # Dark side
    
    # Glowing ancient cyan runes
    d_lg.line([(50, 45), (65, 45), (60, 60), (75, 60)], fill='#06b6d4', width=3)
    d_lg.line([(95, 40), (110, 55), (100, 65)], fill='#06b6d4', width=3)
    
    # Hanging vines
    d_lg.line([(35, 30), (33, 50), (37, 65)], fill='#166534', width=2)
    d_lg.line([(125, 30), (128, 55), (124, 75)], fill='#166534', width=2)
    
    im_lg.save('assets/environment/floating_island_large.png')
    
    # Small island
    im_sm = Image.new('RGBA', (100, 60), (0, 0, 0, 0))
    d_sm = ImageDraw.Draw(im_sm)
    d_sm.polygon([(5, 16), (95, 16), (90, 24), (10, 24)], fill='#15803d')
    d_sm.polygon([(2, 12), (98, 12), (95, 17), (5, 17)], fill='#4ade80')
    d_sm.polygon([(10, 20), (90, 20), (75, 45), (50, 58), (25, 40)], fill='#334155')
    d_sm.polygon([(10, 20), (50, 20), (50, 58), (25, 40)], fill='#475569')
    d_sm.line([(35, 30), (50, 30), (45, 45)], fill='#06b6d4', width=2)
    im_sm.save('assets/environment/floating_island_small.png')
    print('Generated floating islands!')

# 5. GENERATE INTERACTIVE OBJECTS: SAVE SHRINE, GRAPPLE POINT, SCROLL, DUMMY
def create_interactives():
    # Save Shrine (Jizo/Lantern Shrine with Blue Spirit Fire)
    shrine = Image.new('RGBA', (60, 90), (0, 0, 0, 0))
    ds = ImageDraw.Draw(shrine)
    # Stone pedestal
    ds.rectangle([10, 60, 50, 85], fill='#475569')
    ds.rectangle([5, 55, 55, 62], fill='#64748b')
    # Shrine lantern box
    ds.rectangle([15, 30, 45, 55], fill='#1e293b')
    ds.rectangle([20, 35, 40, 50], fill='#0284c7') # Blue glowing inner chamber
    # Curved roof
    ds.polygon([(5, 30), (55, 30), (50, 20), (30, 15), (10, 20)], fill='#0f172a')
    # Spirit Flame
    ds.ellipse([24, 34, 36, 48], fill='#38bdf8')
    ds.ellipse([27, 37, 33, 45], fill='#fff')
    shrine.save('assets/interactive/save_shrine.png')

    # Grapple Lantern (Golden Japanese Lantern with Brass Ring)
    glantern = Image.new('RGBA', (50, 60), (0, 0, 0, 0))
    dg = ImageDraw.Draw(glantern)
    # Ring on top
    dg.ellipse([18, 2, 32, 16], outline='#f59e0b', width=3)
    # Lantern Cap
    dg.polygon([(10, 16), (40, 16), (35, 22), (15, 22)], fill='#18181b')
    # Luminous Red/Gold Core
    dg.ellipse([12, 20, 38, 46], fill='#dc2626')
    dg.ellipse([16, 24, 34, 42], fill='#fbbf24')
    dg.ellipse([20, 28, 30, 38], fill='#fff')
    # Bottom Tassel
    dg.line([(25, 46), (25, 58)], fill='#ef4444', width=3)
    glantern.save('assets/interactive/grapple_lantern.png')

    # Golden Sacred Scroll (Collectible)
    scroll = Image.new('RGBA', (40, 40), (0, 0, 0, 0))
    dsc = ImageDraw.Draw(scroll)
    dsc.rectangle([8, 12, 32, 28], fill='#fef08a')
    dsc.rectangle([5, 10, 10, 30], fill='#b45309')
    dsc.rectangle([30, 10, 35, 30], fill='#b45309')
    dsc.line([(14, 16), (26, 16)], fill='#b45309', width=2)
    dsc.line([(14, 20), (26, 20)], fill='#b45309', width=2)
    dsc.line([(14, 24), (22, 24)], fill='#b45309', width=2)
    # Red ribbon
    dsc.rectangle([18, 10, 22, 30], fill='#dc2626')
    scroll.save('assets/interactive/scroll_collectible.png')

    # Training Dummy (Bamboo / Straw Target)
    dummy = Image.new('RGBA', (50, 90), (0, 0, 0, 0))
    dd = ImageDraw.Draw(dummy)
    # Wood pole
    dd.rectangle([22, 10, 28, 88], fill='#78350f')
    # Straw body
    dd.ellipse([10, 25, 40, 75], fill='#d97706')
    # Straw head
    dd.ellipse([14, 8, 36, 30], fill='#b45309')
    # Rope bindings
    dd.line([(11, 40), (39, 40)], fill='#451a03', width=3)
    dd.line([(11, 55), (39, 55)], fill='#451a03', width=3)
    dummy.save('assets/interactive/training_dummy.png')

    # Bioluminescent Cavern Crystal (Cyan & Purple)
    crystal = Image.new('RGBA', (50, 70), (0, 0, 0, 0))
    dc = ImageDraw.Draw(crystal)
    # Big central crystal
    dc.polygon([(25, 5), (35, 25), (32, 65), (18, 65), (15, 25)], fill='#06b6d4')
    dc.polygon([(25, 5), (35, 25), (32, 65), (25, 65)], fill='#22d3ee') # Highlight
    # Side crystals
    dc.polygon([(10, 25), (18, 35), (16, 65), (6, 65)], fill='#8b5cf6')
    dc.polygon([(38, 20), (46, 32), (42, 65), (32, 65)], fill='#a855f7')
    crystal.save('assets/interactive/mystic_crystal.png')
    
    print('Generated interactive objects!')

create_torii_gate()
create_pagoda()
create_sakura_tree()
create_floating_islands()
create_interactives()
