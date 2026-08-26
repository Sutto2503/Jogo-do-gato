extends Node2D

# ==============================================================================
# MUNDO METROIDVANIA EXPANDIDO (3840 x 2145) - GODOT 4
# Inspirado em Hollow Knight, Ori and the Will of the Wisps e Nine Sols
# ==============================================================================

@onready var player: Player = $Player

func _ready() -> void:
	print("Mundo Metroidvania 4K Carregado com Sucesso!")
	print("Setores:")
	print("1. [Oeste] Vila dos Samurais & Pagoda Sagrado")
	print("2. [Centro] Ponte de Pedra & Rio das Almas")
	print("3. [Leste] Penhasco dos Espíritos & Ilhas Levitantes")
	print("4. [Subsolo] Ruínas das Tubulações & Cavernas")
