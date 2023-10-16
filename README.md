<img width="1028" alt="Metasky" src="https://github.com/chudasamajd/User-Dashboard/assets/12470982/a3b8c680-146b-4cb2-b91b-857e0d935443">

## Overview
The User Dashboard Project is a web application built using modern technologies like Next.js, TypeScript, Material-UI (MUI), NextAuth, Redux, and custom hooks. The main objective of this project is to provide user authentication and access control, allowing users to log in and view a dashboard containing a list of users. This project is not only focusing on state management, data fetching, and protected routes, but also on pushing from the UI side. Have added minimal UI with some micro animation.

## Demo 
https://github.com/chudasamajd/User-Dashboard/assets/12470982/125e454b-d1b3-4b1a-98d4-0bb276f05d84

## Features
- Login Page: The project includes a login page with dummy login details for user authentication. I have implemented an endpoint that fetch random users data from API and show as verified user. If user try to login with different details then it show Invalid account error. So this way i tried to replicate actual database integration.
- User Table: The dashboard displays a table containing a list of users. The user data is fetched from a dummy API. For dashboard we restricted to 10 records only. If we need more data then we can simply add pagination for chunk request.
- Persistent Login State: After successful login, the app remembers the login state. If the user is logged in, they won't be redirected to the login page. Conversely, if the user isn't logged in, they won't have access to the user list.
- User Search: Users can search for other users by their name, enabling a more efficient way to find specific users in the list. User can search using first or last name from available list.

## Technologies Used
Next.js, TypeScript, Material-UI (MUI), NextAuth, Redux, Custom Hooks   

## Load Time and Performance Management
- Server-Side Rendering: I've adopted Server-Side Rendering as the primary rendering method for this project. SSR generates pages on the server, sending fully-rendered HTML to the client, which improves initial load times.
- Code splitting: This strategy divides the JS bundles into smaller, more manageable chunks, resulting in faster page loads.
- Image optimization: I've used nextJS Image component which loaded on-demand when they're needed, reducing the initial load time of the application.
- Data fetching: To reduce data fetching time, I used server-side data fetching where applicable. 
