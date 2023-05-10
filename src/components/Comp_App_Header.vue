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
            event_from_search()
            {
                this.$emit("go_to_call");
            }
        }
    }
</script>

<template>
    <header class="std_flex">
        <Comp_Search_Bar @search_key_up = "event_from_search" />
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