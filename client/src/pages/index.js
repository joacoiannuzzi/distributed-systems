import { useState, useEffect } from "react";

export default function Home() {
  return (
    <div>
      <Auth />
      <GetCountryForm />
      <Products />
    </div>
  );
}

function Auth() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify({ mail, password }),
    });
    const json = await res.json();
    console.log(json);
    setResponse(json);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="mail"
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && <div>{JSON.stringify(response, null, 4)}</div>}
    </div>
  );
}

function GetCountryForm() {
  const [ip, setIp] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/getCountryByIp", {
      method: "post",
      body: JSON.stringify({ ip }),
    });
    const json = await res.json();
    console.log(json);
    setResponse(json);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="ip"
            onChange={(e) => setIp(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && <div>{JSON.stringify(response, null, 4)}</div>}
    </div>
  );
}

function Products() {
  const [products, setProducts] = useState();

  useEffect(() => {
    const f = async () => {
      const res = await fetch("/api/getAllProducts");
      const productsIdRes = await res.json();

      const productsRes = await Promise.all(
        productsIdRes.productId.map((productId) =>
          fetch("/api/getProduct", {
            method: "post",
            body: JSON.stringify({ productId }),
          }).then((res) => res.json())
        )
      );

      setProducts(productsRes);
    };
    f();
  }, []);
  return (
    <div>
      <h4>Products</h4>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            padding: 10,
          }}
        >
          <div>
            <span>Name: </span>
            <span>{product.name}</span>
          </div>
          <div>
            <span>Price: </span>
            <span>{product.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
