<script>
    import { store } from "../store";
    export default
    {
        name    : "Comp_Single_Card",
        props   : ['current_card', 'index', 'app_section'],
        data()
        {
            return {
                // Costanti semantiche per composizione url api:
                // **********************
                movie       : 0,
                tv          : 1, 
                // **********************
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
<!-- ()'top: 55%; right: 25%' -->
<template>
    <div class="single_card_block">
        <div class="empty_obj" v-if="(is_empty())">
            <img src="empty.png" alt="">
        </div>
        <div v-else class="image_box position-relative">
            <div class="overview position-absolute" 
                v-bind:style="(app_section == movie) ? ('top: 97%; left: 25%;') : ((index == 0) ? ('left: 25%;') : ('right: 25%;'))">
                <h5 class="mt-1 mb-0 text-center">{{ (app_section == movie) ? (current_card.original_title) : (current_card.original_name) }}</h5>
                <h5 class="mt-0 mb-3 text-center">- {{ (app_section == movie) ? (current_card.title) : (current_card.first_air_date) }} -</h5>
                <h6>Trama:</h6>
                <p>{{ current_card.overview }}</p>
                <h6 class="d-inline-block">Uscita: </h6>
                <span>- {{ (app_section == movie) ? (current_card.release_date) : (current_card.original_name) }} -</span>
                <span class="d-block">Per soli adulti: {{ (current_card.adult) ? ('Sì') : ('No')}}</span>
            </div>
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
            border: 3px solid transparent;
            &:hover
            {
                border-color: $img_hover_border_c;
                .overview
                {
                    opacity: 1;
                    width: 90%;
                    height: 80%;
                    animation-name: text_appears;
                    animation-duration: 0.75s;
                }
            }
            .overview
            {
                width: 0;
                height: 0;
                z-index: 999;
                padding: 7px 4px;
                font-size: small;
                bottom: 75%;
                border: 2px solid black;
                border-radius: 5px;
                background-color: $overview_bg_color;
                overflow-y: auto;
                opacity: 0;
                transition: height 0.5s, width 0.75s, opacity 1s;
            }
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

    @keyframes text_appears
    {
        0%
        {
            color: $overview_txt_color;
        }
        1%
        {
            color: $overview_bg_color;
        }
        99%
        {
            color: $overview_bg_color;
        }
        100%
        {
            color: $overview_txt_color;
        }
    }

</style>