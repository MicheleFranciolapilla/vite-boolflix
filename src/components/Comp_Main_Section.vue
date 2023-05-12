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
        },
        created()
        {
            window.addEventListener("keydown", event => { this.check_keys(event); });
        },
        unmounted()
        {
            window.removeEventListener("keydown", event => { this.check_keys(event); });
        },
        methods:
        {
            check_keys(event)
            {
                // Filtro gli eventi freccia laterale per la sola sezione attiva
                if (((event.key == "ArrowLeft") || (event.key == "ArrowRight")) && (this.app_section == this.store.active_section))
                {
                    // Caso "freccia sinistra"
                    if (event.key == "ArrowLeft")
                    {
                        // Se la card attiva è la prima, l'evento equivale ad un "page back"
                        if (this.store.active_img[this.app_section] == 0)
                            this.one_page_back();
                        // Altrimenti ho spazio per spostare di una unità indietro la card attiva
                        else
                            this.store.active_img[this.app_section]--;
                    }
                    // Caso "freccia destra"
                    else
                    {
                        // Se la card attiva è l'ultima, l'evento equivale ad un "page forward"
                        if (this.store.active_img[this.app_section] == this.store.img_per_row - 1)
                            this.one_page_forward();
                        // Altrimenti verifico se posso spostare di una unità avanti la card attiva
                        // Il controllo da eseguire a questo punto è se la card attiva è l'ultima di tutto l'array di dati. Se non lo è si può incrementare
                        else if ((this.store.active_img[this.app_section] + this.store.data_array_pointers[this.app_section]) < this.store.data_arrays[this.app_section].length - 1)
                            this.store.active_img[this.app_section]++;
                    }
                }
            },

            toggle_active_section()
            {
                if (this.app_section != this.store.active_section)
                    this.store.active_section = !this.store.active_section;
            },

            // Decremento di pagina
            one_page_back()
            {
                // Controllo se il puntatore specifico è diverso da zero, ovvero non punta al primo elemento di data_array, nel qualcaso ho almeno una pagina alle spalle
                if (this.store.data_array_pointers[this.app_section] != 0)
                    {
                        // Decremento il puntatore di un'ampiezza di pagina (cards per rigo)
                        this.store.data_array_pointers[this.app_section] -= this.store.img_per_row;
                        this.store.set_data_on_screen(this.app_section,this.store.data_array_pointers[this.app_section]);
                        // E poi rendo attiva l'ultima card della pagina appena caricata
                        this.store.active_img[this.app_section] = this.store.img_per_row - 1;
                    }
            },

            // Incremento di pagina
            one_page_forward()
            {
                // Controllo se il puntatore specifico ha almeno un'altra ampiezza di pagina prima di arrivare alla fine dell'array data_array, nel qualcaso avanzo di tale quantità
                if (this.store.data_array_pointers[this.app_section] + this.store.img_per_row <= this.store.data_arrays[this.app_section].length - 1)
                {
                    // Incremento il puntatore di un'ampiezza di pagina (cards per rigo)
                    this.store.data_array_pointers[this.app_section] += this.store.img_per_row;
                    this.store.set_data_on_screen(this.app_section,this.store.data_array_pointers[this.app_section]);
                    // E poi rendo attiva la prima card della pagina appena caricata
                    this.store.active_img[this.app_section] = 0;
                }
            },
        }
    }
</script>

<template>
    <section v-bind:class="(app_section == store.active_section) ? ('active') : ('')" v-on:click="toggle_active_section()">
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
            <span class="left_scroll" v-on:click="one_page_back()"><i class="fa-solid fa-angle-left"></i></span>
            <div class="cards_box std_flex">
                <div class="single_card"
                    v-for="(item, index) in store.data_on_screen[app_section]"
                    :key="index">
                    <Comp_Single_Card :current_card = "item" :index = "index" :app_section = "app_section" />
                </div>
            </div>
            <span class="right_scroll" v-on:click="one_page_forward()"><i class="fa-solid fa-angle-right"></i></span>
        </div>
    </section>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;

    section
    {
        width: calc(100%);
        height: calc(47%);
        border: 3px solid transparent;
        &.active
        {
            border-color: $active_sect_border;
        }
        .top_bar
        {
            height: $top_bar_height;
            padding-left: $arrow_area_width;
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
                cursor: pointer;
            } 
            .cards_box
            {
                width: calc(100% - (2 * $arrow_area_width));
                height: calc(100%);
                gap: 3px;
                .single_card
                {
                    width: calc(100% / $img_per_row);
                    height: calc(100%);
                }
            } 
        }
    }
</style>