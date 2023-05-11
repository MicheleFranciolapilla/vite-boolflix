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
                num : 0,
                store
            }
        },
        methods:
        {
            propagate_from_search(event)
            {
                console.log("tipo di evento....",event.type);
                console.log("tipo di tasto....",event.key);

                this.num++;
                console.log(`***** ${this.num} *****`);
                console.log("evento: ",event);
                console.log("previous: ", this.store.previous_input);
                console.log("current: ", this.store.current_input);
                console.log("invalid input? ", this.store.is_invalid());
                console.log("new input? ", this.store.is_new_input());
                console.log("**********************");
            
                this.store.visualizing = !(this.store.is_invalid());

                if (!(this.store.is_invalid()) && (this.store.is_new_input())) 
                    this.$emit("go_to_call");
            }
        }
    }
</script>

<template>
    <header class="std_flex opaque">
        <Comp_Search_Bar @search_event = "$event => propagate_from_search($event)" />
    </header>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;

    header
    {
        width: 100%;
        height: $header_height;
    }
</style>