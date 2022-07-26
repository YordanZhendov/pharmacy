# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Pharmacy Project
This is a project, which helps the different pharmacies to trade eachother.

Every pharmacy can upload its own products and purchase products from the other pharmacies.

1. On the Welcome Page (/welcome) - there is the purpose of the application.
2. On Pharmacies (/pharmacies) - there are all pharmacies, which are in the application.
3. On Products (/pharmacy/:id/products) - there are all products of the certain pharmacy, that has been chosen before that.
 3.1 Product can be added and updated only by the owner of the pharmacy. The owner cannot buy its own products.
 3.2 Product can be bought only by other pharmacies.
4. On Myprofile (/my-profile) every Profile can see its pharmacies and products that are already in the ecart.
5. On Ecart (/cart) pharmacy can purchase the products that have been purchased.
6. On Login (/login) A new registed pharmacy can enter the app.
7. On Register (/register) A new pharmacy can register itself. The are some check of the data that has been added.
8. Index page is actualy the welcome Page.

## Project Technologies

*** The project is separeted into 4 main Fails: api, components, css, context.
API -> All requrest and fetches are made here.
Components -> All components that are needed to build the interface.
CSS -> The css of the components.
Context -> The StoreController with all reducers inside it.

The STORE has been provided to the index.js in order to give acces to all components to it.

1. Redux has been used, in order to have a common store for the whole application.
2. CSS has been used to make the design better. The css is separeted by module to be better support.
3. Routing has been use to switch the content between the views.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

