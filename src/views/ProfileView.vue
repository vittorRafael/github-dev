<template>
  <main class="home perfil" v-if="usuario">
    <section class="infor">
      <img :src="usuario.avatar_url" alt="Perfil do usuario">
      <div class="titulo_usuario">
        <h2>{{ usuario.name }}</h2>
        <h3>{{ usuario.login }}</h3>
      </div>
      <div class="detalhes">
        <p v-if="usuario.company"><img src="../assets/company.svg" alt="company">{{ usuario.company }}</p>
        <p v-if="usuario.location"><img src="../assets/local.svg" alt="company">{{ usuario.location }}</p>
        <p v-if="usuario.public_repos"><img src="../assets/archive.svg" alt="company">{{ usuario.public_repos }}</p>
        <p v-if="usuario.followers"><img src="../assets/followers.svg" alt="company">{{ usuario.followers }}</p>
      </div>
    </section>
    <section class="repos">
      <article v-for="repositorio, index in repositorio" :key="repositorio.id">
        <div class="title">
          <h2>{{ repositorio.name }}</h2>
          <img @click="favoritar($event, index)" :data-usuario="repositorio.owner.login" :data-idrepo="repositorio.id" src="../assets/star_black.svg" :class="repositorio.estrela" alt="star">
        </div>
        <p>{{repositorio.description}}</p>
        <div class="stars"><img src="../assets/star_black.svg" alt="star"><span>{{repositorio.forks}}</span></div>
      </article>
      <button v-if="limite && mostrar" @click="verMais">Ver mais</button>
    </section>
  </main>
</template>

<script>
export default {
  name: 'ProfileView',
  props: ['login'],
  data(){
    return {
      usuario: null,
      repositorios: null,
      repositorio: null,
      contador: 0,
      limite: 0,
      mostrar: true,
      favoritos: JSON.parse(localStorage.getItem('favoritos')) || new Array()
    }
  },
  methods: {
    fetchDados(){
      fetch(`https://api.github.com/users/${this.login}`)
        .then(r => r.json())
        .then(r => {
          this.usuario = r
        })
    },
    fetchRepos(){
      fetch(`https://api.github.com/users/${this.login}/repos?direction=desc`)
        .then(r => r.json())
        .then(r => {
          this.repositorios = r
          this.repositorios.forEach(repo => {
            this.favoritos.forEach(fav => {
              if(fav.id == repo.id){
                repo.estrela = 'gold'
              }
            });
          });
          this.repositorio = r.slice(0,3)
          this.limite = this.repositorios.length
          this.contador += 3
        })
    },
    verMais(){
      if(this.limite - this.contador > 3){
        let novosRepositorios = this.repositorios.slice(this.contador, this.contador+3)
        for(let i = 0; i < 3; i++){
          this.repositorio.push(novosRepositorios[i])
        }
      }else if(this.limite - this.contador > 0){
        let sobra = this.limite - this.contador;
        let novosRepositorios = this.repositorios.slice(this.contador, this.contador+sobra)
        for(let i = 0; i < sobra; i++){
          this.repositorio.push(novosRepositorios[i])
        }
        this.mostrar = false
      }
      this.contador += 3
    },
    favoritar(e, index){
      fetch(`https://api.github.com/users/${this.login}/repos?direction=desc`)
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
  },
  created(){
    this.fetchDados()
    this.fetchRepos()
  }
}
</script>

<style scoped>

  .perfil{
    display: flex;
    gap: 40px;
    align-items: start;
    justify-content: start;
  }
  .infor{
    background: #D9D9D9;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .infor>img{
    width: 300px;
    border-radius: 5px;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.4);
  }
  .titulo_usuario{
    display: flex;
    flex-direction: column;
    font-family: Rubik;
  }
  .titulo_usuario h2{
    font-weight: 500;
    font-family: 30px;
  }
  .titulo_usuario h3{
    font-weight: 300;
    font-family: 24px;
  }
  .detalhes{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .detalhes p{
    display: flex;
    gap: 10px;
    align-items: center;
    font-family: Rubik;
    font-weight: 300;
    font-size: 20px;
  }
  .detalhes p img{
    width: 20px;
  }

  .repos{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 50px;
    width: 100%;
  }
  article{
    font-family: Rubik;
    padding-bottom: 20px;
    border-bottom: 1px solid;
    width: 100%;
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

  article p{
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

  @media (max-width: 800px){
    .perfil{
      flex-direction: column;
    }

    .infor{
      width: 100%;
      padding: 20px 0; 
      justify-content: center;
      align-items: center;
    }
  }
</style>