<template>
  <div style="text-align: center; margin-top: 50px; font-family: sans-serif">
    <h1>Lavadero SPA</h1>

    <div
      style="
        display: inline-block;
        text-align: left;
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 8px;
        width: 300px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      "
    >
      <h3>{{ modoRegistro ? 'Crear Cuenta' : 'Iniciar Sesión' }}</h3>

      <div v-if="modoRegistro" style="margin-bottom: 10px">
        <label>Nombre:</label><br />
        <input
          v-model="nombre"
          type="text"
          placeholder="Tu nombre"
          style="width: 100%; box-sizing: border-box; padding: 5px"
        />
      </div>

      <div style="margin-bottom: 10px">
        <label>Email:</label><br />
        <input
          v-model="email"
          type="email"
          placeholder="cliente@test.com"
          style="width: 100%; box-sizing: border-box; padding: 5px"
        />
      </div>

      <div style="margin-bottom: 10px">
        <label>Contraseña:</label><br />
        <input
          v-model="password"
          type="password"
          placeholder="***"
          style="width: 100%; box-sizing: border-box; padding: 5px"
        />
      </div>

      <!-- Botón que cambia de función según el modo -->
      <button
        @click="ejecutarAccion"
        style="
          width: 100%;
          padding: 10px;
          background-color: #3498db;
          color: white;
          border: none;
          cursor: pointer;
          font-weight: bold;
        "
      >
        {{ modoRegistro ? 'REGISTRARSE' : 'INGRESAR' }}
      </button>

      <!-- Enlace para cambiar entre Login y Registro -->
      <p style="margin-top: 15px; font-size: 14px; text-align: center">
        {{ modoRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?' }}
        <a
          href="#"
          @click.prevent="modoRegistro = !modoRegistro"
          style="color: #3498db; text-decoration: none; font-weight: bold"
        >
          {{ modoRegistro ? 'Inicia sesión' : 'Regístrate aquí' }}
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLavaderoStore } from '../stores/lavadero'
import { useRouter } from 'vue-router'

const store = useLavaderoStore()
const router = useRouter()

// Variables reactivas
const email = ref('')
const password = ref('')
const nombre = ref('') // Para el registro
const modoRegistro = ref(false) // Controla qué formulario ver

const ejecutarAccion = () => {
  if (!email.value || !password.value) {
    alert('Por favor, completa email y contraseña.')
    return
  }

  if (modoRegistro.value) {
    if (!nombre.value) {
      alert('Por favor, ingresa tu nombre.')
      return
    }

    const exito = store.registrarse(nombre.value, email.value, password.value)

    if (exito) {
      alert('¡Cuenta creada con éxito! Entrando al sistema...')

      store.login(email.value, password.value)
      router.push('/cliente')
    } else {
      alert('Este correo ya está registrado.')
    }
  } else {
    const logueado = store.login(email.value, password.value)
    if (logueado) {
      if (store.usuarioLogueado.rol === 'admin') {
        router.push('/admin')
      } else {
        router.push('/cliente')
      }
    } else {
      alert('Credenciales incorrectas.')
    }
  }
}
</script>