# Auth-Server
 Handle Basic Authentication (user provides a username + password) and OAuth (user authenticates through a 3rd party). When a “good” login happens, the user is considered to be “authenticated” and our auth-server generates a JWT signed “Token” which is returned to the application


# Access Control
# LAB - 14

## Deployment Test

### Author: Spencer Lazzar

- [tests report](https://github.com/codefellows/code-401-javascript-example-lab/actions)
- [front-end](https://code-401-js-lab-example.herokuapp.com/status)

### Setup

#### `.env` requirements

- `PORT` - 3000

#### Running the app

- `npm start`
- Endpoint: `/status`
  - Returns Object

    ```javascript
    {
      "domain": "john-api-server.demo.herokuapp.com",
      "status": "running",
      "port": 42123
    }
    ```

#### Tests

- Unit Tests: `npm run test`
- Lint Tests: `npm run lint`

Authentication Server Phase 4: Role Based Access Control

Being able to login is great. But controlling access at a more granular level is vital to creating a scalable system. In this lab, you will implement Role Based Access Control (RBAC) using an Access Control List (ACL), allowing to not only restrict access to routes for valid users, but also based on the individual permissions we give each user.
