# starting db server

```bash
docker compose up -d
```

# start app in dev mode using nodemon and ts-node

```bash
npm run start:dev
```

# builds the app for production

```bash
npm run build
```

# starts the app after building

```bash
npm run start
```

# run migrations

```bash
npx sequelize db:migrate
```

# undo migrations

```bash
npx sequelize db:migrate:undo
```

# run seeders

```bash
npx sequelize db:seed:all
```

# undo seeders

```bash
npx sequelize db:seed:undo
```

# run tests

```bash
npm test
```
