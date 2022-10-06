import Logout from "../components/logout";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Store() {
  const userEmail = useSelector(state => state.user.emailAddress)
  const [items, setItems] = useState([]);
  const itemsCollectionRef = collection(db, "items");

  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(itemsCollectionRef);
      setItems(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      console.log(items);
    };

    getItems();
  }, []);

  return (
    <>
      <h1>User: {userEmail}</h1>
      <h2>Store</h2>
      <Logout />
    </>
  );
}
