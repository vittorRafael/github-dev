<template>
  <main class="home">
    <section class="home">
      <img src="../assets/git-logo.svg" alt="Github Logo" title="Github Logo">
      <div>
        <button @click="selecionado = true" :class="selecionado ? 'ativo' : ''">Repositório</button>
        <button @click="selecionado = false" :class="selecionado ? '' : 'ativo'">Usuário</button>
      </div>
      <form action="/repositorios/" v-if="selecionado">
        <input type="text" name="repositorio" id="repositorio" placeholder="Buscar Repositório...">
      </form>

      <form action="/usuarios/" v-if="!selecionado">
        <input type="text" name="usuario" id="usuario" placeholder="Buscar Usuário...">
      </form>
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
