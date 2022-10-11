import { useSelector, useDispatch } from "react-redux";
import {
  incrementItemCount,
  decrementItemCount,
} from "../features/user/userSlice";

export default function Item({ item }) {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.user.cart);

  let matchingItemInCart;

  if (userCart) {
    matchingItemInCart = userCart[item.id];
  }

  if (!matchingItemInCart) {
    matchingItemInCart = {
      qty: 0,
    };
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
      <h3>{item.brand}</h3>
      <p>{item.model}</p>
      <p>{item.price}</p>
      <p>QTY: {matchingItemInCart.qty}</p>
      <button value="increment" onClick={(event) => handleClick(event)}>
        Increment
      </button>
      {decrementButton}
    </article>
  );
}
