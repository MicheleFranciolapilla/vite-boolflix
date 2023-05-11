<script>
  import { store } from "./store";
  import axios from "axios";
  import Comp_App_Header from "./components/Comp_App_Header.vue";
  import Comp_Main_Section from "./components/Comp_Main_Section.vue";
  export default{
    name        : "App",
    components  : 
    {
      Comp_App_Header,
      Comp_Main_Section
    },
    data()
    {
      return {
        // Costanti semantiche per composizione url api:
        // **********************
        movie             : 0,
        tv                : 1, 
        // **********************
        store,
        on_loading        : false, 
        api_actual_url    : ["",""],
        api_actual_pages  : [0,0],
        api_totals        : [0,0], 
        max_pages         : 5 
      }
    },
    mounted()
    {
      this.store.create_data_on_screen();
    },
    methods:
    {
      async call_api()
      {
          this.on_loading = true;
          this.store.previous_input = this.store.current_input;
          // reset totale ad inizio procedura
          for (let i = this.movie; i <= this.tv; i++)
          {
            this.store.data_arrays[i] = [];
            for (let j = 0; j < this.store.img_per_row; j++)
              this.store.data_on_screen[i][j] = {};
            this.store.data_array_pointers = [0,0];
            this.api_actual_url[i] = "";
            this.api_actual_pages[i] = 0;
            this.api_totals[i] = 0;
          }

          console.log("evento propagato....",this.store.current_input);

          for (let i = this.movie; i <= this.tv; i++)
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
          this.store.set_data_on_screen(this.movie,0);
          this.store.set_data_on_screen(this.tv,0);
          this.on_loading = false;
      }
    }
  }
</script>

<template>
  <div id="app_page" class="vh-100 std_flex flex-column justify-content-between">
      <Comp_App_Header @go_to_call = "call_api" />
      <main class="pt-5 pb-3 std_flex flex-column justify-content-between" v-if="store.visualizing">
        <Comp_Main_Section :app_section="movie" :total_found="api_totals[movie]" />
        <Comp_Main_Section :app_section="tv" :total_found="api_totals[tv]" />
      </main>
      <footer></footer>
  </div>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "./assets/style/main.scss" as *;

    #app_page
    {
      background-image: url("https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg");
      background-size: cover;
      main
      {
        width: calc(100%);
        flex-grow: 1;
        border: 3px solid green;
      } 
      footer 
      {
        width: 100%;
        height: $footer_height;
        border: 3px solid blue;
      }
    }

</style>
