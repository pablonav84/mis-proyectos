import { collection, getFirestore, addDoc } from "firebase/firestore";
import { useState } from "react";

export const CreateProduct = () => {
  const [nombre, setNombre] = useState("");
  const [talle, setTalle] = useState("");
  const [precio, setPrecio] = useState("0");
  const [img, setImg] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleFieldReset = () => {
    setNombre("");
    setTalle("");
    setPrecio("");
    setImg("");
    setCategoria("");
  };
  const handleCreateProduct = () => {
    const data = {
      categoria,
      img,
      nombre,
      precio,
      talle,
    };
    if (
      categoria === "" ||
      img === "" ||
      nombre === "" ||
      precio === "" ||
      talle === ""
    ) {
      return alert("Todos los campos son obligatorios");
    }
    
    const db = getFirestore();

    const productsCollection = collection(db, "products");
    addDoc(productsCollection, data).then(({ id }) => {
      alert("Producto creado, id: ", id);
      handleFieldReset();
    });
  };

  return (
    <div>
      <h1>Crear Producto</h1>
      <input
        type="text"
        placeholder="categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />
      <input
        type="text"
        placeholder="imagen"
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />
      <input
        type="text"
        placeholder="nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="number"
        placeholder="precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <input
        type="text"
        placeholder="talle"
        value={talle}
        onChange={(e) => setTalle(e.target.value)}
      />
      <button onClick={handleCreateProduct}>Crear Producto</button>
    </div>
  );
};
