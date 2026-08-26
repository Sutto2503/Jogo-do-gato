extends StaticBody2D
class_name DestructibleWall

# ==============================================================================
# PAREDE DESTRUTÍVEL COM IMPACTO SÍSMICO (ESTILO HOLLOW KNIGHT / ORI)
# ==============================================================================

@export var max_hits: int = 2
var hits: int = 0

@onready var collision_shape: CollisionShape2D = $CollisionShape2D

func take_damage(amount: int = 1) -> void:
	hits += amount
	if hits >= max_hits:
		destroy()
	else:
		# Tremor visual
		position.x += (randf() - 0.5) * 6.0

func destroy() -> void:
	collision_shape.set_deferred("disabled", true)
	queue_free()
