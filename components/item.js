export default function Item({ item }) {
  return (
    <article>
      <h3>{item.brand}</h3>
      <p>{item.model}</p>
      <p>{item.price}</p>
    </article>
  );
}
