#!/bin/bash
set -e

BACKUP_DIR="/var/backups/biotechvet"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

PG_HOST="localhost"
PG_PORT="5432"
PG_USER="postgres"
PG_DB="biotechvet"
PG_PASSWORD="123456"

mkdir -p "$BACKUP_DIR"

export PGPASSWORD="$PG_PASSWORD"

FILE="$BACKUP_DIR/db_$TIMESTAMP.dump"

echo "Starting backup: $FILE"

pg_dump -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" -F c -b -v -f "$FILE" "$PG_DB"

unset PGPASSWORD

# Check file exists
if [ ! -f "$FILE" ]; then
  echo "❌ Backup failed: file not created"
  exit 1
fi

# Keep only last 7 backups (safe version)
ls -1t "$BACKUP_DIR"/db_*.dump 2>/dev/null | tail -n +8 | xargs -r rm -f

echo "✅ Backup completed: $FILE"
