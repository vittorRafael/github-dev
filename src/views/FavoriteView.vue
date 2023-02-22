<template>
  <main >
    <h1><img src="../assets/git-logo.svg" alt="Github Logo" title="Github Logo"> Repositórios Favoritos</h1>
    <section v-for="repositorio, index in favorito" :key="repositorio.id">
        <div class="title">
          <h2>{{ repositorio.name }}</h2>
          <img @click="favoritar($event, index)" :data-usuario="repositorio.owner.login" :data-idrepo="repositorio.id" src="../assets/star_black.svg" class="gold" :class="repositorio.estrela" alt="star">
        </div>
        <p>{{repositorio.description}}</p>
        <div class="stars"><img src="../assets/star_black.svg" alt="star"><span>{{repositorio.forks}}</span></div>
    </section>
    <section v-if="favoritos.length == 0">
      <h2>Nenhum repositório marcado como favorito!</h2>
    </section>
    <button v-if="mostrar" @click="verMais">Ver mais</button>
  </main>
</template>

<script>
export default {
  name: 'FavoriteView',
  data(){
    return {
      favoritos: JSON.parse(localStorage.getItem('favoritos')) || new Array(),
      favorito: null,
      contador: 0,
      mostrar: true
    }
  },
  methods: {
    favoritar(e, index){
      fetch(`https://api.github.com/users/${e.target.dataset.usuario}/repos?direction=desc`)
      .then(r => r.json())
      .then(r => {
        var favoritosArray = JSON.parse(localStorage.getItem('favoritos')) || new Array()
        console.log(favoritosArray.length)
         for(let i = 0; i < favoritosArray.length; i++){
          var eIgual;
           if(favoritosArray[i].id == e.target.dataset.idrepo){
            e.target.classList.remove('gold')
            favoritosArray.splice(i, 1);
            eIgual = true
            break
          }else{
            e.target.classList.add('gold')
            eIgual = false
          }
        }
        if(eIgual){
          //se for igual
          localStorage.setItem('favoritos', JSON.stringify(favoritosArray))
        }else{
          //se nao for igual
          favoritosArray.push(r[index])
          localStorage.setItem('favoritos', JSON.stringify(favoritosArray))
        }
        console.log(JSON.parse(localStorage.getItem('favoritos')))
      })
    },
    verMais(){
      if(this.favoritos.length - this.contador > 3){
        let novosRepositorios = this.favoritos.slice(this.contador, this.contador+3)
        for(let i = 0; i < 3; i++){
          this.favorito.push(novosRepositorios[i])
        }
      }else if(this.favoritos.length - this.contador > 0){
        let sobra = this.favoritos.length - this.contador;
        let novosRepositorios = this.favoritos.slice(this.contador, this.contador+sobra)
        for(let i = 0; i < sobra; i++){
          this.favorito.push(novosRepositorios[i])
        }
        this.mostrar = false
      }
      this.contador += 3
    },
    mostrarRepos(){
      this.favorito = this.favoritos.slice(0,3)
      if(this.favoritos.length <= 3){
        this.mostrar = false
      }
      this.contador += 3
    }
  },
  created(){
    this.mostrarRepos()
  }
}
</script>

<style scoped>
  main{
    max-width: 1000px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  h1{
    display: flex;
    gap: 10px;
    align-items: center;
    font-family: Roboto Mono;
    font-weight: 400;
  }
  h1 img{
    width: 40px;
  }

  section{
    font-family: Rubik;
    padding-bottom: 20px;
    border-bottom: 1px solid;
  }

  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title h2{
    font-weight: 500;
    font-size: 30px;
  }

  section p{
    font-weight: 300;
    font-size: 22px;
  }

  .title img{
    width: 30px;
    cursor: pointer;
  }
  .stars{
    display: flex;
    gap: 5px;
    align-items: center;
    font-family: Rubik;
  }

  button{
    width: fit-content;
    margin: 0 auto
  }

  @media (max-width: 1000px){
    main{
      margin: 40px 20px;
    }
  }

  @media (max-width: 500px){
    section p{
      font-size: 14px;
    }
  }
</style>