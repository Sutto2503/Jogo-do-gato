# 🐱 Frente 1: Design de Personagens, NPCs e Inimigos

Documento mestre de planejamento e especificações visuais, comportamentais e de balanceamento para o elenco de **Gatinho Samurai: Ecos Místicos**.

---

## 1. ⚔️ Protagonista: Gato Samurai (Hero Character)

### 🎨 Identidade Visual
- **Espécie / Raça**: Felino Guerreiro Samurai de pelagem clara com máscara/olhos expressivos e orelhas alertas.
- **Vestimenta**: Quimono tradicional com haori e capa esvoaçante que responde à física do vento e velocidade.
- **Armamento**: Katana ancestral herdada dos Mestres do Templo.

### 🎬 Suíte Completa de Animações
| Animação | Frames | FPS | Descrição & Game Feel |
|---|:---:|:---:|---|
| **Idle HD** | 6 | 5 | Respiração rítmica, cauda suave, piscar de olhos e foco sereno |
| **Walk HD** | 8 | 10 | Caminhada disciplinada com passing positions precisas |
| **Run HD** | 8 | 12 | Corrida rápida com inclinação do torso e flutter da capa |
| **Jump HD** | 5 | 6 | Crouch -> Leap -> Apex Tuck -> Fall -> Landing amortecido |
| **Turn HD** | 4 | 3 | Rotação 360° em alta definição sem cortes |
| **Skid / Brake** | 4 | 10 | Derrapagem de pés ao inverter bruscamente a direção da corrida |
| **Slide / Dash** | 4 | 10 | Deslize aerodinâmico rente ao solo com rastro translúcido |
| **Attack Combo 1-2-3** | 4 | 12 | Três talhos fluidos em arco com efeito de lâmina luminosa (*slash trail*) |
| **Downslash (Pogo)** | 3 | 12 | Corte vertical para baixo com recuperação de salto no impacto |
| **Wall Cling / Slide** | 3 | 8 | Fixação de garras na parede com partículas de poeira vertical |
| **Grapple Pull** | 4 | 14 | Postura de recolhimento em arco em alta velocidade puxado pelo gancho |
| **Glider Fall** | 4 | 6 | Abertura do quimono/tecido com ondulação suave sustentada pelo vento |

---

## 2. 🦎 Inimigos Comuns e Elites (Mob Roster)

### 🦎 2.1 Bandido Iguana Ronin (Tier 1 Melee)
- **Papel**: Inimigo básico de patrulha terrestre e emboscada.
- **Arma**: Adaga curta curvada (*Tanto*).
- **Vida (HP)**: 45 HP (2 a 3 golpes básicos de katana).
- **Dano Causado**: 12 HP (ou 1 Máscara de Dano).
- **Ciclo de IA**:
  1. `Patrol`: Caminhada rasteira cadenciada até encontrar a borda da plataforma ou obstáculo.
  2. `Alert`: Ao detectar o jogador em seu cone de visão frontal de 120° (raio 160px), exibe ponto de exclamação/olhar aguçado (0.3s).
  3. `Lunge Slash`: Arrancada rápida com golpe horizontal perfurante.
  4. `Recovery`: Pausa de 1.2s vulnerável a contra-ataque.
  5. `Hurt & Death`: Recuo com sangue de tinta espiritual e dissipação em fumaça estilo arcade.

### 🦇 2.2 Corvo Tengu / Morcego dos Penhascos (Tier 1 Flying)
- **Papel**: Inimigo voador de pressão aérea.
- **Vida (HP)**: 25 HP (1 a 2 golpes ou 1 ataque aéreo).
- **Dano Causado**: 10 HP.
- **Comportamento**: Voo senoidal constante acima de plataformas e mergulho rápido (*dive attack*) ao detectar o jogador abaixo.

### 🛡️ 2.3 Guarda de Elite Iguana com Escudo de Bambu Reforçado (Tier 2 Elite)
- **Papel**: Inimigo de defesa que bloqueia ataques frontais normais.
- **Mecânica de Superação**: Exige pular por trás (*vaulting*) ou quebrar o escudo com ataque carregado ou *Downslash*.

---

## 3. 👑 Chefes de Setor (Boss Design)

### 👑 Senhor da Guerra Iguana (Chefe do Ato 1)
- **Nome**: Senhor da Guerra Iguana (*Iguana Warlord Chief*).
- **Arena**: Pátio da Grande Pagoda Vermelha (delimitado por barreiras espirituais).
- **Escala**: `1.5x` a escala padrão do jogador.
- **Armamento**: Grande Espada *Ōdachi* de duas mãos e colete de guerra *Jinbaori* carmesim.
- **Vida (HP)**: 280 HP (em duas fases distintas com barra de postura / stagger).

#### Fases de Combate:
1. **Fase 1 (100% a 50% HP)**:
   - *Grande Arco Horizontal*: Balanço lento e telegrafado da Ōdachi com alcance frontal de 180°.
   - *Impacto Sísmico Terrestre*: Golpe vertical no solo que lança uma onda de choque rasteira em ambas as direções.
   - *Recuo e Guarda*: Salto para trás defensivo ao sofrer dano contínuo.
2. **Fase 2 (Abaixo de 50% HP - Fúria Espiritual)**:
   - A armadura brilha em tom âmbar e os olhos ardem.
   - *Dash Thrust Veloz*: Investida em linha reta atravessando metade da arena com a ponta da lâmina.
   - *Chuva de Adagas Espirituais*: Salto ao topo da tela e disparo de adagas em leque contra o chão.
   - Janela de recuperação reduzida de 1.2s para 0.6s.

---

## 4. 🧓 NPCs Aliados & Sistema de Diálogos / Quests

### 🐱 4.1 Mestre Ancião Jin
- **Localização**: Entrada da Vila dos Samurais.
- **Tom de Voz Sintetizado**: Pitch grave (0.85).
- **Papel de Narrativa**: Guardião das tradições ancestrais e mentor do protagonista.
- **Quest Principal**: *"O Chamado dos Espíritos"*
  - Objetivo: Coletar as 2 Chaves de Espírito (*Keystones*) escondidas na Vila e no Rio para destravar o Portão Rúnico.
  - Recompensa: Fragmento de Máscara Sagrada (+20 HP de vida máxima permanente).

### 😼 4.2 Ferreira Kumi
- **Localização**: Forja do Santuário Central da Vila.
- **Tom de Voz Sintetizado**: Pitch ágil/metálico (1.25).
- **Papel de Narrativa**: Engenheira espiritual e artífice de amuletos.
- **Mecânica Associada**: Permite forjar novos talismãs e expandir os slots (*Notches*) de amuletos.

### 😾 4.3 Explorador Ren
- **Localização**: Prisão / Ruínas Subterrâneas atrás da parede destrutível.
- **Tom de Voz Sintetizado**: Pitch enérgico (1.05).
- **Quest Principal**: *"Resgate na Escuridão"*
  - Objetivo: Destruir a parede fraturada e libertar Ren.
  - Recompensa: Amuleto do Passo Fantasma (*Shadow Dash*).
