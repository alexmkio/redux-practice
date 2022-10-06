import { useSelector } from 'react-redux'
import Logout from "../components/logout";
import ItemsList from "../components/items";

export default function Store() {
  const userEmail = useSelector(state => state.user.emailAddress)

  return (
    <>
      <h1>User: {userEmail}</h1>
      <h2>Store</h2>
      <ItemsList />
      <Logout />
    </>
  );
}
