
import {
    O_stepper
} from "./classes.module.js"
import { n_stepping_mode_uln_2003__dualphase_stepping, n_stepping_mode_uln_2003__full_stepping, n_stepping_mode_uln_2003__half_stepping } from "./runtimedata.module.js";

const f_write_pin = async function(
    n_pin, 
    n_pin_state,
){
    // console.log(`pin:${n_pin}:${n_pin_state}`)
}


const f_o_stepper_nema = function(
    n_pin_direction,
    n_pin_step,
    n_pin_stepping_mode, 
){

    let o_stepper = new O_stepper(
        'nema_stepper', 
        0., 
        0., 
        n_pin_direction,
        n_pin_step,
        n_pin_stepping_mode, 
    );
    o_stepper.n_fullstepping_steps_per_round = 200
    return o_stepper

}
const f_o_stepper_28BYJ_48__with_ULN2003 = function(
    a_n_pin__uln_2003
){

    let o_stepper = new O_stepper(
        '28BYJ_48__with_ULN2003', 
        0., 
        0.,
        null, 
        null, 
        null, 
        a_n_pin__uln_2003
    );

    o_stepper.n_fullstepping_steps_per_round = 2048
    return o_stepper
}
const f_update_n_stepping_mode_uln_2003 = function(
    o_stepper, 
    n_stepping_mode_uln_2003
){  
    o_stepper.v_n_stepping_mode_uln_2003 = n_stepping_mode_uln_2003
    if(
        n_stepping_mode_uln_2003 == n_stepping_mode_uln_2003__full_stepping
        || n_stepping_mode_uln_2003 == n_stepping_mode_uln_2003__dualphase_stepping
        
        ){
        o_stepper.n_steps_per_round = o_stepper.n_fullstepping_steps_per_round
    }
    if(n_stepping_mode_uln_2003 == n_stepping_mode_uln_2003__half_stepping){
        o_stepper.n_steps_per_round = o_stepper.n_fullstepping_steps_per_round*2.
    }
}
const f_update_rpm = function(
    o_stepper, 
    n_rpm
){
    let n_steps_per_minute = o_stepper.n_steps_per_round * n_rpm
    o_stepper.n_micsec_between_step = (60*1000*1000)/n_steps_per_minute
}
const f_step_uln_2003 = async function(o_stepper){
    let n_micsec_now = performance.now()*1000;
    let n_micsec_delta = n_micsec_now -o_stepper.n_micsec_last_step
    console.log({n_micsec_delta})

    if((n_micsec_delta) < o_stepper.n_micsec_between_step){
        // console.log('waiting for next step')
        return false
    }

    let b_half_stepping = o_stepper.n_stepping_mode_uln_2003 == n_stepping_mode_uln_2003__half_stepping
    let n_substep =  ((b_half_stepping) ? 8 : 4)
    o_stepper.n_step = (o_stepper.n_step + o_stepper.n_direction) % n_substep
    if(o_stepper.n_step < 0){
        o_stepper.n_step = n_substep-1
    }
    let n_pin = o_stepper.v_a_n_pin__uln_2003[o_stepper.n_step]
    if(!b_half_stepping){
        await f_write_pin(
            o_stepper.v_n_pin__uln_2003_write_last, 
            0
        )
        await f_write_pin(
            n_pin, 
            1
        )
        o_stepper.v_n_pin__uln_2003_write_last = n_pin
    }
    o_stepper.n_micsec_last_step = n_micsec_now

}


export {
    f_write_pin,
    f_o_stepper_nema,
    f_o_stepper_28BYJ_48__with_ULN2003,
    f_update_rpm,
    f_step_uln_2003,
    f_update_n_stepping_mode_uln_2003,
    
}