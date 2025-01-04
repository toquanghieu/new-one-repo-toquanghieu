# Assignment 5


## Technology Stack

ExpressJs, TypeORM, MySQL, Swagger, Tsoa, Inversify

# Get Started
This project is a simple REST API for resources. <br/>
It uses MySQL as a database and TypeORM as an ORM.  <br/>
Tsoa for TypeScript controllers and models as the single source of truth for your API <br />
Inversify for dependency injection.<br />
Yarn as a package manager.
## Setup

```bash
$ yarn
```

Then, You need to set environment variables in `.env` file.

## Run

Run the following command. Server will start on http://localhost:4000.

```bash
$ yarn migration:run // to sync the database schema
$ yarn dev
```

# How To Use

## Create

```bash
$ curl --location 'http://localhost:4000/resources' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Test 1",
    "description": " test dsgsd sdfg sdfg sdfgsdfgsdfg",
    "status": "ACTIVE"
}'
```

```json
{
  "name": "Test 1",
  "description": " test dsgsd sdfg sdfg sdfgsdfgsdfg",
  "status": "ACTIVE",
  "id": "343831f7-25ca-46ea-a0b2-51f6542bb2ad",
  "createdAt": "2025-01-04T13:43:03.206Z",
  "updatedAt": "2025-01-04T13:43:03.206Z"
}
```

## Find

```bash
$ curl --location 'http://localhost:4000/resources/<ID>'
```

```json
  {
    "id": "343831f7-25ca-46ea-a0b2-51f6542bb2ad",
    "name": "Test 1",
    "description": " test dsgsd sdfg sdfg sdfgsdfgsdfg",
    "status": "ACTIVE",
    "createdAt": "2025-01-04T13:43:03.206Z",
    "updatedAt": "2025-01-04T13:43:03.206Z"
  }
```
## Find All

```bash
$ curl --location 'http://localhost:4000/resources?query=Test'
```

```json
[
  {
    "id": "343831f7-25ca-46ea-a0b2-51f6542bb2ad",
    "name": "Test 1",
    "description": " test dsgsd sdfg sdfg sdfgsdfgsdfg",
    "status": "ACTIVE",
    "createdAt": "2025-01-04T13:43:03.206Z",
    "updatedAt": "2025-01-04T13:43:03.206Z"
  }
]
```

## Delete

```bash
$ curl --location --request DELETE 'http://localhost:4000/resources/8f61bc3f-79e9-4855-9d67-a7f0b2a0d3d5'
```

```json
{
  "raw": [],
  "affected": 1
}
```

## Update

```bash
curl --location --request PUT 'http://localhost:4000/resources/343831f7-25ca-46ea-a0b2-51f6542bb2ad' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Test 4",
    "description": " test dsgsd sdfg sdfg sdfgsdfgsdfg",
    "status": "ACTIVE"
}'
```

```json
{
  "id": "343831f7-25ca-46ea-a0b2-51f6542bb2ad",
  "name": "Test 4",
  "description": " test dsgsd sdfg sdfg sdfgsdfgsdfg",
  "status": "ACTIVE",
  "updatedAt": "2025-01-04T13:54:49.000Z"
}
```