<template>



  <div>   

    <img src="/static/php-logo.png" height="50px" />

    <h1 class="centralizado">{{ titulo }}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

    <input type="search" class="filtro" name="" v-on:input="filtro=$event.target.value" 
            placeholder="filtro por titulo">
    {{ filtro }}
    <ul class="lista-fotos">

      <li  class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto._id">
        
        <meu-painel :titulo="foto.titulo">
            
          <imagem-responsiva v-meu-transform:scale.animate="1.2" :url="foto.url" :titulo="foto.titulo">
          </imagem-responsiva>

          <router-link :to="{ name : 'altera', params : {id:foto._id}}">
            <meu-botao tipo="button" rotulo="ALTERAR" 
              estilo="padrao"/>
          </router-link>

          <meu-botao tipo="button" rotulo="REMOVER" 
            @botaoAtivado="remove($event , foto)"
            :confirmacao="true"
            estilo="perigo"/>

        </meu-painel>

      </li>
    </ul>
  
  </div>  
  

</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
import FotoService from '../../domain/foto/FotoService';

export default {

  components:{
    'meu-painel' : Painel,
    'imagem-responsiva' : ImagemResponsiva,
    'meu-botao' : Botao,
  },

  data(){
    return {
      titulo: 'CRUD de iamgens',
      fotos: [],
      filtro : '',
      mensagem : ''
    }
  },


  computed : {
    fotosComFiltro(){
      if(this.filtro){
        let exp = new RegExp(this.filtro.trim(),'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      }else{
        return this.fotos;
      }
    }
  },


  methods: {

    remove($event , foto) {
      
      //this.$http.delete(`http://localhost:3000/v1/fotos/${foto._id}`)
      //this.$http.delete(`v1/fotos/${foto._id}`)
      // this.resource.delete({
      //     id: foto._id
      //   })

      this.service.apaga(foto._id)
        .then(() => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice,1)
          this.mensagem = 'Foto removida com sucesso';
        }
        , err => this.mensagem = err.message);

    }
  },

  created(){
    // let promise = this.$http.get('http://localhost:3000/v1/fotos');
    // promise
    //   .then(res => res.json())
    //   .then(fotos => this.fotos = fotos);

    // this.$http.get('http://localhost:3000/v1/fotos')
    // this.$http.get('v1/fotos')

    // this.resource = this.$resource('v1/fotos{/id}');
    // this.resource
    //   .query()
    //   .then(res => res.json())

    this.service = new FotoService(this.$resource);
    this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => this.mensagem = err.message);



  }

}
</script>


<style>

.centralizado{
  text-align: center;
}

.lista-fotos{
  list-style: none;
}

.lista-fotos .lista-fotos-item{
  display: inline-block;
}


.filtro{
  display: block;
  width: 100%;
}
</style>
