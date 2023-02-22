<template>
  <header>
    <div class="conteudo">
      <router-link to="/" class="logo">Github <span>Search</span></router-link>
      <nav>
          <router-link to="/">Início</router-link>
          <router-link to="/favoritos">Favoritos</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavbarComp'
}
</script>

<style scoped>
  header{
    background-color: #D9D9D9;
  }
  .conteudo{
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }
  nav{
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .logo{
    font-weight: 700;
    font-size: 32px;
  }

  .logo span{
    font-style: italic;
    font-weight: 500;
  }

  nav a{
    font-weight: 700;
    font-size: 20px;
    text-transform: uppercase;
  }

  nav a.router-link-exact-active{
    color: #FF0000
  }

  @media (max-width: 1000px) {
    .conteudo{
      margin: 0 20px;
    } 
  }

  @media (max-width: 600px){
    .conteudo{
      flex-direction: column;
      gap: 20px;
    }
  }
</style>