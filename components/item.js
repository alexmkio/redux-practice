import { useSelector, useDispatch } from "react-redux";
import {
  incrementItemCount,
  decrementItemCount,
} from "../features/user/userSlice";

export default function Item({ item }) {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.user.cart);

  let matchingItemInCart;
  let extendedPrice;

  if (userCart) {
    matchingItemInCart = userCart[item.id];
    extendedPrice = (userCart[item.id].qty * item.price).toFixed(2);
  } else {
    matchingItemInCart = {
      qty: 0,
    };
    extendedPrice = 0;
  }

  let decrementButton;

  if (matchingItemInCart.qty > 0) {
    decrementButton = (
      <button value="decrement" onClick={(event) => handleClick(event)}>
        Decrement
      </button>
    );
  }

  const handleClick = (event) => {
    if (event.target.value === "increment") {
      dispatch(incrementItemCount(item.id));
    } else if (event.target.value === "decrement") {
      dispatch(decrementItemCount(item.id));
    }
  };

  return (
    <article>
      <h3>Brand: {item.brand}</h3>
      <p>Model: {item.model}</p>
      <p>Price per unit: ${item.price}</p>
      <p>QTY in cart: {matchingItemInCart.qty}</p>
      <p>Extended Price: ${extendedPrice}</p>
      <button value="increment" onClick={(event) => handleClick(event)}>
        Increment
      </button>
      {decrementButton}
    </article>
  );
}
