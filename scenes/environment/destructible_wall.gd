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
		# Tremor visual e impacto sísmico
		position.x += (randf() - 0.5) * 8.0
		var player = get_tree().get_first_node_in_group("Player")
		if player and player.has_method("trigger_screen_shake"):
			player.trigger_screen_shake(6.0, 0.15)

func destroy() -> void:
	var player = get_tree().get_first_node_in_group("Player")
	if player and player.has_method("trigger_screen_shake"):
		player.trigger_screen_shake(12.0, 0.28)
	collision_shape.set_deferred("disabled", true)
	queue_free()
