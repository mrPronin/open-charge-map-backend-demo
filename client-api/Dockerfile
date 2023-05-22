# ---- Base Node ----
FROM node:18-alpine AS base
WORKDIR /home/node/app
COPY package*.json ./

# ---- Dependencies ----
FROM base AS dependencies
RUN npm install

# ---- Build ----
FROM dependencies AS build
COPY . .
RUN npm run build

# ---- Release ----
FROM node:18-alpine AS release
WORKDIR /home/node/app

# Install production dependencies
COPY --from=build /home/node/app/package*.json ./
RUN npm ci --only=production

# Copy built app and graphql schemas from the 'build' stage
COPY --from=build /home/node/app/dist ./dist
COPY --from=build /home/node/app/src/*.graphql ./dist

EXPOSE 4000

CMD ["node", "./dist/index.js"]
