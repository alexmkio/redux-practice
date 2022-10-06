import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../features/items/itemsSlice";

export default function ItemsList() {
  const dispatch = useDispatch();
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
    content = <h3>Success</h3>;
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
