extends Node2D
class_name GrapplePoint

# ==============================================================================
# PONTO DE ANCORAGEM PARA O GANCHO (GODOT 4)
# ==============================================================================

@export var is_active: bool = true
@export var glow_color: Color = Color(0.2, 0.9, 1.0, 0.9)

@onready var sprite: Sprite2D = $Sprite2D
@onready var glow_particles: CPUParticles2D = $GlowParticles

var time_passed: float = 0.0

func _ready() -> void:
	add_to_group("GrapplePoint")

func _process(delta: float) -> void:
	time_passed += delta
	# Efeito suave de pulso e levitação mística
	if sprite:
		sprite.position.y = sin(time_passed * 3.0) * 3.0
		sprite.modulate = glow_color.lerp(Color.WHITE, (sin(time_passed * 4.0) + 1.0) * 0.25)
