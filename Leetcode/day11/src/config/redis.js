// const {createClient}=require('redis')

// const redisClient = createClient({
//     username: 'default',
//     password:process.env.REDIS_PASS,
//     socket: {
//         host: 'redis-17494.crce179.ap-south-1-1.ec2.redns.redis-cloud.com',
//         port: 17494
//     }
// });

// module.exports=redisClient;



const {createClient} = require('redis')

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-10244.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 10244
    }
});

module.exports = redisClient;
// redis-cli -u redis://default:cBkqHboVOv17Y86kBMsKMnNN89ReYFFM@redis-17494.crce179.ap-south-1-1.ec2.redns.redis-cloud.com:17494