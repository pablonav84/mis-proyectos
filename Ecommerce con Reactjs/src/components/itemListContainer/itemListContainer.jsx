import { Link } from "react-router-dom";
import { LoadingComponent } from "../LoadingComponent/LoadingComponent";
import "./itemList.css";

const ItemListContainer = ({ greeting, productsData }) => {
  return (
    productsData.length<=0 ? <LoadingComponent/> :
    <div className="title-container">
      <h1 className="title">{greeting}</h1>
      <span className="paragraph">SHOES & CLOTHES IMPORT</span>
      <div className="card-body">
        {productsData.map((products) => {
          return (
            <div className="card-content" key={products.id}>
              <div className="item">
                <figure>
              <Link to={`/item/${products.id}`}>
                <img className="imagen-style" src={products.img} />
              </Link>
              </figure>
              </div>
              <div className="card-title">{products.nombre}</div>
              <div className="card-text">
                {products.category}
                <div>Talle {products.talle}</div>
                <div>Precio ${products.precio}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemListContainer;
