import ContextApi from "./ContextApi.jsx";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function Clock1() {
  const { clock, message1 } = useContext(ContextApi);

  const productList = [
    { id: 101, name: "Laptop" },
    { id: 102, name: "Smartphone" },
    { id: 103, name: "Headphones" },
  ];

  return (
    <div className="flex flex-col justify-center items-center bg-red-400">
      <h1 className="text-4xl font-bold mb-4">Clock Component 1</h1>
      {clock < 16 && <p className="text-lg mb-6">Current Clock: {clock}</p>}

      {clock > 5 && (
        <h2 className="text-2xl font-semibold text-green-700">{message1}</h2>
      )}

      <h2>Products</h2>
      <ul>
        {productList.map((p) => (
          <li key={p.id}>
            <Link to={`/products/${p.id}`} state={{ name: p.name }}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
