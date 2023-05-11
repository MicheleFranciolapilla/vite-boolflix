// Importazione della funzione reactive
import { reactive } from "vue";
export const store = reactive(
    {
        visualizing         : false, 
        img_per_row         : 5, 
        current_input       : "",
        previous_input      : "", 
        current_lang        : 0,
        language_array      : ["it_IT"], 
        
        api_url_base        : "https://api.themoviedb.org/3",
        // Array dei frammenti da utilizzare per completare il corretto url della api, a seconda delle esigenze
                            //   0       1         2         3        4       5       6            7          8           9        10   11  12
        api_url_fragments   : [ "/", "search", "discover", "find", "movie", "tv", "?api_key=", "&query=", "&language=", "&page=", "&", "=", "+" ], 
        api_key             : "f09b39899c2ea83b3cca2614bae582e3",
        api_url_codes       : [
                                // codici per richiesta base film
                                [0,1,0,4,6,7,9],
                                // codici per richiesta base tv
                                [0,1,0,5,6,8,7,9]
                            ], 
        data_arrays         : [[],[]], 
        data_on_screen      : [[],[]], 
        data_array_pointers : [0,0],

        create_data_on_screen()
        {
            for (let i = 0; i < this.img_per_row; i++)
            {
                this.data_on_screen[0].push({});
                this.data_on_screen[1].push({});
            }
        },

        set_data_on_screen(array_index, first_item)
        {
            for (let i = 0; i < this.img_per_row; i++)
            {
                if (i + first_item < this.data_arrays[array_index].length)
                    this.data_on_screen[array_index] [i] = this.data_arrays[array_index][i + first_item];
                else
                    this.data_on_screen[array_index] [i] = {};
            }
        },

        set_api_url(code, api_key, page)
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
                        case 8:
                            fragment = fragment.concat(this.language_array[this.current_lang]);
                            break;
                        case 9:
                            fragment = fragment.concat(page.toString());
                            break;
                    }
                    final_url = final_url.concat(fragment);
                });
            return final_url;
        },

        is_new_input() { return (this.current_input != this.previous_input); },

        is_invalid()
        {
            for (let i = 0; i < this.current_input.length; i++)
                if (this.current_input[i] != " ") return false;
            return true;
        }

    })