
FROM oven/bun:latest as deps

WORKDIR /app

COPY ./package.json ./bun.lock /

RUN bun i


FROM deps as builder

COPY . .

RUN bun run build


FROM joseluisq/static-web-server:2 as runner

COPY --from=builder /app/dist /dist

CMD ["--port", "3000", "--root", "./dist"]
