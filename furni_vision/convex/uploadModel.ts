import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveModel = mutation({
  args: {
    storageId: v.id("_storage"),
    name: v.string(),
    filename: v.string(),
    category: v.string(),
    price: v.number(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const modelId = args.storageId;
    const fileUrl = await ctx.storage.getUrl(modelId);

    await ctx.db.insert("models", {
      name: args.name,
      filename: args.filename,
      category: args.category,
      price: args.price,
      description: args.description,
      modelId: fileUrl ?? "",
    });
  },
});

export const getModels = query({
  handler: async (ctx) => {
    return await ctx.db.query("models").collect();
  },
});
