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
        // **********************
        url_movie         : 0,
        url_tv            : 1, 
        // **********************
        store,
        api_actual_url    : ["",""],
        api_actual_pages  : [0,0],
        api_totals        : [0,0], 
        max_pages         : 5 
      }
    },
    methods:
    {
      async call_api()
      {
          this.store.previous_input = this.store.current_input;
          // reset totale ad inizio procedura
          for (let i = this.url_movie; i <= this.url_tv; i++)
          {
            this.store.data_arrays[i] = [];
            this.api_actual_url[i] = "";
            this.api_actual_pages[i] = 0;
            this.api_totals[i] = 0;
          }
          this.store.data_arrays[this.url_movie] = [];
          this.store.data_arrays[this.url_tv] = [];

          console.log("evento propagato....",this.store.current_input);

          for (let i = this.url_movie; i <= this.url_tv; i++)
          {
            let page_count = 0;
            do
            {
              page_count++;
              this.api_actual_url[i] = this.store.set_api_url(i, this.store.api_key, page_count);
              console.log(this.api_actual_url[i]);
              await axios.get(this.api_actual_url[i]).then( res => 
              {
                console.log(`results di i=${i} e page=${page_count}`,res.data);
                console.log("total pages: ", res.data.total_pages);
                if (page_count == 1)
                {
                  this.api_actual_pages[i] = Math.min(5,parseInt(res.data.total_pages));
                  this.api_totals[i] = res.data.total_results;
                }
                for (let j = 0; j < res.data.results.length; j++)
                {
                  this.store.data_arrays[i].push(res.data.results[j]);
                }
              });
            } while (page_count < this.api_actual_pages[i]);
          }
          console.log("films: ", this.store.data_arrays[0]);
          console.log("serie: ", this.store.data_arrays[1]);



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
