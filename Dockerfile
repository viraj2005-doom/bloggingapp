FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8000

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node . .
RUN mkdir -p public/uploads && chown -R node:node /app

USER node

EXPOSE 8000

CMD ["npm", "start"]
