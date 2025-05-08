import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

    models: defineTable({
        name:v.string(),
        filename:v.string(),
        category:v.string(),
        description:v.string(),
        price:v.number(),
        image:v.optional(v.string()),
        scale:v.optional(v.number()),
        position:v.optional(v.array(v.number())),
        modelId:v.string(), //the URL
    }),
});