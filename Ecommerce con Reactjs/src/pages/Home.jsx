import ItemListContainer from "../components/itemListContainer/ItemListContainer";
import { useGetProducts } from "../hooks/useProducts";
import { useEffect } from "react";

export const Home = () => {
  //titulo de la pagina
  useEffect(() => {
    document.title = "Zapas Catamarca - Home";
  });

  //El mismo objeto que devuelve useProducts
  const { productsData } = useGetProducts("products");

  return (
    <ItemListContainer
      greeting="Bienvenidos a Zapas Catamarca"
      productsData={productsData}
    />
  );
};
