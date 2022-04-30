FROM node:16.11.0 as development

WORKDIR /app

COPY package.json ./
#COPY prisma ./prisma

RUN npm install

COPY . .

ENV NODE_ENV=development

CMD ["yarn", "start:dev", "api-gateway"]
