import { useParams } from "react-router-dom"
import ItemListContainer from "../components/itemListContainer/itemListContainer"
import { useGetProductsByCategory} from "../hooks/useProducts";

export const Category = () => {

  const { id } = useParams();
  const { productsData } = useGetProductsByCategory(id)

  return (
    <ItemListContainer
      greeting="Bienvenidos a Zapas Catamarca"
      productsData={productsData}
    />
  );
};