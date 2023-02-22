<template>
  <div class="modal-active">
    <img src="../assets/alert.svg" alt="alert">
    <strong>Desculpe!</strong>
    <p>Não foi possível encontrar o repositório ou usuário desejado!</p>
    <router-link class="btn-alerta" tag="button" to="/">Certo!</router-link>
  </div>
</template>

<script>
export default {
  name: 'ModalComp'
}
</script>

<style>
  .modal-active{
    width: 350px;
    position: absolute;
    background: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.4);
    top: 50%;
    left: 50%;
    margin-top: -220px;
    margin-left: -200px;
  }

  button.btn-alerta{
    color: white;
    background: red;
  }

  .modal-active strong{
    font-weight: 500;
    font-size: 46px;
  }

  .modal-active p {
    font-weight: 500;
    font-size: 20px;
    text-align: center;
  }

  button.btn-alerta:hover{
    background-color: #811313;
  }

  @media (max-width: 420px){
    .modal-active{
      margin-left: -170px;
      width: 300px;
    }
  }
</style>