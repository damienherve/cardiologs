# Cardiologs

This project is my answer to the Cardiolog's Technical Test

## Preview

<p align="center" >
  <kbd>
    <img src="images/preview.gif" title="Cardiologs Demo" float="left">
  </kbd>
  <br>
  <em>Cardiologs Technical Test</em>
</p>

## Installation

To start the project, run

```
# Install dependencies
yarn

# Install iOS Pods (only needed if you want to run on iOS)
npx pod-install

# Start Android Project...
yarn android

# ... or iOS Project
yarn ios
```

Don't forget to run the test server on localhost:3000 (default config). If you want to change the server url, you can edit it in src/config/axios.ts

```
export const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});
```

## Architecture

This project is written in TypeScript

The src folder structure is very simple

```
src |
    |- api // API to connect to the test Server (only one endpoint)
    |- components // List of all the components developped for this tiny project
    |- config // Configuration files
    |- screens // Only one screen here (all the functions and filters have been implemented here)

```

## Technical Stack

This project use the following core librairies:

- Axios: API Management
- Styled-components: CSS-to-JS Library to create reusable components

The project was quiet simple:

- Single page App
- One Get call to retrieve a list of Cards

For these reasons, i choosed to not use a complex state library like Redux, MobX and co. but only use the built-in hooks provided by React (useState) to control the data.

Obviously, this is not a scalable architecture, we probably need an advanced state management and/or cache library (like React Query) for production projects. But for the scope of this technical test, it's sufficient.

For the same reason, we didn't use a navigation library (like React Navigation) as it is a single page app.

## How it works

The cards are fetch at the start of the app (directly in the screen, not a very good practice but ok for a technical test).

The cards are ordered by status by default (pending -> rejected -> done) and have a color code to better reognize their current status

The user can:

- filter the cards by patient name or by arrhythmia type using the search input at the top of the screen
- filter the cards by selecting one or none of the status filters (Pending, Rejected, None)
- Change the status of a card by clicking the white button in it (the title of the button indicates the destination status).

Obviously, if a status filter is on, and you click on a button to change the status of a displayed card, this card will disappear as it doesn't respect the status filter anymore. You can disable the status filter (or set it to the new status) to display the card and see its new status.

## Time spent

I made this project in approximatly 5 hours divided like:

- 1h: Create project and configuration (libraries, TS, aliases, folder structure...)
- 10m: Axios Config and API
- 2h: Components creation
- 1h: Filtering system
- 1h: Bug fix and style optimization (still pretty ugly !)

Unfortunatly, i can't spend much time on this project, so the tests are missing (sorry for that).
