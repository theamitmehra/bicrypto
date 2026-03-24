import { Redis } from "ioredis";

export class RedisSingleton {
  private static instance: Redis;

  private constructor() {}

  public static getInstance(): Redis {
    if (!RedisSingleton.instance) {
      RedisSingleton.instance = new Redis({
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: Number(process.env.REDIS_PORT || 6379),
        connectTimeout: 1000,
        maxRetriesPerRequest: 1,
        enableOfflineQueue: false,
        retryStrategy: () => null,
      });

      RedisSingleton.instance.on("error", () => {
        // Keep silent here; higher layers already handle Redis fallbacks.
      });
    }
    return RedisSingleton.instance;
  }
}
