import { rateLimit, RateLimitRequestHandler } from "express-rate-limit";

interface RateLimitOptions {
  windowMs: number;
  limit: number;
  standardHeaders: string;
  legacyHeaders: boolean;
}

const rateLimitOptions: RateLimitOptions = {
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
};

const ratelimitConfig: RateLimitRequestHandler = rateLimit(rateLimitOptions);

export default ratelimitConfig;
