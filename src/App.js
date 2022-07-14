import {Route, Routes} from "react-router-dom";

import Navigation from "./core/components/nav/Navigation";
import Footer from "./core/components/footer/Footer";
import Welcome from "./core/components/welcome/Welcome";
import Register from "./core/components/register/Register";
import Login from "./core/components/login/Login";
import Logout from "./core/components/logout/Logout";
import Myprofile from "./core/components/myprofile/Myprofile";
import Pharmacies from "./core/components/pharmacies/Pharmacies";
import Ecart from "./core/components/ecart/Ecart";
import Products from "./core/components/products/Products";



function App() {
  return (
        <>
            <Navigation/>
            <Routes>
                <Route path="/*" exact element={<Welcome/>}/>
                <Route path="/welcome" exact element={<Welcome/>}/>
                <Route path="/register" exact element={<Register/>}/>
                <Route path="/login" exact element={<Login/>}/>
                <Route path="/logout"  element={<Logout/>} />
                <Route path="/my-profile"  element={<Myprofile/>} />
                <Route path="/pharmacies" exact element={<Pharmacies/>} />
                <Route path="/pharmacy/:id/products"  element={<Products/>} />
                <Route path="/cart"  element={<Ecart/>} />
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
