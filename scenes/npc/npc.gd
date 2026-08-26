extends Area2D
class_name GameNPC

# ==============================================================================
# NPC INTERATIVO COM ANIMAÇÃO DE RESPIRAÇÃO OCIOSA E DIÁLOGOS (GODOT 4)
# ==============================================================================

@export var npc_id: String = "elder_jin"
@export var npc_name: String = "Mestre Ancião Jin"
@export var portrait: String = "🐱"
@export var voice_pitch: float = 1.0
@export_multiline var initial_dialogue: String = "Os espíritos do vale estão inquietos. Traga-me as 2 Chaves de Espírito para abrir o caminho."
@export_multiline var quest_complete_dialogue: String = "Você provou sua disciplina ancestral. Tome este Fragmento de Máscara Sagrada!"

var quest_completed: bool = false
var is_player_near: bool = false
var anim_time: float = 0.0
var base_scale: Vector2 = Vector2.ONE

signal dialogue_triggered(npc_name: String, text: String, portrait: String)

func _ready() -> void:
	add_to_group("NPC")
	body_entered.connect(_on_body_entered)
	body_exited.connect(_on_body_exited)
	base_scale = scale

func _process(delta: float) -> void:
	# Animação de respiração ociosa (Idle Breathing)
	anim_time += delta * 2.6
	var breath_squash = sin(anim_time) * 0.04
	var breath_bob = sin(anim_time) * 2.5
	scale = Vector2(base_scale.x * (1.0 - breath_squash), base_scale.y * (1.0 + breath_squash))
	position.y += breath_bob * delta

	# Checar interação do jogador
	if is_player_near and Input.is_action_just_pressed("interact"):
		interact()

func _on_body_entered(body: Node2D) -> void:
	if body is Player:
		is_player_near = true

func _on_body_exited(body: Node2D) -> void:
	if body is Player:
		is_player_near = false

func interact() -> void:
	var text_to_show = quest_complete_dialogue if quest_completed else initial_dialogue
	dialogue_triggered.emit(npc_name, text_to_show, portrait)
