import { createContext, useState } from "react";

//creo el contexto
export const CartContext = createContext();

//creo el proveedor que es el que provee los datos a los componentes hijos
export const CartProvider = ({ children }) => {
  const [count, setCount] = useState([]);

  return (
    <CartContext.Provider value={{ count, setCount }}>
      {[children]}
    </CartContext.Provider>
  );
};
