pid_websersocket=$(pgrep -f "websersocket_866d9e87-6b0a-43fd-ba8f-938495f3ce5f.js")
watch -n 1 ps -p $pid_websersocket -o pid,etime,%cpu,%mem,cmd