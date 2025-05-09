import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createDesign = mutation({
    args: {
        name: v.string(),
        ownerName: v.string(),
        ownerId: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new Error("User not authenticated");
        }

        await ctx.db.insert("designs", {
            name: args.name,
            ownerName: args.ownerName,
            ownerId: args.ownerId
        });
    }
});

export const getDesigns = query({
    args: {},
    handler: async (ctx) => {
        const designs = await ctx.db.query("designs").collect();
        return designs.map((design) => ({
            _id: design._id,
            name: design.name,
            ownerName: design.ownerName,
            createdAt: design._creationTime, // Convex provides this automatically
          }));
    }
});