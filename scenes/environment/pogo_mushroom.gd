extends Area2D
class_name PogoMushroom

# ==============================================================================
# COGUMELO BIOLUMINESCENTE / POGO (ESTILO HOLLOW KNIGHT / NINE SOLS)
# ==============================================================================

@export var bounce_force: float = -520.0

func _ready() -> void:
	add_to_group("PogoSurface")
	collision_layer = 4
	collision_mask = 2

func trigger_pogo(player: CharacterBody2D) -> void:
	player.velocity.y = bounce_force
	player.can_double_jump = true
	# Feedback visual de compressão elástica
	scale = Vector2(1.3, 0.7)
	var tween = create_tween()
	tween.tween_property(self, "scale", Vector2.ONE, 0.25).set_trans(Tween.TRANS_ELASTIC)
