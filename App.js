import React, { useState } from "react";

function App() {
  const products = [
    {
      id: 1,
      name: "Pizza",
      category: "Food",
      price: 250,
      image: "https://via.placeholder.com/150?text=Pizza",
    },
    {
      id: 2,
      name: "Burger",
      category: "Food",
      price: 180,
      image: "https://via.placeholder.com/150?text=Burger",
    },
    {
      id: 3,
      name: "Biryani",
      category: "Food",
      price: 300,
      image: "https://via.placeholder.com/150?text=Biryani",
    },
    {
      id: 4,
      name: "T-Shirt",
      category: "Dress",
      price: 500,
      image: "https://via.placeholder.com/150?text=TShirt",
    },
    {
      id: 5,
      name: "Jeans",
      category: "Dress",
      price: 1200,
      image: "https://via.placeholder.com/150?text=Jeans",
    },
    {
      id: 6,
      name: "Saree",
      category: "Dress",
      price: 2000,
      image: "https://via.placeholder.com/150?text=Saree",
    },
    {
      id: 7,
      name: "Watch",
      category: "Accessories",
      price: 1500,
      image: "https://via.placeholder.com/150?text=Watch",
    },
    {
      id: 8,
      name: "Bag",
      category: "Accessories",
      price: 900,
      image: "https://via.placeholder.com/150?text=Bag",
    },
    {
      id: 9,
      name: "Shoes",
      category: "Accessories",
      price: 2200,
      image: "https://via.placeholder.com/150?text=Shoes",
    },
    {
      id: 10,
      name: "Laptop",
      category: "Electronics",
      price: 50000,
      image: "https://via.placeholder.com/150?text=Laptop",
    },
    {
      id: 11,
      name: "Mobile",
      category: "Electronics",
      price: 20000,
      image: "https://via.placeholder.com/150?text=Mobile",
    },
    {
      id: 12,
      name: "Headphones",
      category: "Electronics",
      price: 2500,
      image: "https://via.placeholder.com/150?text=Headphones",
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