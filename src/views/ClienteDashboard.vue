<template>
  <div class="dashboard-container">
    
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

          <button @click="crearTurno" class="btn-submit" :disabled="cargandoClima">
            {{ cargandoClima ? 'VERIFICANDO CLIMA...' : 'RESERVAR TURNO' }}
          </button>
        </div>
      </div>

      <hr />

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
    const cargandoClima = ref(false) // Estado visual para el botón mientras consulta la API

    const misTurnos = computed(() => {
      return store.turnos.filter((t) => t.clienteId === store.usuarioLogueado?.id)
    })

    // Función auxiliar para consultar la API de Open-Meteo
    const verificarSiLlueve = async (fechaSeleccionada) => {
      // Extraemos solo la porción YYYY-MM-DD del datetime-local
      const fechaSoloDia = fechaSeleccionada.split('T')[0]
      
      // Coordenadas fijas de Avellaneda 790, Caballito, CABA
      const lat = '-34.6186'
      const lon = '-58.4418'
      
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code&start_date=${fechaSoloDia}&end_date=${fechaSoloDia}&timezone=America/Argentina/Buenos_Aires`

      try {
        const respuesta = await fetch(url)
        const datos = await respuesta.json()
        
        // Open-Meteo devuelve un array en daily.weather_code. El índice 0 corresponde al día consultado.
        if (datos && datos.daily && datos.daily.weather_code) {
          const codigoClima = datos.daily.weather_code[0]
          
          // Códigos de la WMO (World Meteorological Organization) para lluvias:
          // 51, 53, 55: Llovizna
          // 61, 63, 65: Lluvia (Ligera, moderada, fuerte)
          // 66, 67: Lluvia helada
          // 80, 81, 82: Chubascos de lluvia
          const codigosLluvia = [51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82]
          
          return codigosLluvia.includes(codigoClima)
        }
        return false
      } catch (error) {
        console.error('Error consultando la API de clima:', error)
        return false // Si falla la API por red, dejamos continuar por precaución
      }
    }

    // Convertimos crearTurno en una función asíncrona (async)
    const crearTurno = async () => {
      if (!nuevaPatente.value || !nuevaFecha.value) {
          alert('Por favor completa todos los campos')
          return
      }

      cargandoClima.value = true
      
      // 1. Consultamos el pronóstico antes de guardar
      const hayPronosticoLluvia = await verificarSiLlueve(nuevaFecha.value)
      
      cargandoClima.value = false

      // 2. Si llueve, disparamos el cartel interactivo (Opción B)
      if (hayPronosticoLluvia) {
        const deseaContinuar = confirm(
          '⚠️ ¡Atención! Hay pronóstico de lluvia en Caballito para el día seleccionado.\n\n¿Deseas registrar el turno de todas formas?'
        )
        // Si el usuario presiona "Cancelar", frenamos la ejecución aquí
        if (!deseaContinuar) {
          return 
        }
      }

      // 3. Si no hay lluvia (o el usuario aceptó el riesgo), se guarda el turno
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
/* Tus estilos se mantienen exactamente igual */
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

/* Añadimos un estilo visual para cuando el botón está deshabilitado buscando el clima */
.btn-submit:disabled {
  background: #95a5a6;
  cursor: not-allowed;
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