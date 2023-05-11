<script>
    import { store } from "../store";
    import Comp_Single_Card from "./Comp_Single_Card.vue";
    export default
    {
        name        : "Comp_Main_Section",
        components  : 
        {
            Comp_Single_Card
        },
        props       :
        {
            app_section : Number,
            total_found : Number
        },
        data()
        {
            return {
                // Costanti semantiche per composizione url api:
                // **********************
                movie           : 0,
                tv              : 1, 
                // **********************
                section_array   : ["Films", "Serie"],
                store
            }
        }
    }
</script>

<template>
    <section>
        <div class="top_bar std_flex justify-content-start opaque">
            <h4>{{ section_array[app_section] }}</h4>
            <span class="std_flex">
                <i class="fa-solid" v-bind:class="(store.data_arrays[app_section].length != 0) ? ('fa-thumbs-up') : ('fa-thumbs-down bad')"></i>
            </span>
            <div class="std_flex" v-if="store.data_arrays[app_section].length != 0">
                <span>Titoli disponibili: {{ store.data_arrays[app_section].length }}</span>
                <span>su un totale di: {{ total_found }}</span>
            </div>
            <span v-else class="bad">La ricerca non ha prodotto risultati. Si consiglia un input più mirato!</span>
        </div>
        <div class="slider std_flex">
            <span class="left_scroll"><i class="fa-solid fa-angle-left"></i></span>
            <div class="cards_box std_flex">
                <div class="single_card"
                    v-for="(item, index) in store.data_on_screen[app_section]"
                    :key="index">
                    <Comp_Single_Card :current_card = "item" />
                </div>
            </div>
            <span class="right_scroll"><i class="fa-solid fa-angle-right"></i></span>
        </div>
    </section>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;

    section
    {
        width: calc(100%);
        height: calc(45%);
        .top_bar
        {
            height: $top_bar_height;
            padding-left: 3rem;
            gap: 2rem;
            color: $section_header_col;
            span.std_flex
            {
                padding-bottom: 3px;
                font-size: large;
                i
                {
                    color: $section_fa_ok;
                } 
                i.bad
                {
                    color: $section_fa_bad;
                }
            } 
            div.std_flex
            {
                span
                {
                    margin: 0 1.5rem;
                } 
            }
            span.bad
            {
                color: $warning_color;
            } 
        }
        .slider
        {
            height: calc(100% - $top_bar_height);
            span
            {
                width: $arrow_area_width;
                text-align: center;
                font-size: 3rem;
                color: $arrow_color;
            } 
            .cards_box
            {
                width: calc(100% - (2 * $arrow_area_width));
                height: 100%;
                .single_card
                {
                    width: calc(100% / $img_per_row);
                    height: 100%;
                    border: 3px solid violet;
                }
            } 
        }
    }
</style>