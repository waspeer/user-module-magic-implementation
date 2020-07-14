# User Module Magic

This is educational project to practise Domain Driven Design, TDD and authentication. It is basically a GraphQL server for creating and authenticating user accounts using magic links by email.

## Setting up the development database

You can use Docker to set up the database in development with the following command:

```sh
docker run \
  -p 0.0.0.0:3999:5432 \
  --name user-module-magic-db \
  -e POSTGRES_PASSWORD=root \
  -e POSTGRES_USER=root \
  -e POSTGRES_DB=users \
  -d postgres:11-alpine
```

This wil create a postgres 11.2 container accesible at localhost port `3999`. This command only needs to be run once. Afterward running `yarn dev` will reuse this container.
