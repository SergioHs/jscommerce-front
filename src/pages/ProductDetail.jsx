// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProductDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Erro ao buscar produto:", err));
  }, [id, token]);

  if (!product) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Detalhes do Produto</h2>
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </div>
  );
}

export default ProductDetail;