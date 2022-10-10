import { useSelector } from "react-redux";

export default function Item({ item }) {
  const userCart = useSelector((state) => state.user.cart);
  let itemInCart = userCart.find((element) => element.item === item.id);
  if (!itemInCart) {
    itemInCart = {
      qty: 0,
    }
  }

  return (
    <article>
      <h3>{item.brand}</h3>
      <p>{item.model}</p>
      <p>{item.price}</p>
      <p>QTY: {itemInCart.qty}</p>
    </article>
  );
}
