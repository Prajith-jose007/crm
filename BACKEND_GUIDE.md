# FleetSell CRM Backend Developer Guide

This backend has been developed based on the provided CRM HTML template. All fields find in the forms have been mapped to a robust MySQL relational database via Prisma ORM.

## Setup Instructions

1.  **Configure Environment**:
    Open `.env` and set your `DATABASE_URL` with your MAMP MySQL credentials.
    ```env
    DATABASE_URL="mysql://root:root@localhost:8889/fleetsell_crm"
    ```

2.  **Initialize Database**:
    Run migrations to create the tables:
    ```bash
    npx prisma migrate dev --name init
    ```

3.  **Seed Data**:
    Populate the database with initial samples from the original HTML:
    ```bash
    npx prisma db seed
    ```

4.  **Start Development Server**:
    ```bash
    npm run dev
    ```

## Field Mapping Reference

| HTML Form ID | Database Table | Database Column | Notes |
| :--- | :--- | :--- | :--- |
| `o-client` | `opportunities` | `client_name` | Autocomplete |
| `o-yacht` | `opportunities` | `yacht` | |
| `v-summary` | `visit_reports` | `summary` | TEXT |
| `c-fname` | `contacts` | `first_name` | |
| `co-class` | `companies` | `classification` | ENUM |

## API Endpoints

-   `GET /api/opportunities`: Fetch all opportunities from the database.
-   `POST /api/opportunities`: Create a new opportunity.

---

*Backend developed by Antigravity AI.*
