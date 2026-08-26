extends Node2D

# ==============================================================================
# CENÁRIO PRINCIPAL - CIDADE SAMURAI & NATUREZA MÍSTICA (GODOT 4)
# ==============================================================================

@onready var player: Player = $Player

func _ready() -> void:
	print("Cenário Principal Carregado com Sucesso!")
	print("Controles:")
	print("- [A] [D] ou [Setas]: Mover")
	print("- [W] ou [Espaço]: Pular (Aperte novamente para Pulo Duplo)")
	print("- [Shift]: Correr")
	print("- [Segurar Espaço / S] no ar: Abrir Planador")
	print("- [K] ou [Botão Direito]: Lançar Gancho (Grappling Hook)")
	print("- [J] ou [Botão Esquerdo]: Ataque de Katana Flamejante")
