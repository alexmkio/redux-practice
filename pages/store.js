import { useSelector } from "react-redux";
import Logout from "../components/logout";
import ItemsList from "../components/items";
import { exportAllItems } from "../features/items/itemsSlice";

export default function Store() {
  const userEmail = useSelector((state) => state.user.emailAddress);
  const userCart = useSelector((state) => state.user.cart);
  const items = useSelector(exportAllItems);
  const itemsStatus = useSelector((state) => state.items.status);

  let totalNumberOfItems;
  if (userCart) {
    totalNumberOfItems = Object.keys(userCart).reduce((acc, element) => {
      return (acc += userCart[element].qty);
    }, 0);
  }

  let totalCartCost;

  if (itemsStatus === "loading" && !userCart) {
    totalCartCost = <h3>Loading</h3>;
  } else if (itemsStatus === "succeeded" && userCart) {
    let hashTable = items.reduce((acc, element) => {
      acc[element.id] = {
        price: element.price,
      };
      return acc;
    }, {});

    let totalAmount = Object.keys(userCart)
      .reduce((acc, element) => {
        return (acc += userCart[element].qty * hashTable[element].price);
      }, 0)
      .toFixed(2);

    totalCartCost = <h3>${totalAmount}</h3>;
  } else if (itemsStatus === "failed") {
    totalCartCost = <div>{error}</div>;
  }

  return (
    <>
      <h1>User: {userEmail}</h1>
      <h2>Store</h2>
      <ItemsList />
      <h3>Total # of items in cart: {totalNumberOfItems}</h3>
      <h3>Total cost for all items in cart: {totalCartCost}</h3>
      <Logout />
    </>
  );
}
