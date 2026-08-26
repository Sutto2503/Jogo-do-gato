import os
import json
from PIL import Image

def process_all():
    src_path = 'assets/raw/spritesheet_original.png'
    if not os.path.exists(src_path):
        print(f"Error: {src_path} not found")
        return

    sheet = Image.open(src_path).convert('RGBA')
    sheet_w, sheet_h = sheet.size

    # Precise slice configurations based on original layout
    animations = {
        'walk': {
            'label': 'Walk Movement (Caminhada)',
            'description': 'Animação de caminhada com 6 quadros fluidos, mantendo o sabre na cintura e movimento rítmico dos pés e cauda.',
            'y_start': 40,
            'y_end': 165,
            'frames_count': 6,
            'fps': 8,
            'loop': True
        },
        'run': {
            'label': 'Corrida (Dash / Sprint)',
            'description': 'Animação de corrida inclinada para frente com 5 quadros, efeito de poeira e quimono ondulando.',
            'y_start': 225,
            'y_end': 352,
            'frames_count': 5,
            'fps': 11,
            'loop': True
        },
        'jump': {
            'label': 'Pulo (Salto Completo)',
            'description': 'Ciclo de pulo com 4 quadros: preparação/impulso, ascensão com perna encolhida, queda e aterrissagem suave.',
            'y_start': 405,
            'y_end': 565,
            'frames_count': 4,
            'fps': 6,
            'loop': False
        },
        'turn': {
            'label': 'Vurn / Turn (Rotação / Postura)',
            'description': 'Transições de ângulo e postura em 4 posições: costas 3/4, frente imponente, costas outro ângulo e guarda posterior.',
            'y_start': 620,
            'y_end': 765,
            'frames_count': 4,
            'fps': 4,
            'loop': True
        },
        'attack': {
            'label': 'Attack (Golpe de Katana Flamejante)',
            'description': 'Combo de ataque em 5 quadros: sacar a lâmina, erguer com as duas mãos, corte descendente devastador com rastro de fogo e embainhar/postura final.',
            'y_start': 805,
            'y_end': 962,
            'frames_count': 5,
            'fps': 10,
            'loop': False
        }
    }

    os.makedirs('assets/frames', exist_ok=True)
    os.makedirs('assets/gifs', exist_ok=True)
    os.makedirs('assets/strips', exist_ok=True)

    metadata = {
        'character': 'Samurai Cat (Gatinho Samurai)',
        'sheet_size': {'width': sheet_w, 'height': sheet_h},
        'animations': {}
    }

    for key, cfg in animations.items():
        count = cfg['frames_count']
        y0 = cfg['y_start']
        y1 = cfg['y_end']
        h = y1 - y0
        fw = sheet_w / count

        frame_paths = []
        frames_list = []

        out_dir = f'assets/frames/{key}'
        os.makedirs(out_dir, exist_ok=True)

        strip = Image.new('RGBA', (int(round(fw)) * count, h))
        frame_data = []

        for i in range(count):
            x0 = int(round(i * fw))
            x1 = int(round((i + 1) * fw))
            frame = sheet.crop((x0, y0, x1, y1))
            
            frame_file = f'{out_dir}/frame_{i}.png'
            frame.save(frame_file)
            frame_paths.append(frame_file)
            frames_list.append(frame)

            strip.paste(frame, (i * int(round(fw)), 0))
            frame_data.append({
                'index': i,
                'x': x0,
                'y': y0,
                'width': x1 - x0,
                'height': h,
                'path': f'assets/frames/{key}/frame_{i}.png'
            })

        strip_file = f'assets/strips/{key}_strip.png'
        strip.save(strip_file)

        gif_file = f'assets/gifs/{key}.gif'
        duration_ms = int(1000 / cfg['fps'])
        
        frames_list[0].save(
            gif_file,
            save_all=True,
            append_images=frames_list[1:],
            optimize=False,
            duration=duration_ms,
            loop=0 if cfg['loop'] else 1
        )

        metadata['animations'][key] = {
            'label': cfg['label'],
            'description': cfg['description'],
            'fps': cfg['fps'],
            'duration_ms': duration_ms,
            'loop': cfg['loop'],
            'frame_count': count,
            'frame_width': int(round(fw)),
            'frame_height': h,
            'strip_path': strip_file,
            'gif_path': gif_file,
            'frames': frame_data
        }

        print(f"Processed {key}: {count} frames -> {gif_file}")

    # Generate combined GIF showcase
    showcase_frames = []
    for key in ['walk', 'run', 'jump', 'attack', 'turn']:
        cfg = metadata['animations'][key]
        for f_info in cfg['frames']:
            img = Image.open(f_info['path']).convert('RGBA')
            aspect = img.width / img.height
            new_w = int(160 * aspect)
            resized = img.resize((new_w, 160), Image.Resampling.LANCZOS)
            canvas = Image.new('RGBA', (180, 160), (14, 21, 37, 255))
            canvas.paste(resized, ((180 - new_w) // 2, 0), resized)
            showcase_frames.append(canvas)

    if showcase_frames:
        showcase_frames[0].save(
            'assets/gifs/showcase_all.gif',
            save_all=True,
            append_images=showcase_frames[1:],
            duration=120,
            loop=0
        )
        print("Generated showcase_all.gif!")

    with open('assets/animations_metadata.json', 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)
    print("Metadata saved to assets/animations_metadata.json")

if __name__ == '__main__':
    process_all()
