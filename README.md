# Redux and Firebase Practice

This is a sandbox built for my personal exploration of [Redux](https://redux.js.org/), [Redux Toolkit](https://redux-toolkit.js.org/), and [Firebase](https://firebase.google.com/).

The application is a currently a work in progress and is not currently deployed and can not be run locally.

## Technologies Used

This application is written in JavaScript utilizing the [Next.js](https://nextjs.org/) framework.

## Features

- User authentication
  - User can sign up, login, and logout
- When a user logs in their cart and item information are fetched and dispatched to two Redux slices. This attempts to mimic a data model in which item information (availability, price, etc) are disjointed from the user's cart. I can imagine a scenario in which the price updates or availability changes since the last time a user logged in and added items to their cart.
- Firebase's onSnapshot function is utilized to listen for realtime updates to user information and dispatch these changes to the User slice
- A user can increment the quantity of each item in their cart.
  - If the item does not exist in their cart create it (i.e. "update" cart field). Otherwise, just update it's qty field.
- A user can decrement the quantity of each item in their cart.
  - If the item qty becomes 0 then delete it from their cart (i.e. remove field). Otherwise, just update it's qty field.
- Show the total number of items in their cart
- Show the total cost of all items in their cart

## Contributors

This application was built by [Alex Kio](https://www.linkedin.com/in/alexkio/); a Front End Engineer at [Rightpoint](https://www.rightpoint.com/).
