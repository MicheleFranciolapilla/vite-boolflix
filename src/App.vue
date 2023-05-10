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
        store,
        api_actual_url  : ""
      }
    },
    methods:
    {
      set_actual_url()
      {
        this.api_actual_url = store.api_basic_url.concat(store.api_methods[0],store.api_media[0],store.api_query_string,"f09b39899c2ea83b3cca2614bae582e3","&query=",store.string_to_search);
      },

      call_api()
      {
        // this.set_actual_url();
        console.log("from the deep....",this.store.item_str);
        // axios.get(this.api_actual_url).then((res) => {console.log(res.data)});
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
