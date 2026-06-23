import React, { useState } from "react";

function App() {
  const products = [
    {
      id: 1,
      name: "Pizza",
      category: "Food",
      price: 250,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    },
    {
      id: 2,
      name: "Burger",
      category: "Food",
      price: 180,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    },
    {
      id: 3,
      name: "Biryani",
      category: "Food",
      price: 300,
      image: "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?w=400",
    },
    {
      id: 4,
      name: "T-Shirt",
      category: "Dress",
      price: 500,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    },
    {
      id: 5,
      name: "Jeans",
      category: "Dress",
      price: 1200,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    },
    {
      id: 6,
      name: "Saree",
      category: "Dress",
      price: 2000,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
    },
    {
      id: 7,
      name: "Watch",
      category: "Accessories",
      price: 1500,
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400",
    },
    {
      id: 8,
      name: "Bag",
      category: "Accessories",
      price: 900,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
    },
    {
      id: 9,
      name: "Shoes",
      category: "Accessories",
      price: 2200,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    },
    {
      id: 10,
      name: "Laptop",
      category: "Electronics",
      price: 50000,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    },
    {
      id: 11,
      name: "Mobile",
      category: "Electronics",
      price: 20000,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    },
    {
      id: 12,
      name: "Headphones",
      category: "Electronics",
      price: 2500,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    },
  ];

  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🛒 E-Commerce Store</h1>

      <input
        type="text"
        placeholder="Search Food, Dress, Accessories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              width="150"
            />
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p>₹{product.price}</p>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <hr />

      <h2>🛍 Cart</h2>

      {cart.map((item) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>
            ₹{item.price} × {item.quantity}
          </p>

          <button onClick={() => decreaseQty(item.id)}>
            -
          </button>

          <button onClick={() => increaseQty(item.id)}>
            +
          </button>

          <button onClick={() => removeItem(item.id)}>
            Remove
          </button>

          <hr />
        </div>
      ))}

      <h2>Total Price: ₹{totalPrice}</h2>
    </div>
  );
}

export default App;
