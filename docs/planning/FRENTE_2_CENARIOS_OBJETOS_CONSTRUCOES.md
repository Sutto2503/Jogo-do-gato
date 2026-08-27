# 🏯 Frente 2: Planejamento de Cenários, Objetos e Construções

Documento mestre de arquitetura de mundo, arte ilustrada HD, camadas de *Parallax2D*, estruturas cenográficas e objetos interativos para **Gatinho Samurai: Ecos Místicos**.

---

## 1. 🗺️ Estrutura Geral do Mapa & Setores Interconectados

O mundo do jogo é estruturado em **4 Grandes Setores** integrados de forma orgânica, combinando arte 4K ilustrada com colisões estáticas precisas e camadas de profundidade visual:

```
[ Setor 1: Vila & Pagoda ] ──► [ Setor 2: Ponte & Rio ] ──► [ Setor 3: Penhascos ]
            │                                                      │
            └──────────────────────► [ Setor 4: Ruínas Subterrâneas ]
```

---

## 2. 🎨 Detalhamento dos Setores Cenográficos

### 🌸 2.1 Setor 1: Vila dos Samurais & Grande Pagoda Vermelha
- **Atmosfera Visual**: Vilarejo feudal pacífico ao crepúsculo, árvores de cerejeira centenárias floridas e telhados curvados em telha escura e madeira nobre.
- **Construções Principais**:
  1. **Casas Tradicionais de Madeira (3 construções)**: Beirais e cumeeiras escaláveis como plataformas *one-way* (possibilitam pular por baixo e descer com `S + Pulo`).
  2. **Grande Pagoda Vermelha (3 Andares + Espira Superior)**: Marco visual monumental com lanternas rúnicas penduradas em cada sacada para impulso de gancho.
- **Camadas de Profundidade (Parallax2D)**:
  - `Layer -3 (Céu Crepuscular)`: Gradiente púrpura/dourado com montanhas distantes e névoa lenta (`scroll_scale: 0.1, 0.05`).
  - `Layer -2 (Silhuetas da Floresta de Bambu)`: Bambuzais ao fundo em tom índigo suave (`scroll_scale: 0.3, 0.15`).
  - `Layer -1 (Casas em Segundo Plano & Cerejeiras)`: Edifícios secundários com janelas iluminadas (`scroll_scale: 0.6, 0.4`).
  - `Layer 0 (Playfield / Colisão)`: Casas principais, solo gramado e pagoda com iluminação direta (`scroll_scale: 1.0, 1.0`).
  - `Layer +1 (Primeiro Plano)`: Galhos com flores de cerejeira e lanternas desfocadas em bokeh (`scroll_scale: 1.25, 1.15`).

---

### 🌊 2.2 Setor 2: Grande Ponte Ancestral de Pedra & Rio Sagrado
- **Atmosfera Visual**: Garganta rochosa cortada por um rio profundo e cristalino, iluminado por reflexos de água e lanternas de pedra flutuantes.
- **Construções Principais**:
  1. **Ponte de Arcos de Pedra Maciça**: Colisão sólida exata sobre o rio, decorada com anéis de ferro fundido para travessia aérea com gancho.
  2. **Portão Rúnico Ancestral (Keystone Gate)**: Barreira de energia espiritual de 160px de altura que exige 2 Chaves de Espírito para ser dissolvida.
  3. **Plataformas Flutuantes de Lótus**: Flores gigantescas que brotam na superfície d'água.

---

### ⛰️ 2.3 Setor 3: Penhascos Místicos & Fenda dos Ventos
- **Atmosfera Visual**: Paredões de rocha calcária cinzelada pelo vento, nuvens baixas e fendas verticais que conduzem às alturas.
- **Construções & Elementos**:
  1. **Paredes Verticais de Escalada**: Superfícies propícias para *Wall-Slide* e saltos alternados (*Wall-Jump*).
  2. **Plataformas de Pedra Flutuantes com Levitação Mística**: Três monólitos que oscilam verticalmente em fases senoidais harmônicas (`baseY: 880, 660, 440`).
  3. **Fenda de Vento Ascendente**: Região com corrente de ar que permite ao jogador voar alto com o Quimono Planador.
  4. **Espíritos Wisps Luminosos**: Esferas de chakra pairando no ar que servem como ponto de apoio e recarga de pulo duplo.

---

### 🕳️ 2.4 Setor 4: Ruínas Subterrâneas & Tubulações Antigas
- **Atmosfera Visual**: Caverna subterrânea de mineração esquecida, com tubulações de ferro oxidado e fungos bioluminescentes.
- **Construções & Elementos**:
  1. **Paredes Destrutíveis Fraturadas**: Paredes de pedra rachadas com runas brilhantes que cedem a 2 golpes de katana.
  2. **Cogumelos Bioluminescentes (Pogo)**: Fungos gigantescos elásticos (verde, ciano e roxo) que impulsionam o jogador a grandes alturas ao receber um *Downslash*.
  3. **Tubulações Industriais Antigas**: Estruturas de ferro que servem de rota alternativa e esconderijo de segredos.

---

## 3. 📦 Catálogo de Objetos Interativos & Sprites (Props)

| Prop / Objeto | Comportamento Físico | Efeito Sonoro & Visual |
|---|---|---|
| **Lanternas de Gancho** | Ponto de atração para o gancho; brilha e emite partículas ao ser focada | Som de sino de vento / faíscas de chakra |
| **Plataformas de Lótus Efêmeras** | Sólida ao pousar; pétalas tremem e desabam após 1.2s; renasce após 3.0s | Brilho floral róseo e som de folhas |
| **Santuário de Meditação** | Interação com `E`; acende a chama, cura vida/alma e salva o jogo | Som harmônico de Koto e sinos zen |
| **Chaves de Espírito (Keystones)** | Coletável flutuante com rotação suave e pulsação luminosa | Som de prisma cristalino e clarão dourado |
| **Pergaminhos Antigos (Lore/Skills)** | Coletável secreto escondido nos telhados e cavernas | Som de pergaminho desenrolando |
| **Paredes Quebráveis** | Recebe 2 hits; fratura no primeiro golpe e esfarela em pedregulhos no segundo | Impacto pesado de pedra quebrando e poeira |
| **Cogumelo Pogo** | Amortece queda e impulsiona o jogador com força de `-18.0` a `-19.0` | Som de mola orgânica e deformação de malha |
