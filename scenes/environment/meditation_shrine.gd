extends Area2D
class_name MeditationShrine

# ==============================================================================
# SANTUÁRIO DE MEDITAÇÃO / CHECKPOINT (ESTILO HOLLOW KNIGHT BENCH / NINE SOLS)
# ==============================================================================

@export var shrine_name: String = "Santuário das Cerejeiras"
@onready var spirit_fire: CPUParticles2D = $SpiritFire

func _ready() -> void:
	add_to_group("Checkpoint")
	body_entered.connect(_on_body_entered)

func _on_body_entered(body: Node2D) -> void:
	if body is Player:
		# Cura e ativação
		if spirit_fire:
			spirit_fire.amount = 20
