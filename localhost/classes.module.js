
class O_stepper{
    constructor(
        s_name, 
        n_speed_nor,
        n_direction, 
        v_n_pin_direction, 
        v_n_pin_step,
        v_n_pin_stepping_mode,
        v_a_n_pin__uln_2003,
        v_n_stepping_mode_uln_2003, 
        // f_write_pin = (n_pin, n_pin_state) =>{}, 
    ){
        this.s_name = s_name
        this.n_speed_nor = n_speed_nor
        this.n_direction = n_direction
        this.v_n_pin_direction = v_n_pin_direction
        this.v_n_pin_step = v_n_pin_step
        this.v_n_pin_stepping_mode = v_n_pin_stepping_mode
        this.v_a_n_pin__uln_2003 = v_a_n_pin__uln_2003
        this.v_n_stepping_mode_uln_2003 = v_n_stepping_mode_uln_2003
        this.v_n_pin__uln_2003_write_last = null
        this.n_step = 0
        this.n_micsec_between_step = null
        this.n_micsec_last_step = performance.now()*1000
        this.n_rpm = null
        this.n_steps_per_round = null
        this.n_fullstepping_steps_per_round = null;
    }
}

export {
    O_stepper
}