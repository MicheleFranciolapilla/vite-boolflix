// Importazione della funzione reactive
import { reactive } from "vue";
export const store = reactive(
    {
        item_str            : "",
        
        api_basic_url       : "https://api.themoviedb.org/3",
        api_methods         : ["/search","/discover","/find"],
        api_media           : ["/movie","/tv"],
        api_query_string    : "?api_key=",
        objects_array       : [], 
    })