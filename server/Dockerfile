FROM node:16.15.1-alpine3.15

# For wait-for-postgres.sh
RUN apk add --update postgresql14-client

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

# Generate necessary types for build
RUN npx prisma generate

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:prod"]