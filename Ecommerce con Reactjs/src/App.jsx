//Estilos de bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { MainRouter } from "./router/MainRouter";
import { CartProvider } from "./context/CartContext";

const App = () => {
  //coloco el proveedor y adentro el consumidor
  return (
    <div>
      <CartProvider>
        <MainRouter />
      </CartProvider>
    </div>
  );
};

export default App;
