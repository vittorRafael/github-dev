<template>
  <main class="home">
    <section class="home">
      <img src="../assets/git-logo.svg" alt="Github Logo" title="Github Logo">
      <div>
        <button @click="selecionado = true" :class="selecionado ? 'ativo' : ''">Repositório</button>
        <button @click="selecionado = false" :class="selecionado ? '' : 'ativo'">Usuário</button>
      </div>
        <input v-if="selecionado" @keyup.enter="pesquisarRepo" type="text" name="repositorio" id="repositorio" placeholder="Buscar Repositório...">
        <input v-if="!selecionado" @keyup.enter="pesquisarUsuario" type="text" name="usuario" id="usuario" placeholder="Buscar Usuário...">
    </section>
  </main>
</template>

<script>

export default {
  name: 'HomeView',
  data(){
    return {
      selecionado: true,
      repositorio: null,
      mostrarUsuario: false
    }
  },
  methods: {
    pesquisarRepo(e){
      console.log(e.target.value)
      this.$router.push({name: 'repositorios', params: {repo: e.target.value}})
    },
    pesquisarUsuario(e){
      console.log(e.target.value)
      this.$router.push({name: 'usuarios', params: {user: e.target.value}})
    }
  }
}
</script>

<style scoped>


  img{
    width: 15rem;
  }

  .ativo{
    background: black;
    color: white;
  }

  input{
    padding: 10px 20px;
    width: 100%;
    font-size: 18px;
    font-weight: 400;
    border: 1px solid;
    border-radius: 5px;
  }

  form{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1000px){
    input {
      max-width: 80%;
    }
  }

  @media (max-width: 600px){
    input{
      max-width: 350px;
    }
  }
</style>
