import { z } from 'zod'
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc'

const tweetMessageSchema = z.object({ content: z.string() }).required()

export const tweetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(tweetMessageSchema)
    .mutation(async ({ input: { content }, ctx }) => {
      const tweet = await ctx.prisma.tweet.create({
        data: { content, userId: ctx.session.user.id },
      })

      return tweet
    }),
})
