
import { f_o_stepper_28BYJ_48__with_ULN2003, f_step_uln_2003, f_update_n_stepping_mode_uln_2003, f_update_rpm } from "./functions.module.js"
import { n_direction_forward, n_stepping_mode_uln_2003__full_stepping } from "./runtimedata.module.js";

import {
    // runtimedata
    // v1 and v2 have different layouts
    o_raspi__v1,
    o_raspi__v2,
    a_n_u8_pin_direction_in,
    a_n_u8_pin_direction_out,
    a_n_u8_pin_state_high,
    a_n_u8_pin_state_low,
  
    f_pin_set_direction__from_o_pin,
    f_pin_set_state__from_o_pin,
    f_pin_set_state__from_o_pin_only_if_state_changed,
    f_a_n_u8__pin_get_state__from_o_pin,
    f_n__pin_get_state__from_o_pin,
    f_s_pins_state_layout,
    f_o_pin__from_o_raspi,
    f_uninit_from_o_pin


} from "./../raspi/mod.js"

//  from "https://deno.land/x/raspi@1.0.0/mod.js"
//./readme.md:start
//md: # stepper
//md: controll a stepper motor with javascript
//./readme.md:end

//./readme.md:start
//md: ![./logo.png](./logo.png)
//./readme.md:end

// import { stuff} from './client.module.js'

            //./readme.md:start
            //md: ## 28BYJ_48 with ULN2003 driver
            // console.log(f_s_pins_state_layout(o_raspi__v2));
            // raspi v2: Thu Apr 04 2024 17:02:03 GMT+0200 (Central European Summer Time).271
            // |---------------------|---------------------|
            // |_   3v3 power        |_   5v power         |
            // |_   GPIO 2 (SDA)     |_   5v power         |
            // |_   GPIO 3 (SCL)     |_   Ground           |
            // |_   GPIO 4 (GPCLK0)  |_   GPIO 14 (TXD)    |
            // |_   Ground           |_   GPIO 15 (RXD)    |
            // |_   GPIO 17          |_   GPIO 18 (PCM_CLK)|
            // |_   3v3 power        |_   Ground           |
            // |_   GPIO 27          |_   GPIO 23          |
            // |_   GPIO 22          |_   Ground           |
            // |_   GPIO 10 (MOSI)   |_   Ground           |
            // |_   GPIO 9 (MISO)    |_   GPIO 25          |
            // |_   GPIO 11 (SCLK)   |_   GPIO 8 (CEO)     |
            // |_   Ground           |_   GPIO 7 (CE1)     |
            
            let o_pin2 = await f_o_pin__from_o_raspi(o_raspi__v2, 2, a_n_u8_pin_direction_out)
            let o_pin3 = await f_o_pin__from_o_raspi(o_raspi__v2, 3, a_n_u8_pin_direction_out)
            let o_pin4 = await f_o_pin__from_o_raspi(o_raspi__v2, 4, a_n_u8_pin_direction_out)
            let o_pin17 = await f_o_pin__from_o_raspi(o_raspi__v2, 17, a_n_u8_pin_direction_out)
            

            let o_stepper = f_o_stepper_28BYJ_48__with_ULN2003(
                [
                    2, // pin 
                    3, // pin  
                    4, // pin 
                    17 // pin 
                ], 
                async (n_pin, n_state)=>{
                    let a_n_u8_state = (n_state)
                    ? a_n_u8_pin_state_high
                    : a_n_u8_pin_state_low
                    if(n_pin == 2){
                        console.log(`write ${n_pin}: ${n_state}`)
                        return f_pin_set_state__from_o_pin(o_pin2, a_n_u8_state)
                    }
                    if(n_pin == 3){
                        console.log(`write ${n_pin}: ${n_state}`)
                        return f_pin_set_state__from_o_pin(o_pin3, a_n_u8_state)
                    }
                    if(n_pin == 4){
                        console.log(`write ${n_pin}: ${n_state}`)
                        return f_pin_set_state__from_o_pin(o_pin4, a_n_u8_state)
                    }
                    if(n_pin == 17){
                        console.log(`write ${n_pin}: ${n_state}`)
                        return f_pin_set_state__from_o_pin(o_pin17, a_n_u8_state)
                    }
                }, 

            );
            o_stepper.n_direction = n_direction_forward
            f_update_n_stepping_mode_uln_2003(o_stepper,n_stepping_mode_uln_2003__full_stepping)
            f_update_rpm(o_stepper, 15.0)
            let n = 0;
            while(n < 1000){
                await f_step_uln_2003(o_stepper)
            }
            //./readme.md:end