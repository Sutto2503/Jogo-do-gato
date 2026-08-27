import os
os.makedirs('demo', exist_ok=True)
template = open('scratch/demo_template.txt', 'r', encoding='utf-8').read() if os.path.exists('scratch/demo_template.txt') else ''
