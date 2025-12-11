import { useParams, useLocation } from "react-router-dom";

function ProductDetails() {
  const { productId } = useParams(); // <-- Read dynamic param from URL
    const { state } = useLocation(); // get name
  return (
    <>
      <h2>Product Details</h2>
      <p>Product ID: {productId}</p>
      <p>Name: {state?.name}</p>
    </>
  );
}

export default ProductDetails;
