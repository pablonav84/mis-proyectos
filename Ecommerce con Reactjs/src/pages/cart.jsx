import { useContext, useEffect, useState } from "react";
// import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { CartContext } from "../context/CartContext";

export const Cart = () => {
  const [ setProducts] = useState([]);
  const { count } = useContext(CartContext);

  const idList = count.map((item) => item.id);

  useEffect(() => {
    const db = getFirestore();
    for (let i = 0; i < idList.length; i++) {
      const docRef = doc(db, "products", idList[i]);
      getDoc(docRef).then((doc) => {
        setProducts((prevState) => [
          ...prevState,
          { id: doc.id, ...doc.data() },
        ]);
      });
    }
  }, [count]);
  return count.length === 0 ? <h1>No hay productos en el carrito</h1> : null;
};
