extends AnimatableBody2D
class_name FloatingIsland

# ==============================================================================
# PEDRA FLUTUANTE MÍSTICA (GODOT 4)
# ==============================================================================

@export var levitation_amplitude: float = 14.0
@export var levitation_speed: float = 1.8
@export var is_activatable_by_magic: bool = true

var initial_y: float = 0.0
var time_passed: float = 0.0
var is_boosted: bool = false

func _ready() -> void:
	initial_y = position.y
	# Deslocamento de fase aleatório para as pedras não flutuarem em uníssono mecânico
	time_passed = randf_range(0.0, 6.28)

func _physics_process(delta: float) -> void:
	time_passed += delta * levitation_speed
	var target_y = initial_y + sin(time_passed) * levitation_amplitude
	
	if is_boosted:
		target_y -= 40.0
		
	position.y = lerp(position.y, target_y, 4.0 * delta)

func on_hit_by_magic() -> void:
	if is_activatable_by_magic:
		is_boosted = !is_boosted
