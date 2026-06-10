<template>
  <div class="dashboard-container">
    
    <!-- Barra de Navegación Superior -->
    <nav class="navbar">
      <span>Sesión de: <strong>{{ store.usuarioLogueado?.nombre }}</strong></span>
      <button @click="cerrarSesion" class="btn-logout">
        SALIR / CERRAR SESIÓN
      </button>
    </nav>

    <div class="panel-cliente">
      <h1>Panel del Cliente</h1>
      <p>Bienvenido: <strong>{{ store.usuarioLogueado?.nombre || 'Invitado' }}</strong></p>

      <hr />

      <!-- SECCIÓN RESERVA -->
      <div class="card-reserva">
        <h3>Solicitar Nuevo Turno</h3>
        <div class="form-group">
          <label>Patente del vehículo:</label>
          <input 
            v-model="nuevaPatente" 
            type="text" 
            placeholder="Ej: ABC 123 / AB 123 AB" 
            class="input-field" 
          />

          <label>Fecha y Hora:</label>
          <input 
            v-model="nuevaFecha" 
            type="datetime-local" 
            class="input-field" 
          />

          <button @click="crearTurno" class="btn-submit">
            RESERVAR TURNO
          </button>
        </div>
      </div>

      <hr />

      <!-- SECCIÓN DE LA LISTA DE TURNOS -->
      <div class="lista-turnos-container">
        <h3>Mis Turnos</h3>
        <ul v-if="misTurnos.length > 0" class="lista-turnos">
          <li v-for="turno in misTurnos" :key="turno.id" class="item-turno">
            🚗 <strong>{{ turno.patente }}</strong> - {{ new Date(turno.fecha).toLocaleString() }} - 
            <span :style="{ color: obtenerColorEstado(turno.estado) }" class="estado-texto">
              {{ turno.estado }}
            </span>
          </li>
        </ul>
        <p v-else class="empty-message">No tienes turnos registrados actualmente.</p>
      </div>
    </div>

  </div>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import { useLavaderoStore } from '../stores/lavadero'
    import { useRouter } from 'vue-router'

    const store = useLavaderoStore()
    const router = useRouter()

    const nuevaPatente = ref('')
    const nuevaFecha = ref('')

    const misTurnos = computed(() => {
      return store.turnos.filter((t) => t.clienteId === store.usuarioLogueado?.id)
    })

    const crearTurno = () => {
      if (!nuevaPatente.value || !nuevaFecha.value) {
          alert('Por favor completa todos los campos')
          return
      }
      store.agendarTurno(nuevaPatente.value, nuevaFecha.value)
      nuevaPatente.value = ''
      nuevaFecha.value = ''
    }

    const obtenerColorEstado = (estado) => {
      switch (estado) {
        case 'Esperando el servicio': return '#f39c12'
        case 'En proceso de lavado': return '#3498db'
        case 'Lavado finalizado': return '#2ecc71'
        default: return '#666'
      }
    }

    const cerrarSesion = () => {
      store.logout()
      router.push('/')
    }
</script>

<style scoped>
.dashboard-container {
  max-width: 1000px;
  margin: 0 auto;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #333;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.btn-logout {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
}

.panel-cliente {
  padding: 20px;
  border: 2px solid #3498db;
  border-radius: 8px;
}

.card-reserva {
  background: #f9f9f9;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.form-group {
  display: flex;
  gap: 10px;
  flex-direction: column;
  max-width: 300px;
}

.input-field {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-submit {
  background: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.lista-turnos {
  list-style: none;
  padding: 0;
}

.item-turno {
  background: #fff;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
}

.estado-texto {
  font-weight: bold;
}

.empty-message {
  color: #666;
}
</style>