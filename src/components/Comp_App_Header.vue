<script>
import { store } from "../store";
import Comp_Search_Bar from "./Comp_Search_Bar.vue";
    export default
    {
        name        : "Comp_App_Header",
        components  :
        {
            Comp_Search_Bar
        },
        data()
        {
            return {
                store
            }
        },
        methods:
        {
            propagate_from_search(event)
            {
                if ((!this.store.is_invalid()) && (this.store.is_new_input())) 
                    this.$emit("go_to_call");
            }
        }
    }
</script>

<template>
    <header class="std_flex">
        <Comp_Search_Bar @search_event = "$event => propagate_from_search($event)" />
    </header>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;

    header
    {
        height: $header_height;
        border: 1px solid yellow;
    }
</style>