import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:4000";

  useEffect(() => {
    if (cartItems === undefined) {
      setCartItems({});
    }
  }, [cartItems]);

  // Fetch Food List from API
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // Load Cart Data
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  // Add to Cart with Active Status Check
  const addToCart = async (itemId) => {
    const foodItem = food_list.find((item) => item._id === itemId);
    if (foodItem && !foodItem.active) {
      toast.error("This item is currently unavailable");
      return;
    }
    
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    
    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));
    
    if (token) {
      try {
        await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };

  const clearCart = () => {
    setCartItems({});
  };

  const getTotalCartAmount = () => {
    const validCartItems = cartItems || {};
  return Object.keys(validCartItems).reduce((total, itemId) => {
    const itemInfo = food_list.find((product) => product._id === itemId);
    return itemInfo ? total + itemInfo.price * validCartItems[itemId] : total;
  }, 0);
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    clearCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
