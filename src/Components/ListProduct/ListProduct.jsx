import React, { useEffect, useState } from 'react';
import "./ListProduct.css";
import axios from "axios";
import cross_icon from "../../assets/cross_icon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch('https://ecommercebackend-11d1.onrender.com/getAllProduct');
      const data = await response.json();
      setAllProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const removeProduct = async (id) => {
    try {
      const res = await axios.delete(`https://ecommercebackend-11d1.onrender.com/removeProduct/${id}`);
      if (res.data.success) { // Use res.data.success instead of res.success
        toast.success("Product deleted");
      }
      await fetchInfo();
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className='list-product'>
      <h1>All Product list</h1>
      <div className='listproduct-format-main'>
        <p>Product</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr/>
        {allProducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className='listproduct-format-main listproduct-format'>
              <img src={product.image} className="listproduct-format-icon" alt="product-icon"/>
              <p>{product.name}</p>
              <p>{product.old_price}</p>
              <p>{product.new_price}</p>
              <p>{product.category}</p>
              <img className='listproduct-remove-icon' src={cross_icon} alt="remove-icon" onClick={() => removeProduct(product.id)}/>
            </div>
            <hr/>
          </React.Fragment>
        ))}
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default ListProduct;
