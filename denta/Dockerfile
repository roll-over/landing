FROM node:20.5-slim AS base

COPY ./ /frontend
WORKDIR /frontend

RUN corepack enable    
RUN pnpm install
ARG DEV_MODE=false
ARG ME_CONFIG_MONGODB_URL='mongodb://mongo:27017'
ARG OPENAI_API_KEY=''
ARG GOOGLE_ID=''
ARG GOOGLE_SECRET=''
RUN pnpm run build
