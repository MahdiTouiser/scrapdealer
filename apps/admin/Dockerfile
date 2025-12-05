FROM node:20-bullseye AS builder
WORKDIR /repo
RUN corepack enable
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/admin/package.json apps/admin/package.json
COPY . .
RUN corepack prepare pnpm@8.8.0 --activate
RUN pnpm install --frozen-lockfile
WORKDIR /repo
RUN pnpm --filter @scrapdealer/admin build

FROM node:20-bullseye AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /repo/apps/admin/.next .next
COPY --from=builder /repo/apps/admin/public public
COPY --from=builder /repo/apps/admin/package.json package.json
COPY --from=builder /repo/node_modules node_modules
EXPOSE 3000
CMD ["node", "node_modules/.bin/next", "start", "-p", "3000"]
