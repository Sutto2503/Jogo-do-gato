extends StaticBody2D
class_name KeystoneGate

# ==============================================================================
# PORTÃO RÚNICO ANCESTRAL (ESTILO ORI KEYSTONE GATE)
# ==============================================================================

@export var required_keystones: int = 2
var current_keystones: int = 0
var is_open: bool = false

@onready var collision_shape: CollisionShape2D = $CollisionShape2D

func insert_keystone() -> bool:
	if is_open: return true
	current_keystones += 1
	if current_keystones >= required_keystones:
		open_gate()
		return true
	return false

func open_gate() -> void:
	is_open = true
	collision_shape.set_deferred("disabled", true)
	var tween = create_tween()
	tween.tween_property(self, "modulate:a", 0.0, 1.0)
