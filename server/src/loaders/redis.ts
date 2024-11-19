// lib/redis.ts
import { createClient } from 'redis';

// Redis Client 1 (for example, for the main application database)
const redisClient1 = createClient({
  password: process.env.REDIS_PASSWORD_1, // Store your password in environment variables for security
  socket: {
    host: "redis-14679.c301.ap-south-1-1.ec2.redns.redis-cloud.com", // Your Redis Cloud host
    port: 14679, // Your Redis Cloud port
  },
});



// Redis Client 2 (for another database or service)
const redisClient2 = createClient({
  password: process.env.REDIS_PASSWORD_1, // Another password for the second Redis instance
  socket: {
    host: "redis-14679.c301.ap-south-1-1.ec2.redns.redis-cloud.com", // Your Redis Cloud host
    port: 14679, // Your Redis Cloud port
  },
});

// Event listeners
redisClient1.on('error', (err) => {
  console.error('Redis Client 1 Error:', err);
});
redisClient2.on('error', (err) => {
  console.error('Redis Client 2 Error:', err);
});

// Connect both clients
const connectRedis = async () => {
  try {
    await redisClient1.connect();
    await redisClient2.connect();
    console.log('Connected to both Redis servers');
  } catch (error) {
    console.error('Error connecting to Redis servers:', error);
  }
};


export { redisClient1, redisClient2,connectRedis };
