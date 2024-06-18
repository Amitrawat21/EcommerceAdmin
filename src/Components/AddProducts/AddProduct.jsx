import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from "../../assets/upload_area.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validation from '../../Validation/validation';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });

    if (isSubmitted) {
      const newFormData = {
        ...productDetails,
        [e.target.name]: e.target.value,
      };
      const validationErrors = validation({ ...newFormData, image });
      setErrors(validationErrors);
    }
  };

  const handleValidation = async (e) => {
    e.preventDefault();
    
    const validationErrors = validation({ ...productDetails, image });
    setErrors(validationErrors);
    setIsSubmitted(true);
    if (Object.keys(validationErrors).length === 0) {
      await addProduct();
    }
  };

  const addProduct = async () => {
    let product = { ...productDetails };

    const formData = new FormData();
    formData.append('product', image);

    try {
      const response = await axios.post('https://ecommercebackend-11d1.onrender.com/upload', formData, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.data.success) {
        console.log(response.data.image, "image")
        // Construct the full image URL
        const baseUrl = 'https://ecommercebackend-11d1.onrender.com';
        product.image = `${baseUrl}/images/${response.data.image}`;

        const addProductResponse = await axios.post("https://ecommercebackend-11d1.onrender.com/addProducts", product, {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          },
        });

        if (addProductResponse.data.success) {
          toast.success("Product added successfully!");
          setImage(null);
          setProductDetails({
            name: "",
            category: "",
            old_price: "",
            new_price: "",
          });
        } else {
          toast.error("Failed to add product!");
        }
      } else {
        console.error('Error uploading image:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  console.log(errors, "errors");
  console.log(isSubmitted);

  return (
    <form className='add-product' onSubmit={handleValidation}>
      <div className='add-product-itemfield'>
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type='text'
          name='name'
          placeholder='type here'
        />
      </div>
      {isSubmitted && errors.name && (
        <p style={{ color: "red" }}>{errors.name}</p>
      )}

      <div className='addproduct-price'>
        <div className='add-product-itemfield'>
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type='text'
            name='old_price'
            placeholder='type here'
          />
           {isSubmitted && errors.old_price && (
          <p style={{ color: "red" }}>{errors.old_price}</p>
        )}
        </div>
       

        <div className='add-product-itemfield'>
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type='text'
            name='new_price'
            placeholder='type here'
          />
             {isSubmitted && errors.new_price && (
          <p style={{ color: "red" }}>{errors.new_price}</p>
        )}
        </div>
     
      </div>

      <div className='add-product-itemfield'>
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name='category'
          className='add-product-selector'
        >
          <option value=''>select</option>
          <option value='women'>Women</option>
          <option value='men'>Men</option>
          <option value='kid'>Kid</option>
        </select>
        {isSubmitted && errors.category && (
        <p style={{ color: "red" }}>{errors.category}</p>
      )}
      </div>
    

      <div className='add-product-itemfield'>
        <label htmlFor='file-input'>
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className='addproduct-thumnail-img'
          />
        </label>
        <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
      </div>
      {isSubmitted && errors.image && (
        <p style={{ color: "red" }}>{errors.image}</p>
      )}

      <button type='submit' className='addproduct-btn'>
        ADD
      </button>
      <ToastContainer autoClose={2500} />
    </form>
  );
};

export default AddProduct;
