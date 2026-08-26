extends Area2D
class_name WindCurrent

# ==============================================================================
# CORRENTE DE VENTO ASCENDENTE (GODOT 4)
# ==============================================================================

@export var lift_strength: float = 380.0

func _ready() -> void:
	collision_layer = 16
	collision_mask = 2
	body_entered.connect(_on_body_entered)
	body_exited.connect(_on_body_exited)

func _on_body_entered(body: Node2D) -> void:
	if body is Player:
		body.is_in_wind_current = true
		body.wind_lift_force = lift_strength

func _on_body_exited(body: Node2D) -> void:
	if body is Player:
		body.is_in_wind_current = false
		body.wind_lift_force = 0.0
