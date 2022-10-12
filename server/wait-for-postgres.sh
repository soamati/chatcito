#!/bin/sh

set -e
  
host="$1"
shift
  
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "postgres" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "Postgres is up - applying Prisma migrations"

npx prisma migrate dev

>&2 echo "Executing command"

exec "$@"