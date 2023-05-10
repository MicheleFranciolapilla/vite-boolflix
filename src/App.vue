<script>
  import { store } from "./store";
  import axios from "axios";
  import Comp_App_Header from "./components/Comp_App_Header.vue";
  export default{
    name        : "App",
    components  : {
      Comp_App_Header
    },
    data()
    {
      return {
        // Costanti semantiche per composizione url api:
        url_movie       : 0,
        store,
        api_actual_url  : ""
      }
    },
    computed:
    {
      call_api()
      {
        const api_key = "f09b39899c2ea83b3cca2614bae582e3";
        console.log("from the deep....",this.store.item_str);
        this.api_actual_url = this.store.set_api_url(this.url_movie, api_key);
        console.log(this.api_actual_url);
        axios.get(this.api_actual_url).then( res => 
          {console.log(res.data)
          });
      }
    },
    methods:
    {

    }
  }
</script>

<template>
  <div id="app_page" class="vh-100">
      <Comp_App_Header @go_to_call = "call_api" />
  </div>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "./assets/style/main.scss" as *;

    #app_page
    {
      background-color: $app_bg_color;
    }

</style>
