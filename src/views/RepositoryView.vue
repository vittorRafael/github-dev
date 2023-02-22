<template>
  <main class="home">
      <section class="home" v-if="repositorios.total_count > 0">
        <article v-for="repositorio in repositorio" :key="repositorio.id">
        <div class="title">
          <h2>{{ repositorio.name }}</h2>
          <img @click="favoritar($event)" :data-pagina="repositorio.pagina" :data-usuario="repositorio.owner.login" :data-idrepo="repositorio.id" src="../assets/star_black.svg" :class="repositorio.estrela" alt="star">
        </div>
        <p>{{repositorio.description}}</p>
        <div class="stars"><img src="../assets/star_black.svg" alt="star"><span>{{repositorio.forks}}</span></div>
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

  name: 'RepositoryView',
  props: ['repo'],
  components: {
    ModalComp
  },
  data(){
    return {
      repositorios: {total_count: 1},
      repositorio: null,
      contador: 0,
      pagina: 1,
      url: new URL(window.location.href),
      mostrar: true,
      mostrarPage: true,
      favoritos: JSON.parse(localStorage.getItem('favoritos')) || new Array
    }
  },
  methods: {
    fetchRepositorio(){
      fetch(`https://api.github.com/search/repositories?q=${this.repo}&page=1`)
        .then(r => r.json())
        .then(r => {
          this.repositorios = r
          this.repositorios.items.forEach(repo => {
            this.favoritos.forEach(fav => {
              if(fav.id == repo.id){
                repo.estrela = 'gold'
              }
            });
            repo.pagina = this.pagina
          });
          this.repositorio = r.items.slice(0,3)
          if(r.items.length < 3){
            this.mostrar = false
            this.mostrarPage = false
          }
        })
        .catch((err) => console.log(err))
        this.contador += 3
    },
    fetchPage(){
      this.pagina++;
      fetch(`https://api.github.com/search/repositories?q=${this.repo}&page=${this.pagina}`)
      .then(r=> r.json())
      .then(r => {
        this.contador = 1;
        this.repositorios = r;
        this.repositorios.items.forEach(repo => {
            this.favoritos.forEach(fav => {
              if(fav.id == repo.id){
                repo.estrela = 'gold'
              }
            });
            repo.pagina = this.pagina
          });
        let novosRepositorios = this.repositorios.items.slice(this.contador, this.contador+3)
        for(let i = 0; i < 3; i++){
          this.repositorio.push(novosRepositorios[i])
        }
        console.log('Pagina: ' + this.pagina)
        
      })
    },
    verMais(){
      if(this.repositorios.items.length - this.contador > 3){
        let novosRepositorios = this.repositorios.items.slice(this.contador, this.contador+3)
        for(let i = 0; i < 3; i++){
          this.repositorio.push(novosRepositorios[i])
        }
      }else if(this.repositorios.items.length - this.contador > 0){
        let sobra = this.limite - this.contador;
        let novosRepositorios = this.repositorios.items.slice(this.contador, this.contador+sobra)
        for(let i = 0; i < sobra; i++){
          this.repositorio.push(novosRepositorios[i])
        }
        this.mostrar = false
      }
      this.contador += 3
    },
    favoritar(e){
      let pagina_repo = e.target.dataset.pagina
      console.log('repositorio.length: ',this.repositorio.length)
      console.log('pagina_repo', pagina_repo)
      fetch(`https://api.github.com/search/repositories?q=${this.repo}&page=${pagina_repo}`)
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
          for(let i = 0; i < r.items.length;i++){
            if(r.items[i].id == e.target.dataset.idrepo){
              favoritosArray.push(r.items[i])
            }else{
              console.log('nao achou')
            }
          }
          localStorage.setItem('favoritos', JSON.stringify(favoritosArray))
        }
        console.log(JSON.parse(localStorage.getItem('favoritos')))
      })
    },
  },
  created(){
    this.fetchRepositorio()
    console.log(this.repo)
  }
}
</script>

<style scoped>
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
</style>