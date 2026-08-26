extends Area2D
class_name GameNPC

# ==============================================================================
# NPC INTERATIVO COM DIÁLOGOS E MISSÕES (ESTILO HOLLOW KNIGHT)
# ==============================================================================

@export var npc_id: String = "elder_jin"
@export var npc_name: String = "Mestre Ancião Jin"
@export_multiline var initial_dialogue: String = "Os espíritos do vale estão inquietos. Traga-me as 2 Chaves de Espírito para abrir o caminho."
@export_multiline var quest_complete_dialogue: String = "Você provou sua conexão ancestral. Tome este Fragmento de Máscara Sagrada."

var quest_completed: bool = false
var is_player_near: bool = false

signal dialogue_triggered(npc_name: String, text: String)

func _ready() -> void:
	add_to_group("NPC")
	body_entered.connect(_on_body_entered)
	body_exited.connect(_on_body_exited)

func _on_body_entered(body: Node2D) -> void:
	if body is Player:
		is_player_near = true

func _on_body_exited(body: Node2D) -> void:
	if body is Player:
		is_player_near = false

func interact() -> void:
	var text_to_show = quest_complete_dialogue if quest_completed else initial_dialogue
	dialogue_triggered.emit(npc_name, text_to_show)
