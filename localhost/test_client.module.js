import {
    f_display_test_selection_or_run_selected_test_and_print_summary,
    f_o_test, 
    f_assert_equals
} from "https://deno.land/x/deno_test_server_and_client_side@1.3/mod.js"
import { f_o_stepper_28BYJ_48__with_ULN2003, f_step_uln_2003, f_update_n_stepping_mode_uln_2003, f_update_rpm } from "./functions.module.js"
import { n_direction_forward, n_stepping_mode_uln_2003__full_stepping } from "./runtimedata.module.js";

//./readme.md:start
//md: # stepper
//md: controll a stepper motor with javascript
//./readme.md:end

//./readme.md:start
//md: ![./logo.png](./logo.png)
//./readme.md:end

// import { stuff} from './client.module.js'

let a_o_test = [
    f_o_test(
        'assert_equals_1_eq_1', 
        async ()=>{
            //./readme.md:start
            //md: ## 28BYJ_48 with ULN2003 driver
            
            let o_stepper = f_o_stepper_28BYJ_48__with_ULN2003(
                [
                    2, // pin 
                    3, // pin  
                    4, // pin 
                    5 // pin 
                ]
            );
            o_stepper.n_direction = n_direction_forward
            f_update_n_stepping_mode_uln_2003(o_stepper,n_stepping_mode_uln_2003__full_stepping)
            f_update_rpm(o_stepper, 15.0)
            let n = 0;
            while(n < 1000){
                await f_step_uln_2003(o_stepper)
            }
            //./readme.md:end
        }
    ),
]


f_display_test_selection_or_run_selected_test_and_print_summary(
    a_o_test
)