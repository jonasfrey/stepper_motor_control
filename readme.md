<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Wed Apr 03 2024 15:35:21 GMT+0200 (Central European Summer Time)","n_ts_created":1712151321244} -->
# stepper
controll a stepper motor with javascript
![./logo.png](./logo.png)
## 28BYJ_48 with ULN2003 driver
```javascript
            let o_stepper = f_o_stepper_28BYJ_48__with_ULN2003(
                2, // pin 
                3, // pin  
                4, // pin 
                5 // pin 
            );
            let n_target_rmp = 5;
            
            f_update_speed_nor(
                o_stepper, 
            )
```