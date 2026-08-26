extends Area2D
class_name SpiritWisp

# ==============================================================================
# ESPÍRITO LUMINOSO / WISP (MECÂNICA DE BASH ESTILO ORI / NINE SOLS)
# ==============================================================================

@export var wisp_type: String = "gold" # "gold" or "blue"
@export var slingshot_power: float = 620.0

@onready var glow_particles: CPUParticles2D = $GlowParticles

var time_passed: float = 0.0
var base_pos: Vector2 = Vector2.ZERO

func _ready() -> void:
	base_pos = position
	add_to_group("SpiritWisp")
	collision_layer = 8
	collision_mask = 2

func _process(delta: float) -> void:
	time_passed += delta * 2.5
	# Movimento orbital suave em figura de oito (lemniscata)
	position.x = base_pos.x + sin(time_passed) * 12.0
	position.y = base_pos.y + sin(time_passed * 2.0) * 8.0

func on_bash_triggered(player: CharacterBody2D, aim_direction: Vector2) -> void:
	# Lança o jogador com impulso na direção escolhida
	player.velocity = aim_direction.normalized() * slingshot_power
	# Efeito de brilho intenso
	if glow_particles:
		glow_particles.amount = 25
		glow_particles.restart()
