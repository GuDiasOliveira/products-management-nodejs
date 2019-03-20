# Products management API

## Setup and run

1. Install dependencies;

```bash
npm install
```

2. Copy `.env.example` file to `.env`;

```bash
cp .env.example .env
```

3. Open `.env` and fill the environment variables;

4. Open your MySQL and create the database (replace `your_database_name`);

```sql
CREATE DATABASE your_database_name;
```

5. Run app with.

```bash
npm start
```

## Build Docker container

1. Build image. Replace `yourtag`.

```bash
docker build -t yourtag .
```

## Deploy in Docker

There is a [docker compose file example](docker-compose.yml) that you can use, modificating according to your demand.
