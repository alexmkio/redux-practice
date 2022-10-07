import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems, exportAllItems } from "../features/items/itemsSlice";
import Item from "./item";

export default function ItemsList() {
  const dispatch = useDispatch();
  const items = useSelector(exportAllItems);
  const itemsStatus = useSelector((state) => state.items.status);
  const error = useSelector((state) => state.items.error);

  useEffect(() => {
    if (itemsStatus === "idle") {
      dispatch(fetchItems());
    }
  }, [itemsStatus, dispatch]);

  let content;

  if (itemsStatus === "loading") {
    content = <h3>Loading</h3>;
  } else if (itemsStatus === "succeeded") {
    content = items.map((item) => <Item key={item.id} item={item} />);
  } else if (itemsStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section>
      <h2>Items</h2>
      {content}
    </section>
  );
}
