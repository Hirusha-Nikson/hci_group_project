import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { color, mod } from "three/tsl";

export default defineSchema({

    models: defineTable({
        name:v.string(),
        filename:v.string(),
        category:v.string(),
        description:v.string(),
        price:v.number(),
        image:v.optional(v.string()),
        scale:v.optional(v.number()),
        colors:v.optional(v.array(v.string())),
        position:v.optional(v.array(v.number())),
        modelId:v.string(), //the URL
    }),


    designs: defineTable({
        name:v.string(),
        ownerName:v.string(),
        ownerId:v.string(),
    }),

    usedDesigns: defineTable({
        designId:v.id("designs"),
        modelId:v.id("models"),
        userId:v.string(),
        name:v.string(),
        colors:v.string(),
    }),

});