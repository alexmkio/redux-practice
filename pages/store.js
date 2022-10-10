import { useSelector } from "react-redux";
import Logout from "../components/logout";
import ItemsList from "../components/items";

export default function Store() {
  const userEmail = useSelector((state) => state.user.emailAddress);
  const userCart = useSelector((state) => state.user.cart);

  const totalNumberOfItems = userCart.reduce((acc, element) => {
    return (acc += Number(element.qty));
  }, 0);

  return (
    <>
      <h1>User: {userEmail}</h1>
      <h2>Store</h2>
      <h3>Total # of items in cart: {totalNumberOfItems}</h3>
      <ItemsList />
      <Logout />
    </>
  );
}
