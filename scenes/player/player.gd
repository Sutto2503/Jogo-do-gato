extends CharacterBody2D
class_name Player

# ==============================================================================
# GATINHO SAMURAI - CONTROLLER DE MOVIMENTAÇÃO AVANÇADA (GODOT 4)
# ==============================================================================

signal health_changed(new_health, max_health)
signal energy_changed(new_energy, max_energy)
signal ability_unlocked(ability_name)

# --- Constantes de Física e Mobilidade ---
@export_group("Movimentação Básica")
@export var walk_speed: float = 240.0
@export var sprint_speed: float = 380.0
@export var acceleration: float = 1400.0
@export var friction: float = 1600.0
@export var air_acceleration: float = 900.0

@export_group("Pulo e Mobilidade Aérea")
@export var jump_force: float = -460.0
@export var double_jump_force: float = -410.0
@export var gravity: float = 980.0
@export var max_fall_speed: float = 750.0
@export var coyote_time_max: float = 0.12
@export var jump_buffer_max: float = 0.15

@export_group("Planador (Glider)")
@export var glide_gravity: float = 130.0
@export var max_glide_fall_speed: float = 110.0
@export var glide_horizontal_speed: float = 320.0

@export_group("Gancho de Escalada (Grappling Hook)")
@export var grapple_range: float = 450.0
@export var grapple_pull_speed: float = 650.0
@export var grapple_release_boost: float = 480.0

# --- Estados do Personagem ---
enum State {
	IDLE,
	WALK,
	RUN,
	JUMP,
	FALL,
	GLIDE,
	GRAPPLE_PULL,
	ATTACK
}

var current_state: State = State.IDLE

# --- Variáveis de Controle ---
var can_double_jump: bool = true
var coyote_timer: float = 0.0
var jump_buffer_timer: float = 0.0
var is_gliding: bool = false
var is_in_wind_current: bool = false
var wind_lift_force: float = 0.0

# Gancho
var target_grapple_point: Node2D = null
var is_grappling: bool = false
var grapple_target_pos: Vector2 = Vector2.ZERO

# Ataque
var is_attacking: bool = false
var attack_timer: float = 0.0
@export var attack_duration: float = 0.35

# Referências a Nós Filhos
@onready var sprite: AnimatedSprite2D = $AnimatedSprite2D
@onready var grapple_ray: RayCast2D = $GrappleRayCast
@onready var grapple_line: Line2D = $GrappleLine
@onready var attack_area: Area2D = $AttackArea2D
@onready var dust_particles: CPUParticles2D = $DustParticles
@onready var camera: Camera2D = $Camera2D

func _ready() -> void:
	if grapple_line:
		grapple_line.visible = false
		grapple_line.top_level = true

func _physics_process(delta: float) -> void:
	# Atualizar temporizadores
	update_timers(delta)
	
	# Máquina de estados
	match current_state:
		State.IDLE, State.WALK, State.RUN:
			process_ground_movement(delta)
		State.JUMP, State.FALL:
			process_air_movement(delta)
		State.GLIDE:
			process_glide_movement(delta)
		State.GRAPPLE_PULL:
			process_grapple_movement(delta)
		State.ATTACK:
			process_attack_movement(delta)
			
	# Atualizar física
	move_and_slide()
	
	# Atualizar visual e animação
	update_animations()
	update_grapple_visuals()

# ==============================================================================
# PROCESSAMENTO DE ESTADOS
# ==============================================================================

func process_ground_movement(delta: float) -> void:
	var move_dir = Input.get_axis("move_left", "move_right")
	var is_sprinting = Input.is_action_pressed("sprint")
	var target_speed = sprint_speed if is_sprinting else walk_speed
	
	if move_dir != 0:
		velocity.x = move_toward(velocity.x, move_dir * target_speed, acceleration * delta)
		current_state = State.RUN if is_sprinting else State.WALK
		sprite.flip_h = move_dir < 0
	else:
		velocity.x = move_toward(velocity.x, 0, friction * delta)
		current_state = State.IDLE
		
	# Checar pulo
	if Input.is_action_just_pressed("jump") or jump_buffer_timer > 0:
		execute_jump()
		return
		
	# Checar ataque
	if Input.is_action_just_pressed("attack"):
		execute_attack()
		return
		
	# Checar gancho
	if Input.is_action_just_pressed("grapple"):
		try_grapple()
		return
		
	# Gravidade se cair de uma borda
	if not is_on_floor():
		coyote_timer = coyote_time_max
		current_state = State.FALL

func process_air_movement(delta: float) -> void:
	var move_dir = Input.get_axis("move_left", "move_right")
	
	if move_dir != 0:
		velocity.x = move_toward(velocity.x, move_dir * walk_speed, air_acceleration * delta)
		sprite.flip_h = move_dir < 0
	else:
		velocity.x = move_toward(velocity.x, 0, air_acceleration * 0.4 * delta)
		
	# Aplicar gravidade
	velocity.y += gravity * delta
	velocity.y = min(velocity.y, max_fall_speed)
	
	if velocity.y > 0:
		current_state = State.FALL
		
	# Pulo Duplo
	if Input.is_action_just_pressed("jump"):
		if coyote_timer > 0:
			execute_jump()
		elif can_double_jump:
			execute_double_jump()
			
	# Ativar Planador se estiver caindo e segurar pulo ou glide
	if velocity.y > 0 and (Input.is_action_pressed("jump") or Input.is_action_pressed("glide")):
		start_glide()
		return
		
	# Checar gancho no ar
	if Input.is_action_just_pressed("grapple"):
		try_grapple()
		return
		
	# Ataque no ar
	if Input.is_action_just_pressed("attack"):
		execute_attack()
		return
		
	# Aterrissagem
	if is_on_floor():
		on_landed()

func process_glide_movement(delta: float) -> void:
	var move_dir = Input.get_axis("move_left", "move_right")
	
	if move_dir != 0:
		velocity.x = move_toward(velocity.x, move_dir * glide_horizontal_speed, air_acceleration * delta)
		sprite.flip_h = move_dir < 0
	else:
		velocity.x = move_toward(velocity.x, 0, air_acceleration * 0.2 * delta)
		
	# Se estiver em corrente de ar ascendente, sobe
	if is_in_wind_current:
		velocity.y = move_toward(velocity.y, -wind_lift_force, 600.0 * delta)
	else:
		# Gravidade suave do planador
		velocity.y += glide_gravity * delta
		velocity.y = min(velocity.y, max_glide_fall_speed)
		
	# Cancelar planador
	if not (Input.is_action_pressed("jump") or Input.is_action_pressed("glide")):
		stop_glide()
		return
		
	if Input.is_action_just_pressed("grapple"):
		stop_glide()
		try_grapple()
		return
		
	if is_on_floor():
		stop_glide()
		on_landed()

func process_grapple_movement(delta: float) -> void:
	if not is_instance_valid(target_grapple_point):
		cancel_grapple()
		return
		
	var dir_to_target = (grapple_target_pos - global_position).normalized()
	var dist_to_target = global_position.distance_to(grapple_target_pos)
	
	# Puxar em direção ao ponto de ancoragem
	velocity = dir_to_target * grapple_pull_speed
	
	# Se aproximou o suficiente ou apertou pulo -> Lança com impulso
	if dist_to_target < 45.0 or Input.is_action_just_pressed("jump"):
		release_grapple_with_boost(dir_to_target)
		return
		
	# Cancelar com ataque
	if Input.is_action_just_pressed("attack"):
		cancel_grapple()
		execute_attack()
		return

func process_attack_movement(delta: float) -> void:
	# Desaceleração suave durante o ataque
	velocity.x = move_toward(velocity.x, 0, friction * 1.5 * delta)
	if not is_on_floor():
		velocity.y += gravity * delta
		
	attack_timer -= delta
	if attack_timer <= 0:
		is_attacking = false
		if is_on_floor():
			current_state = State.IDLE
		else:
			current_state = State.FALL

# ==============================================================================
# HABILIDADES & AÇÕES
# ==============================================================================

func execute_jump() -> void:
	velocity.y = jump_force
	current_state = State.JUMP
	coyote_timer = 0.0
	jump_buffer_timer = 0.0
	can_double_jump = true
	spawn_dust_particles()

func execute_double_jump() -> void:
	velocity.y = double_jump_force
	current_state = State.JUMP
	can_double_jump = false
	spawn_dust_particles(12)
	# Pequeno impulso horizontal na direção do movimento
	var move_dir = Input.get_axis("move_left", "move_right")
	if move_dir != 0:
		velocity.x = move_dir * walk_speed * 1.1

func start_glide() -> void:
	is_gliding = true
	current_state = State.GLIDE

func stop_glide() -> void:
	is_gliding = false
	if not is_on_floor():
		current_state = State.FALL

func try_grapple() -> void:
	var point = find_best_grapple_point()
	if point:
		target_grapple_point = point
		grapple_target_pos = point.global_position
		is_grappling = true
		current_state = State.GRAPPLE_PULL
		can_double_jump = true # Restaura pulo ao usar o gancho
		if grapple_line:
			grapple_line.visible = true

func release_grapple_with_boost(last_dir: Vector2) -> void:
	is_grappling = false
	if grapple_line:
		grapple_line.visible = false
	# Lança o personagem na direção com bônus vertical
	velocity = Vector2(last_dir.x * grapple_release_boost, -abs(grapple_release_boost * 0.9))
	current_state = State.JUMP
	can_double_jump = true

func cancel_grapple() -> void:
	is_grappling = false
	if grapple_line:
		grapple_line.visible = false
	current_state = State.FALL if not is_on_floor() else State.IDLE

func execute_attack() -> void:
	is_attacking = true
	attack_timer = attack_duration
	current_state = State.ATTACK
	
	# Habilitar colisor de ataque
	if attack_area:
		attack_area.monitoring = true
		# Desabilita após 0.2s
		get_tree().create_timer(0.2).timeout.connect(func():
			if attack_area:
				attack_area.monitoring = false
		)

func on_landed() -> void:
	can_double_jump = true
	is_gliding = false
	current_state = State.IDLE
	spawn_dust_particles(8)

func spawn_dust_particles(amount: int = 6) -> void:
	if dust_particles:
		dust_particles.amount = amount
		dust_particles.restart()
		dust_particles.emitting = true

func find_best_grapple_point() -> Node2D:
	var grapple_nodes = get_tree().get_nodes_in_group("GrapplePoint")
	var best_node: Node2D = null
	var min_dist: float = grapple_range
	
	var facing_dir = -1 if sprite.flip_h else 1
	
	for node in grapple_nodes:
		if node is Node2D:
			var dist = global_position.distance_to(node.global_position)
			if dist <= grapple_range:
				# Prioriza pontos à frente ou acima do jogador
				var dir_vector = (node.global_position - global_position).normalized()
				var angle_favor = dir_vector.dot(Vector2(facing_dir * 0.7, -0.7).normalized())
				if angle_favor > -0.2 and dist < min_dist:
					min_dist = dist
					best_node = node
					
	return best_node

# ==============================================================================
# FEEDBACK VISUAL & LINHA DO GANCHO
# ==============================================================================

func update_timers(delta: float) -> void:
	if coyote_timer > 0:
		coyote_timer -= delta
	if jump_buffer_timer > 0:
		jump_buffer_timer -= delta
	if Input.is_action_just_pressed("jump"):
		jump_buffer_timer = jump_buffer_max

func update_animations() -> void:
	if not sprite:
		return
		
	match current_state:
		State.IDLE:
			sprite.play("idle")
		State.WALK:
			sprite.play("walk")
		State.RUN:
			sprite.play("run")
		State.JUMP:
			sprite.play("jump")
		State.FALL:
			sprite.play("fall")
		State.GLIDE:
			sprite.play("glide")
		State.GRAPPLE_PULL:
			sprite.play("jump")
		State.ATTACK:
			sprite.play("attack")

func update_grapple_visuals() -> void:
	if is_grappling and grapple_line and is_instance_valid(target_grapple_point):
		grapple_line.clear_points()
		grapple_line.add_point(global_position + Vector2(0, -10))
		grapple_line.add_point(grapple_target_pos)
