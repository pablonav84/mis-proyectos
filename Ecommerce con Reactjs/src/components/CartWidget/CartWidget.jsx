import { useContext } from 'react'
import { CartContext } from '../../context/CartContext';
import "./CartWidget.css";
import { Link } from 'react-router-dom';

const CartWidget = () => {
  const { count } = useContext(CartContext);

  const totalQuantity = count.reduce((total, item) => total + item.quantity, 0);
  
  return (
<Link to="/cart">
    <div className="seeCarrito">
      🛒
      {totalQuantity}
    </div>
    </Link>
  );
};

export default CartWidget;
