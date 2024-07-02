# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Description
(1) Features

--> User Authentication: Sign up and login functionality using Firebase Authentication.
--> Product Catalog: Display of products fetched from an external API (FakeStoreAPI).
--> Shopping Cart: Add/remove items to/from the cart, update quantities, and view total prices.
--> Order Management: View past orders and details.
--> Responsive Design: Optimized for various screen sizes using Bootstrap.

(2) Technologies Used
--> React
--> Firebase (Authentication, Firestore)
--> React Router DOM
--> Bootstrap
--> React Toastify
--> Styled Components

(3) Usage
--> Sign Up/Sign In: Create a new account or log into an existing one.
--> Browse Products: Navigate through different product categories.
--> Add to Cart: Click "Add to Cart" on any product to add it to your shopping cart.
--> View Cart: Review items in your cart, adjust quantities, or remove items.
--> Place Order: Proceed to checkout to finalize your order.
--> View Orders: Access your order history and details of previous purchases.

(4) Project Structure 
busy-buy-react/
│
├── public/
│   └── index.html
│
├── src/
│   ├── Components/
│   │   ├── CartItem.js
│   │   ├── Navbar.js
│   │   ├── OrderTable.js
│   │   ├── ProductCard.js
│   │   └── ...
│   │
│   ├── Contexts/
│   │   ├── AllProductsContext.js
│   │   └── UserDetailsContext.js
│   │
│   ├── Firebase/
│   │   └── FirebaseInit.js
│   │
│   ├── Pages/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   └── SignUp.js
│   │   ├── Cart.js
│   │   ├── Home.js
│   │   ├── NotFound.js
│   │   └── Orders.js
│   │
│   ├── App.js
│   ├── index.js
│   └── ...
│
├── .gitignore
├── package.json
└── README.md

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
