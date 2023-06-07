import { initTRPC } from "@trpc/server";
import { string, z } from "zod";
import { prisma } from "@/server/db";
const t = initTRPC.create();

export const appRouter = t.router({
  userById: t.procedure.query(async () => {
    const data = await prisma.resource.findMany();
    return data;
  }),
  saveBrand: t.procedure
    .input(
      z.object({
        name: z.string(),
        url: z.string(),
        description: z.string(),
      })
    )
    .mutation(async (opts) => {
      await prisma.resource.create({
        data: {
          name: opts.input.name,
          url: opts.input.url,
          descriptions: opts.input.description,
        },
      });
      return {
        user_data: {
          name: opts.input.name,
          url: opts.input.url,
          description: opts.input.description,
        },
      };
    }),
});

export type AppRouter = typeof appRouter;
