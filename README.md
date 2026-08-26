# 🐱⚔️ Gatinho Samurai - Animações e Jogo 2D

Projeto completo de processamento, animação e jogo interativo 2D baseado no spritesheet do **Gatinho Samurai**.

---

## 🎬 Animações Criadas (Baseadas na Imagem)

| Animação | Descrição Original | Quadros | FPS Recomendado | Arquivo GIF |
| :--- | :--- | :---: | :---: | :--- |
| **WALK MOVEMENT** | Caminhada com 6 quadros fluidos, mantendo o sabre na cintura e movimento rítmico dos pés e cauda. | 6 | 8 FPS | `assets/gifs/walk.gif` |
| **CORRIDA** | Dash / Sprint inclinado para frente em 5 quadros com efeitos de poeira e quimono ondulando. | 5 | 11 FPS | `assets/gifs/run.gif` |
| **PULO** | Ciclo de salto completo em 4 quadros: impulso inicial &rarr; salto no ar &rarr; queda &rarr; aterrissagem. | 4 | 6 FPS | `assets/gifs/jump.gif` |
| **VURN / TURN** | Transições de ângulo e postura em 4 posições: costas 3/4, frente imponente, costas e guarda posterior. | 4 | 4 FPS | `assets/gifs/turn.gif` |
| **ATTACK** | Combo de corte flamejante em 5 quadros: desembainhar katana &rarr; erguer lâmina &rarr; corte com fogo &rarr; postura final. | 5 | 10 FPS | `assets/gifs/attack.gif` |
| **SHOWCASE** | Apresentação em sequência de todas as 24 poses do personagem. | 24 | - | `assets/gifs/showcase_all.gif` |

---

## 🚀 Como Executar o Estúdio e o Jogo

Basta abrir o arquivo **`index.html`** no seu navegador de preferência (Google Chrome, Edge, Firefox, etc.) ou iniciar um servidor local:

```bash
# Iniciar servidor local
python -m http.server 8000
```
Em seguida, acesse: `http://localhost:8000`

---

## 🎮 Controles no Modo Jogo

- **Mover para os lados**: Teclas `A` e `D` ou Setas `←` e `→`
- **Pular**: Tecla `W`, `Espaço` ou `Seta ↑`
- **Correr Rápido (Sprint)**: Segure `Shift`
- **Atacar com Katana Flamejante**: Tecla `J`, `Z`, `X` ou **Clique do Mouse**
- **Suporte Mobile / Touch**: Botões na tela (Direcionais, Pulo, Dash e Ataque)

---

## 📂 Estrutura de Arquivos

```
Jogo do gatinho/
├── assets/
│   ├── frames/             # Quadros individuais PNG por animação
│   │   ├── walk/           # frame_0.png .. frame_5.png
│   │   ├── run/            # frame_0.png .. frame_4.png
│   │   ├── jump/           # frame_0.png .. frame_3.png
│   │   ├── turn/           # frame_0.png .. frame_3.png
│   │   └── attack/         # frame_0.png .. frame_4.png
│   ├── gifs/               # Animações GIF compiladas
│   ├── strips/             # Fitas horizontais de sprites (Sprite Strips)
│   ├── raw/                # Imagem original do spritesheet
│   └── animations_metadata.json # Coordenadas, taxas de FPS e descrições
├── scripts/
│   └── process_sprites.py  # Script em Python para refatiar e reprocessar
├── index.html              # Interface do Estúdio + Jogo 2D
├── style.css               # Estilização moderna temática Samurai Neo-Tokyo
├── game.js                 # Motor de animação, áudio Web Audio e física
└── README.md
```
