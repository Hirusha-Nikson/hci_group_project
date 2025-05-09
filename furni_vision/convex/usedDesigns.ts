import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUsedDesigns = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("usedDesigns").collect()
    }
});

export const createUsedDesign = mutation({
    args: {
        designId: v.id("designs"),
        modelId: v.id("models"),
        userId: v.string(),
        name: v.string(),
        colors: v.string()
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("usedDesigns", {
            designId: args.designId,
            userId: args.userId,
            name: args.name,
            colors: args.colors,
            modelId: args.modelId
        });
    }
});