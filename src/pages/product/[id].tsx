import { useRouter } from "next/router";

const Product = () => {
    const { query } = useRouter();

  return (
    <div>
      <h1>Produto</h1>
    </div>
  );
};

export default Product;
