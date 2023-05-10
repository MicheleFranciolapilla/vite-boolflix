<script>
    import { store } from "../store";
    export default
    {
        name    : "Comp_Search_Bar",
        data()
        {
            return {
                store
            }
        }
    }
</script>

<template>
    <div id="search_box" class="std_flex">
        <button id="search_btn" class="std_flex" type="button" tabindex="-1" 
            v-on:click="$event => $emit('search_event',$event)">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <input id="search_input" type="text" placeholder="Cerca il tuo film o serie preferiti..." autocomplete="off" 
            v-model="store.current_input" 
            v-on:keyup="$event => $emit('search_event',$event)">
    </div>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;

    #search_box
    {
        height: 100%;
        *
        {
            height: 50%;
            border-radius: 5px;
        }
        #search_btn
        {
            padding: 0.7rem;
            background-color: $search_btn_bg;
            color: $search_btn_color;
            border: 2px solid $search_btn_color;
            i
            {
                font-size: medium;
                margin-bottom: 7px;
            } 
            &:hover
            {
                background-color: $search_btn_bg_hov;
                color: $search_btn_col_hov;
                border-color: $search_btn_col_hov;
            }
        }
        #search_input
        {
            padding: 0 5px;
        }
    }
</style>