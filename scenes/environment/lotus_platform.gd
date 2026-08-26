extends StaticBody2D
class_name LotusPlatform

# ==============================================================================
# PLATAFORMA DE LÓTUS EFÊMERA (ESTILO ORI TIMED PLATFORMS)
# ==============================================================================

@export var fade_time: float = 1.5
@export var respawn_time: float = 3.0

var is_fading: bool = false
@onready var collision_shape: CollisionShape2D = $CollisionShape2D

func on_player_stepped() -> void:
	if is_fading: return
	is_fading = true
	var tween = create_tween()
	tween.tween_property(self, "modulate", Color(0.2, 0.9, 1.0, 0.2), fade_time)
	tween.tween_callback(_disable_platform)

func _disable_platform() -> void:
	collision_shape.set_deferred("disabled", true)
	await get_tree().create_timer(respawn_time).timeout
	_respawn_platform()

func _respawn_platform() -> void:
	collision_shape.set_deferred("disabled", false)
	is_fading = false
	var tween = create_tween()
	tween.tween_property(self, "modulate", Color.WHITE, 0.4)
