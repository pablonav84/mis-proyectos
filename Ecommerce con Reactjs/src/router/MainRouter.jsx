//Permite el ruteo entre las paginas
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBarComponent from "../components/NavBarComponent/NavBarComponent";
import { Home } from "../pages/Home";
import { Category } from "../pages/Category";
import { ItemDetailContainer } from "../pages/ItemDetailContainer";
import { CreateProduct } from "../pages/CreateProduct";
import { Cart } from "../pages/cart";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

//Traigo el NavBar para que sea un hijo del MainRouter
