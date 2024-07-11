import './App.css';
import Navbar from "./Component/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Home from "./Pages/Home";
import CustomAllProductsContext from "./Contexts/AllProductContext";
import FirebaseAuth from "./Firebase/FirebaseAuth";
import CustomUserDetailsContext from "./Contexts/UserDetailsContext";
import {ToastContainer} from "react-toastify";
import {Bounce} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";


function App() {
    library.add(fas);
    const routes = createBrowserRouter([
        {
            path: "/",
            element: (
                <CustomAllProductsContext>
                    <CustomUserDetailsContext>
                        <Navbar />
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            transition={Bounce}
                        />
                    </CustomUserDetailsContext>
                </CustomAllProductsContext>
            ),
            children: [
                { index: true, element: <Home /> },
                { path: "/auth", element: <FirebaseAuth /> },
                { path: "/cart", element: <Cart /> },
                { path: "/orders", element: <Orders /> },
                { path: "*", element: <Navigate to="/" /> }
            ]
        }
    ]);

    return (
        <>
            <RouterProvider router={routes} />
        </>
    );
}

export default App;
