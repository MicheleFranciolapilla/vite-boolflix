<script>
    import { store } from "../store";
    export default
    {
        name    : "Comp_Single_Card",
        props   : ['current_card'],
        data()
        {
            return {
                image_url   : "",
                store
            }
        },
        methods :
        {
            check_image_source()
            {
                // 0 = nessuna immagine disponibile
                // 1 = poster_path disponibile
                // 2 = backdrop_path disponibile
                // 3 = entrambe disponibili
                let response = 0;
                if (this.current_card?.poster_path != undefined) 
                    if (this.current_card.poster_path != null) response++;
                if (this.current_card?.backdrop_path != undefined) 
                    if (this.current_card.backdrop_path != null) response += 2;
                console.log("response: ",response);
                return response;
            },

            get_image_url()
            {
                console.log("card: ",this.current_card)
                let path = "w342";
                // Priorità al "poster_path"
                let check = this.check_image_source();
                if (check == 0) return "error-404.jpg";
                if (check != 2) path += this.current_card.poster_path;
                    else path += this.current_card.backdrop_path;
                return this.store.image_url_base.concat(path);

            },
    
            is_empty() { return (Object.keys(this.current_card).length == 0) }
        }
    }
</script>

<template>
    <div class="single_card_block">
        <div class="image_box">
            <img v-if="(is_empty())" src="empty.png" alt="">
            <img v-else v-bind:src="get_image_url()" alt="">
        </div>
        <div class="details">

        </div>
    </div>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;

    .single_card_block
    {
        width: 100%;
        height: 100%;
        .image_box
        {
            width: calc(100%);
            height: calc(80%);
            img
            {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
            } 
        }
        .details
        {
            width: 100%;
            height: 20%;
            background-color: white;
        }
    }


</style>