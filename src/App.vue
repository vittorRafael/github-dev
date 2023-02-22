<template>
  <div id="app">
    <NavbarComp />
    <router-view/>
  </div>
</template>

<script>
import NavbarComp from './components/NavbarComp.vue';
export default {
  name: 'AppVue',
  components: {
    NavbarComp,
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    font-family: 'inter';
  }
  a{
    color: black;
    text-decoration: none;
  }

  main.home{
    max-width: 1000px;
    margin: 40px auto;
  }
  
  section.home{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
  }

  section.home>div{
    display: flex;
    gap: 50px;
  }

  button{
    padding: 10px 50px;
    border-radius: 5px;
    border: 1px solid;
    font-weight: 700;
    font-size: 18px;
    box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.4);
    background: white;
    cursor: pointer;
  }

  button:hover{
    background: black;
    color: white;
    transition: all .5s;
  }

  .modal{
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
  }

  @media (max-width: 1000px){
    main.home{
      margin: 40px 20px;
    }
  }

  @media (max-width: 600px){
    section.home>div{
      gap: 20px;
    }
    button{
      padding: 10px 20px;
    }
  }
  .gold{
    filter: invert(81%) sepia(99%) saturate(2450%) hue-rotate(335deg) brightness(97%) contrast(101%) !important;
  }
</style>
