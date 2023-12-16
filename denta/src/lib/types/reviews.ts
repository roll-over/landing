import { z } from "zod";

export const newReviewSchema = z.object({
  name: z.string().min(1).max(100),
  avatar: z.string().optional(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(1000),
  rootId: z.string().min(1).max(400),
  entityId: z.string().optional(),
});

