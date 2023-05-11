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
                flags_url   : "https://flagcdn.com/40x30/",
                vote_array  : ["","","","",""],
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
    
            is_empty() { return (Object.keys(this.current_card).length == 0) },

            get_card_title()
            {
                if (this.current_card?.original_title) return this.current_card.original_title;
                else return this.current_card.original_name;
            },

            get_flag() 
            { 
                let str = this.current_card.original_language.toLowerCase();
                if ((str != "it") && (str != "fr") && (str != "es") && (str != "de") && (str != "tr") && (str != "cn"))
                    switch (str)
                    {
                        case "en":
                            str = "gb";
                            break;
                        case "ja":
                            str = "jp";
                            break;
                        default:
                            return "";
                    }
                return this.flags_url.concat(str, ".png");
            },
/* <i class="fa-solid fa-star"></i> */
            get_vote()
            {
                let vote = this.current_card.vote_average / 2;
                let int = 0;
                for (let i = 0; i < 5; i++)
                {
                    if (i + 1 <= vote)
                    {
                        this.vote_array[i] = "fa-solid fa-star";
                        int = i + 1;
                    }
                    else 
                        this.vote_array[i] = "fa-regular fa-star";
                }
                let rest = vote - int;
                if ((vote - int) >= 0.75) 
                    this.vote_array[int] = "fa-solid fa-star";
                else if ((vote - int) > 0.25)
                    this.vote_array[int] = "fa-solid fa-star-half-stroke";
                return vote;
            }

        }
    }
</script>

<template>
    <div class="single_card_block">
        <div class="empty_obj" v-if="(is_empty())">
            <img src="empty.png" alt="">
        </div>
        <div v-else class="image_box">
            <img v-bind:src="get_image_url()" alt="">
            <div class="details std_flex flex-column">
                <span class="title">{{ get_card_title() }}</span>
                <div class="more_info std_flex justify-content-between">
                    <div class="flag">
                        <img v-bind:src="(get_flag() != '') ? (get_flag()) : ('un_flag.jpg')" alt="Bandiera {{ current_card.original_language }}">
                    </div>
                    <div class="stars std_flex flex-column justify-content-evenly">
                        <span>{{ get_vote() }}</span>
                        <div>
                            <span v-for="number in 5">
                                <i v-bind:class="vote_array[number - 1]"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
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
        .empty_obj
        {
            width: 100%;
            height: 100%;
            img
            {
                width: 100%;
                height: 100%;
                object-fit: cover;
            } 
        }
        .image_box
        {
            width: calc(100%);
            height: calc(100%);
            img
            {
                width: 100%;
                height: 70%;
                object-fit: cover;
                object-position: center;
            } 
        }
        .details
        {
            width: calc(100%);
            height: calc(30%);
            background-color: $details_bg_color;
            border: 1px solid white;
            .title
            {
                width: 100%;
                height: 40%;
                color: $details_title_col;
                padding: 5px;
                font-size: medium;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .more_info{
                width: 100%;
                flex-grow: 1;
                *
                {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 50%;
                    height: 100%;
                }
                .flag
                {
                    width: 30%;
                    height: auto;
                    object-fit: contain;
                }
                .stars
                {
                    gap: 0.25rem;
                    padding: 0.25rem;
                    span
                    {
                        color: $star_color;
                        font-size: medium;
                    } 
                }
            }
        }
    }


</style>