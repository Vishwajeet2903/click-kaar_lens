# CLICK-KAAR Lens Backend

Spring Boot 3.4 REST backend for the CLICK-KAAR Lens Angular application.

## Stack

- Java 21
- Spring Boot 3.4
- Spring Web, Data JPA, Security, Validation, Actuator
- JWT authentication
- MySQL 8 only
- Lombok
- Swagger/OpenAPI
- Maven

## Run Locally

Create a MySQL database or let the JDBC URL create it:

```bash
mvn spring-boot:run
```

Default local settings use:

- `DB_URL=jdbc:mysql://localhost:3306/clickkaar_lens?...`
- `DB_USERNAME=root`
- `DB_PASSWORD=root`
- `PORT=8080`

Important environment variables:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
JWT_EXPIRATION
JWT_REFRESH_EXPIRATION
FRONTEND_URL
ADMIN_EMAIL
ADMIN_PASSWORD
```

## Docker

```bash
docker compose up --build
```

## API Docs

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`
- Health: `http://localhost:8080/actuator/health`

## Main API Groups

- `/api/v1/auth`
- `/api/v1/users`
- `/api/v1/services`
- `/api/v1/occasions`
- `/api/v1/business`
- `/api/v1/enquiries`
- `/api/v1/contact`
- `/api/v1/bookings`
- `/api/v1/blogs`
- `/api/v1/ideas`
- `/api/v1/join-applications`
- `/api/v1/partner-applications`
- `/api/v1/locations`
- `/api/v1/notifications`
- `/api/v1/admin/**`

## Notes

The backend is configured for stateless JWT auth, environment-driven MySQL credentials, JPA auditing, seed data, role-based admin APIs, SPA-safe CORS configuration, and Cloud Run compatible port binding.
