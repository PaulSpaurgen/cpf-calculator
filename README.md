# Singapore CPF Calculator API

A Node.js/Express backend service that calculates Central Provident Fund (CPF) contributions for employees in Singapore based on their salary, age, and citizenship status.

## Features

- Calculate CPF contributions based on:
  - Monthly wages
  - Employee age
  - Citizenship status (CITIZEN, PR_YEAR1, PR_YEAR2, PR_YEAR3)
- Handles different age groups and their respective contribution rates
- Supports 2025 CPF contribution rates
- RESTful API endpoints
- MongoDB integration for employee data management

## Setup

1. Clone the repository
2. Install dependencies
3. Start the server
4. Use the API endpoints to calculate CPF contributions

## API Usage

### Calculate CPF Contributions

**Endpoint:** `POST /api/payroll/calculate-cpf`

**Request Body:**
```json
{
  "monthlyWage": 5000,
  "age": 35,
  "citizenshipStatus": "CITIZEN",
  "additionalWages": 0,
  "yearToDateOrdinaryWages": 0,
  "yearToDateAdditionalWages": 0
}
```

**Response:**
```json

{
"employeeContribution": 1000.00,
"employerContribution": 850.00,
"totalContribution": 1850.00,
"allocation": {
"ordinaryAccount": 621.70,
"specialAccount": 162.10,
"medisaveAccount": 216.20
},
"netSalary": 4000.00
}
```

### Calculate CPF Contributions for Multiple Employees

**Endpoint:** `POST /api/payroll/calculate-cpf-bulk`

**Request Body:**
```json
[
  { "monthlyWage": 5000, "age": 35, "citizenshipStatus": "CITIZEN", "additionalWages": 0, "yearToDateOrdinaryWages": 0, "yearToDateAdditionalWages": 0 },
  { "monthlyWage": 6000, "age": 40, "citizenshipStatus": "PR_YEAR1", "additionalWages": 1000, "yearToDateOrdinaryWages": 5000, "yearToDateAdditionalWages": 1000 },
]

  // Add more employees as needed
```

**Response:**
```json
[
    {
        "employeeContribution": 1000,
        "employerContribution": 850,
        "totalContribution": 1850,
        "allocation": {
            "ordinaryAccount": 0,
            "specialAccount": 0,
            "medisaveAccount": 0
        },
        "netSalary": 4000
    },
    {
        "employeeContribution": 300,
        "employerContribution": 240,
        "totalContribution": 540,
        "allocation": {
            "ordinaryAccount": 0,
            "specialAccount": 0,
            "medisaveAccount": 0
        },
        "netSalary": 5700
    }
]
```

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB/Mongoose
- nodemon (development)

## References

Based on [CPF contribution rates for 2025](https://www.cpf.gov.sg/employer/cpf-contribution/cpf-contribution-rates) from the official CPF website.

## License

ISC
