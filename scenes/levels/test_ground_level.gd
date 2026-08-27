extends Node2D

# ==============================================================================
# CENÁRIO DE TESTE - PLATAFORMA DE CHÃO RETO COM COLISÃO (FRENTE 2)
# ==============================================================================

@onready var player: Player = $Player
@onready var camera: Camera2D = $Player/Camera2D

func _ready() -> void:
	print("Cenário de Teste inicializado com sucesso!")
