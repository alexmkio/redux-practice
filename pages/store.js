import Logout from "../components/logout";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Store() {
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
      <h1>Store</h1>
      <Logout />
    </>
  );
}
