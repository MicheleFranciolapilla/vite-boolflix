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
        store,
        url_movie         : 0,
        url_tv            : 1, 
        api_actual_url    : ["",""],
        api_actual_pages  : [0,0],
        max_pages         : 5 
      }
    },
    methods:
    {
      call_api()
      {
          this.store.previous_input = this.store.current_input;
          console.log("evento propagato....",this.store.current_input);

          for (let i = this.url_movie; i <= this.url_tv; i++)
          {
            this.api_actual_url[i] = this.store.set_api_url(i, this.store.api_key);
            console.log(this.api_actual_url[i]);
          }


          // let leave_loop = false;
          // do
          // {
          //   axios.get(this.api_actual_url).then( res => 
          //   {console.log(res.data)

          //   });
          // } while (!leave_loop);
      }
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
