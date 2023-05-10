// Importazione della funzione reactive
import { reactive } from "vue";
export const store = reactive(
    {
        
        current_input       : "",
        previous_input      : "", 
        
        api_url_base        : "https://api.themoviedb.org/3",
        // Array dei frammenti da utilizzare per completare il corretto url della api, a seconda delle esigenze
                            //   0       1         2         3        4       5       6            7          8           9      10   11  12
        api_url_fragments   : [ "/", "search", "discover", "find", "movie", "tv", "?api_key=", "&query=", "&language=", "page", "&", "=", "+" ], 

        api_url_codes       : [
                                // codici per richiesta base film
                                [0,1,0,4,6,7],
                            ], 

        objects_array       : [], 

        set_api_url(code, api_key)
        {
            let final_url = this.api_url_base;
            this.api_url_codes[code].forEach( index =>
                {
                    let fragment = this.api_url_fragments[index];
                    switch (index)
                    {
                        case 6:
                            fragment = fragment.concat(api_key);
                            break;
                        case 7:
                            fragment = fragment.concat(this.current_input);
                            break
                    }
                    final_url = final_url.concat(fragment);
                });
            return final_url;
        },

        is_new_input() { (this.current_input != this.previous_input); },

        is_invalid()
        {
            for (let i = 0; i < this.current_input.length; i++)
                if (this.current_input[i] != " ") return false;
            return true;
        }
    })