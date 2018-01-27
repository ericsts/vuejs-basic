<template>

   <nav>
      <ul>       
          <!-- <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/cadastro">Cadastro</router-link></li> -->
          <li v-for="rota in rotas">
            <router-link :to="rota.path ? rota.path : '/'">{{ rota.titulo }}</router-link>
          </li>
      </ul>
    </nav>

</template>

<script>
export default {
  //props : ['rotas']
  props : {
    rotas : {
      type : Array,
      required : true
    }
  }
}
</script>


<style>
  .pagina-enter, .pagina-leave-active {
    opacity: 0;
  }

  .pagina-enter-active, .pagina-leave-active {
    transition: opacity .4s;
  }


</style>
