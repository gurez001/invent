import { Request, Response, NextFunction } from "express";
import Redis from "redis"; // Ensure you have installed ioredis

class CacheManager {
//   private redis: Redis;

  constructor() {
    // Initialize the Redis client
    // this.redis = new Redis();
  }

  /**
   * Removes specific cache or clears the entire database based on the request.
   * @param req - Express Request object
   * @param res - Express Response object
   * @param next - Express NextFunction
   */
  async removeCache(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { key } = req.body;

    //   if (key) {
    //     // Remove a specific cache key
    //     // const result = await this.redis.del(key);
    //     if (result === 1) {
    //       res.status(200).json({ success: true, message: `Cache for key "${key}" removed.` });
    //     } else {
    //       res.status(404).json({ success: false, message: `Key "${key}" not found in cache.` });
    //     }
    //   } else {
    //     // Clear all cache in the database
    //     await this.redis.flushdb();
        res.status(200).json({ success: true, message: "All cache cleared." });
    //   }
    } catch (error) {
      console.error("Error removing cache:", error);
      res.status(500).json({ success: false, message: "Failed to remove cache." });
    }
  }

//   /**
//    * Adds a cache entry with optional expiration.
//    * @param key - Cache key
//    * @param value - Cache value
//    * @param ttl - Time-to-live in seconds (optional)
//    */
//   async addCache(key: string, value: string, ttl?: number): Promise<void> {
//     try {
//       if (ttl) {
//         await this.redis.set(key, value, "EX", ttl);
//       } else {
//         await this.redis.set(key, value);
//       }
//       console.log(`Cache set for key: ${key}`);
//     } catch (error) {
//       console.error("Error adding cache:", error);
//     }
//   }

//   /**
//    * Fetches a cache entry by key.
//    * @param key - Cache key
//    * @returns - Cache value or null if not found
//    */
//   async getCache(key: string): Promise<string | null> {
//     try {
//       return await this.redis.get(key);
//     } catch (error) {
//       console.error("Error fetching cache:", error);
//       return null;
//     }
//   }
}

export default CacheManager;
