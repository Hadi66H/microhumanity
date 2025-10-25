This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The app uses components from [shadcn](https://ui.shadcn.com/) to ensure consistency and support dark/light modes.

## Getting Started

To run the development server

1. clone the project.
2. run `npm ci` to install the dependencies
3. Add a `.env` file in the root folder. Create a clone of [.env.example](/.env.example) file and update the properties values from actual supabase project.
4. Run `npm run dev` (This will start development server)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Project details

The project uses app-routing (folder based).

## Middleware

`middleware` file is responsible for:

- Authentication
- protected routes
- redirecting to login if user is not authenticated
- redirecting to dashboard if user is authenticated

## Frontend structure

- /app/auth contains
  - login
  - singup
- /app/dashboard contains
  - the dashboard default page. Everything created for the dashboard is under this folder.
  - /app/dashboard/\* contains the folder structures and subpages under folder. If put there, these are auto protected using middleware

It is recommended, not to use Supabase on the FE app and avoid using it. It was created only to be used by the login/ signup. In case if it is needed, use via the `supabase.client.ts`

## API Architecture

The BE api architecture follows the following architecture:
* All the routes are created under `/app/api` folder
* All the routes are by default protected by middleware. 
    * In case an api needs to be opted out, add that route in middleware under `unprotectedRoutes` 

The API architecture should follow following conventions to have a clean and encapsulated structure
* `route.ts` file should only be used to receive and send response
* `src/lib/be/core/<controller>` should be used by the route file for all the processing. 
    * This controller file contains logic and functions for one or multiple routes
    * Move the computations logic to a util folder for the controller and name it `<controllerName>Util`
* `src/lib/be/db/core/<tableNameInCamelCase>.js` is used to fetch data from the DB. 
    * It provides 1 to 1 mapping of BE <-> DB.
    * Whatever the table name is in DB in snakecase should be used here in CamelCase
    * These files should be in `js` format. This is only used to write query and no types are required. Controller handles all the logic for the parsing and should be responsible for types
    * `withSupabase` function should always be used in the DB files to always have an authenticated connection for the DB and handle the exceptions/error automatically

## Deploy on Vercel

1. Run `npm run build` and see if the build passes. 
2. On the vercel connect this repository in the vercel. 
3. Copy and paste the environmental variables in the vercel. 
4. Click on "Deploy"
5. The vercel app will perform a build and deployed

In case of future commits, the new changes will be deployed automatically.