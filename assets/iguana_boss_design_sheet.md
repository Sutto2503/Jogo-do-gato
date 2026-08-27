# 👑 Ficha Técnica de Design: Senhor da Guerra Iguana (Iguana Warlord Boss)

Documento oficial de especificações visuais, arquitetura de combate, inteligência artificial e suíte de animação para o **Chefe Inicial (Chefe da Vila das Iguanas)**.

---

## 1. 📖 Perfil & Visão Geral

| Atributo | Especificação Técnica |
|---|---|
| **Nome do Chefe** | Senhor da Guerra Iguana (*Iguana Warlord Chief*) |
| **Título em Tela** | *Comandante da Vila das Iguanas / O Flagelo dos Pântanos* |
| **Tier / Categoria** | Chefe Inicial de Mundo / Ato 1 (*World Boss Tier 1*) |
| **Escala / Proporção** | `1.5x` a escala do jogador e dos lacaios (Silhueta dominante e intimidadora) |
| **Arma Principal** | Grande Espada Samurai (*Ōdachi / Nodachi*) de duas mãos com lâmina colossal curvada |
| **Armadura** | Colete de Guerra (*Jinbaori*) Carmesim Nobre com bordados dourados, placas *sode* nos ombros e cordas *shimenawa* |

---

## 2. 🎨 Guia Visual & Paleta Cromática

```
               [ Crista / Armadura de Ombro ]
               #34482B (Verde Musgo Escuro)
               #24292F (Ferro Laqueado Escuro)
                          │
         ┌────────────────┴────────────────┐
         │                                 │
   [ Escamas Base ]                [ Olhos & Cicatriz ]
   #4E6B41 (Verde Esmeralda)       #FFB703 (Âmbar Flamejante)
   #6B8F58 (Realce Muscular)       #8B263E (Cicatriz de Duelo)
         │                                 │
         └────────────────┬────────────────┘
                          │
               [ Jinbaori & Cerimonial ]
               #B82A38 (Carmesim Nobre / Vermelho Imperial)
               #E8B931 (Bordados & Brasão em Ouro)
               #FAF0CA (Cordas Cerimoniais Shimenawa)
               #1A1C20 (Hakama de Batalha Reforçado)
                          │
               [ Lâmina da Grande Ōdachi ]
               #E8ECEF (Aço Acetinado de Alta Resolução)
               #7F8C99 (Linha de Têmpera / Hamon)
```

---

## 3. ⚔️ Estatísticas de Combate & Fases

| Atributo | Valor | Descrição |
|---|:---:|---|
| **Pontos de Vida (HP)** | `280 HP` | Dividido visualmente em 2 segmentos de barra de vida |
| **Resistência a Postura (Stagger)** | `60 PTS` | Atordoado por 2.0s após sofrer golpes contínuos ou parries |
| **Velocidade de Deslocamento** | `50 px/s` (Fase 1) / `85 px/s` (Fase 2) | Caminhada imponente de intimidação |
| **Velocidade de Dash Thrust** | `260 px/s` | Arrancada rápida com a ponta da espada |
| **Alcance de Ataque Normal** | `120 px` | Amplo arco frontal de 180° com a Ōdachi |

---

## 4. 🥋 Padrões de Ataque & Telegrafia

### Fase 1: Domínio da Lâmina (100% - 50% HP)

| Ataque | Startup (Aviso) | Dano | Efeito | Janela de Punição / Esquiva |
|---|:---:|:---:|---|---|
| **Heavy Wide Slash** | 0.40s (Ergue a espada para trás) | `18 DMG` | Corte horizontal cobrindo 180° à frente | Pular ou rolar através do golpe |
| **Overhead Ground Slam** | 0.60s (Ergue a espada acima da cabeça) | `25 DMG` | Impacto no chão que gera onda de choque (32px) | Rolar para as costas do chefe durante o windup |
| **Tail Sweep (Anti-Flanco)** | 0.25s (Contrai o quadril) | `14 DMG` | Giro de 180° na retaguarda com a cauda | Acionado quando o jogador passa > 1.2s nas costas |

### Fase 2: Fúria Desperta / Enrage (< 50% HP)
> *Ao atingir 50% de HP, o chefe ruge (Roar), emitindo uma onda de repulsão inofensiva. Seus olhos brilham intensamente e ele ganha 25% de velocidade de animação.*

| Ataque Especial | Startup (Aviso) | Dano | Efeito | Como Responder |
|---|:---:|:---:|---|---|
| **Charging Dash Thrust** | 0.35s (Postura horizontal baixa) | `22 DMG` | Investida em linha reta que cruza 200px da arena | Pulo cronometrado para desferir ataque aéreo |
| **Leap Shockwave Slam** | 0.50s (Agachamento e salto alto) | `30 DMG` | Queda esmagadora com ondas de choque para ambos os lados | Pulo no momento exato do impacto com o solo |
| **3-Hit Heavy Combo** | 0.30s (Grito de guerra) | `15+15+28 DMG` | Sequência: Corte Lateral -> Corte Ascendente -> Cravação | Esquivar dos dois primeiros e punir na recuperação da cravação |

---

## 5. 🎞️ Matriz de Animações (Padrão 384x384 px)

*Devido à envergadura da espada gigante Ōdachi e proporção 1.5x do chefe, a célula recomendada para o atlas deste boss é **384 x 384 px** (ou **512 x 512 px**).*

| Animação | Frames | FPS Recomendado | Duração | Descrição |
|---|:---:|:---:|:---:|---|
| **Idle / Stance** | 6 | 6 FPS | 1.00s | Respiração pesada, movimento do peitoral, olhos fixos e ponta da espada em guarda |
| **Walk / Stalk** | 8 | 8 FPS | 1.00s | Passos pesados e firmes segurando a espada com as duas mãos |
| **Attack_WideSlash** | 7 | 12 FPS | 0.58s | Preparação para trás, arco fulminante de 180° e recuperação |
| **Attack_GroundSlam** | 8 | 12 FPS | 0.66s | Elevação vertical, impacto no chão com partículas de poeira |
| **Attack_TailSweep** | 5 | 14 FPS | 0.35s | Rotação rápida do corpo e chicoteada da cauda espinhosa |
| **Enrage_Roar** | 8 | 10 FPS | 0.80s | Rugido feroz com espinhos eriçados e brilho nos olhos |
| **Attack_DashThrust** | 6 | 14 FPS | 0.42s | Disparo horizontal veloz com a espada estendida |
| **Attack_LeapSlam** | 8 | 12 FPS | 0.66s | Pulo vertical, descida com espada para baixo e onda de choque |
| **Hurt / Stagger** | 4 | 10 FPS | 0.40s | Recuo pesado, quebrando momentaneamente a postura |
| **Death / Defeat** | 10 | 8 FPS | 1.25s | Espada crava no solo, o chefe cai sobre um joelho e desvanece em partículas de névoa |

---

## 6. ⚙️ Integração nos Motores de Jogos

- **Dimensão da Célula**: `384 x 384 px`
- **Fundo**: `RGBA 32-bit (Transparente)`
- **Ponto de Pivot dos Pés**: `X = 192px (50%)`, `Y = 336px (87.5%)` *(Mesma proporção de apoio no solo)*

### Exemplo de Configuração no Godot 4.x
```gdscript
extends CharacterBody2D

@export var max_hp: int = 280
var current_hp: int = 280
var is_enraged: bool = false

@onready var anim = $AnimatedSprite2D

func take_damage(amount: int):
    current_hp -= amount
    if current_hp <= max_hp / 2 and not is_enraged:
        trigger_enrage()
    elif current_hp <= 0:
        die()

func trigger_enrage():
    is_enraged = true
    anim.play("enrage_roar")
    # Aumenta velocidade da IA e desbloqueia DashThrust e LeapSlam
```
