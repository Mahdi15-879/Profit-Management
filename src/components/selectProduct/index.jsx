/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./selectProduct.css";

const SelectProduct = ({ selectedProduct, setBuyProducts }) => {
  const [sellPrice, setSellPrice] = useState("");
  const [count, setCount] = useState("");

  const formattedNumber = (number) => {
    if (!number) return "";
    return new Intl.NumberFormat("en-US").format(number);
  };

  const getTehranDateTime = () => {
    const options = {
      timeZone: "Asia/Tehran",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const date = new Date().toLocaleString("fa-IR", options);

    const [datePart] = date.split(" ");
    return `${datePart.replace("/", "/").replace("/", "/")}`;
  };

  const currentDateTime = getTehranDateTime();

  useEffect(() => {
    setBuyProducts((prev) => {
      const updatedProducts = prev.map((product) =>
        product.productCode === selectedProduct.code
          ? { ...product, sellPrice, count }
          : product
      );

      const productExists = updatedProducts.some(
        (product) => product.productCode === selectedProduct.code
      );
      if (!productExists) {
        updatedProducts.push({
          productName: selectedProduct.title,
          productCode: selectedProduct.code,
          buyPrice: selectedProduct.buyPrice,
          sellPrice,
          count,
          currentDateTime,
        });
      }

      return updatedProducts;
    });
  }, [selectedProduct, sellPrice, count, setBuyProducts, currentDateTime]);

  return (
    <div className="select_products">
      <div className="selected_product_info">
        <div className="product_infos">
          <p>{`نام محصول: ${selectedProduct.title}`}</p>
          <p>{`کد محصول: ${selectedProduct.code}`}</p>
          <p>{`قیمت خرید: ${formattedNumber(selectedProduct.buyPrice)}`}</p>
        </div>
      </div>

      <div className="inputs">
        <label htmlFor="buyPrice">قیمت فروش:</label>
        <input
          type="number"
          id="buyPrice"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
        />
      </div>

      <div className="inputs">
        <label htmlFor="productCode">تعداد:</label>
        <input
          type="number"
          id="productCode"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SelectProduct;
