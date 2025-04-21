# Angular JWT Demo

This project demonstrates how to implement Authentication and Role-Based Authorization in an Angular application using JWT (JSON Web Tokens). It covers the following features:

1. JWT Authentication: Users can log in and receive a JWT token.
2. Role-Based Authorization: Restrict access to certain routes based on the user's role (e.g., `admin` or `user`).
3. Auth Guards: Protect routes from unauthorized access.
4. HTTP Interceptors: Automatically attach the JWT token to outgoing requests.
5. Signals: Use Angular Signals for reactive state management.
6. Custom Pipes: Transform data in templates using custom pipes.



## Features

 1. JWT Authentication
- Users can log in with a username and password.
- A fake JWT token is generated and stored in `localStorage`.
- The token is used to authenticate subsequent requests.

 2. Role-Based Authorization
- Users have roles (`admin` or `user`).
- Certain routes (e.g., `/admin-dashboard`) are restricted to users with the `admin` role.
- If a user without the required role tries to access a restricted route, they are redirected to a Forbidden page.

 3. Auth Guards
- Routes are protected using Angular's `CanActivate` guards.
- The `authGuard` checks if the user is authenticated and has the required role.

 4. HTTP Interceptors
- An HTTP interceptor automatically attaches the JWT token to outgoing requests.

 5. Signals
- Angular Signals are used to manage the authentication state and user role reactively.

 6. Custom Pipes
- A custom pipe (`truncate`) is used to truncate long strings in templates.

 ## Installation

1. Clone the repository:

   git clone https://github.com/CodeSoulSolutions/angular-jwt-demo.git
   
   cd angular-auth-demo

   

3. Install dependencies:

   npm install
   
   ng add @angular/material
   
   npm install jwt-decode
   
   

5. Run the application:

   ng serve
   

7. Open the application:
   Navigate to `http://localhost:4200` in your browser.



## Usage

 1. Login
- Use the following credentials to log in:
  - Admin:
    - Username: `admin`
    - Password: `admin123`
  - User:
    - Username: `user`
    - Password: `user123`


  ## Troubleshooting

 1. JWT Token Not Working
- Ensure the token includes the required claims (e.g., `role`).
- Check the `jwtDecode` function to ensure it correctly extracts the role.

 2. Role-Based Authorization Not Working
- Verify that the `authGuard` correctly checks the user's role.
- Ensure the `data: { role: 'admin' }` property is set on the restricted routes.

 3. Page Reload Loses Authentication
- Ensure the `restoreAuthState` method in `auth.service.ts` is correctly restoring the authentication state.


