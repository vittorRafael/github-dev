<template>
  <main class="home">
    <section v-if="usuarios.total_count > 0" class="home">
      <article v-for="usuario in usuario" :key="usuario.id + 'page' + pagina">
        <router-link :to="'/usuario/' + usuario.login">
          <img :src="usuario.avatar_url" :alt="'Perfil do usuario' + usuario.login">
          <h2>{{ usuario.login }}</h2>
        </router-link>
      </article>
      <button v-if="mostrar && contador <= 26" @click="verMais">Ver mais</button>
      <button v-else-if="mostrarPage && contador > 26" @click="fetchPage">Ver mais</button>
    </section>
    <section class="modal" v-else>
      <ModalComp />
    </section>
  </main>
</template>

<script>
import ModalComp from '@/components/ModalComp.vue'
export default {
  name: 'UserView',
  props: ['user'],
  components: {
    ModalComp
  },
  data() {
    return {
      usuarios: { total_count: 1 },
      usuario: null,
      contador: 0,
      pagina: 2,
      mostrar: true,
      mostrarPage: true,
    }
  },
  methods: {
    fetchUsuario() {
      fetch(`https://api.github.com/search/users?q=${this.user}&page=1`)
        .then(r => r.json())
        .then(r => {
          this.usuarios = r
          this.usuario = r.items.slice(0, 3)
          if(r.items.length < 3){
            this.mostrar = false
            this.mostrarPage = false
          }
        })
        .catch((err) => console.log(err))
    },
    fetchPage() {
      fetch(`https://api.github.com/search/users?q=${this.user}&page=${this.pagina}`)
        .then(r => r.json())
        .then(r => {
          this.contador = 0;
          this.usuarios = r;
          let novosUsuarios = this.usuarios.items.slice(this.contador, this.contador + 3)
          for (let i = 0; i < 3; i++) {
            this.usuario.push(novosUsuarios[i])
          }
          this.pagina++;
        })
    },
    verMais() {
      this.contador += 3
      let novosUsuarios = this.usuarios.items.slice(this.contador, this.contador + 3)
      for (let i = 0; i < 3; i++) {
        this.usuario.push(novosUsuarios[i])
      }
      this.contador = this.contador > 27 ? 0 : this.contador
    }
  },
  created() {
    this.fetchUsuario()
  }
}
</script>

<style scoped>
article {
  padding: 15px;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.4);
  width: 100%;
  border-radius: 10px;
}

article a{
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

img {
  width: 145px;
}
</style>