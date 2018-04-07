import mqtt from 'mqtt';

module.exports={
    mqtt:mqtt.connect({
        hostname:'localhost',
        port:'9001',
        path:'/path'
    })
}