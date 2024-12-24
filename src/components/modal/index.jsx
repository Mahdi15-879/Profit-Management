import { useState, useEffect } from "react";
import "./modal.css";
import Backdrop from "../backdrop";
import MultiSelectBox from "../multiSelectBox";
import SelectProduct from "../selectProduct";

import clothes from "../../assets/clothes.svg";

// eslint-disable-next-line react/prop-types
const Modal = ({ show, onClose, kind, setSellProducts }) => {
  const [baseCode, setBaseCode] = useState([clothes]);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [buyProducts, setBuyProducts] = useState([]);

  const fileChangeHandler = (event) => {
    const files = event.target.files;
    const file = files[0];

    const maxSizeInBytes = 1 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert(
        "اندازه فایل بزرگ‌تر از ۱ مگابایت است! لطفاً فایل کوچک‌تری انتخاب کنید."
      );
      return;
    }

    getBase(file);
  };

  const getBase = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBaseCode([reader.result]);
    };
  };

  const handleAddProduct = () => {
    if (!productName || !productCode || !buyPrice) {
      setBaseCode([clothes]);
      setProductName("");
      setProductCode("");
      setBuyPrice("");
      onClose();
      return;
    }

    const newProduct = {
      img: baseCode,
      productName,
      productCode,
      buyPrice,
    };

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    existingProducts.push(newProduct);

    localStorage.setItem("products", JSON.stringify(existingProducts));

    setBaseCode([clothes]);
    setProductName("");
    setProductCode("");
    setBuyPrice("");
    onClose();
  };

  const handleAddBuyProducts = () => {
    const invalidProduct = buyProducts.find(
      (product) => !product.sellPrice || !product.count
    );

    if (invalidProduct) {
      alert("قیمت فروش یا تعداد یکی از محصولات به درستی وارد نشده است!");
      return;
    }

    const existingBuyProducts =
      JSON.parse(localStorage.getItem("buyProducts")) || [];

    const updatedBuyProducts = [...existingBuyProducts, ...buyProducts];

    localStorage.setItem("buyProducts", JSON.stringify(updatedBuyProducts));
    setSellProducts(updatedBuyProducts);

    setSelectedOptions([]);
    setBuyProducts([]);
    onClose();
  };

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    setOptions(
      products.map((product) => ({
        code: product.productCode,
        title: product.productName,
        img: product.img,
        buyPrice: product.buyPrice,
      }))
    );
  }, [productName]);

  return (
    <>
      <Backdrop
        show={show}
        onClose={() => {
          onClose();
          setBaseCode([clothes]);
          setProductName("");
          setProductCode("");
          setBuyPrice("");
          setSelectedOptions([]);
        }}
      />
      <div
        className="Modal"
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? "1" : "0",
          minHeight: kind === "cart" ? "90%" : undefined,
          maxHeight: kind === "cart" ? "90%" : undefined,
        }}
      >
        <div className="Modal_Header">
          <p>{kind === "cart" ? "افزودن سبد خرید" : "افزودن محصول"}</p>

          <button
            onClick={() => {
              onClose();
              setBaseCode([clothes]);
              setProductName("");
              setProductCode("");
              setSelectedOptions([]);
              setBuyPrice("");
            }}
          >
            بستن
          </button>
        </div>

        {kind === "cart" ? (
          <div className="Product">
            <MultiSelectBox
              title="محصولات"
              options={options}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />

            <div className="products">
              {selectedOptions?.map((item, index) => (
                <SelectProduct
                  selectedProduct={item}
                  setBuyProducts={setBuyProducts}
                  key={index}
                />
              ))}
            </div>

            <button className="add_product" onClick={handleAddBuyProducts}>
              افزودن
            </button>
          </div>
        ) : (
          <div className="Product">
            <div className="image-container">
              <figure>
                <img src={baseCode} alt="product" />
              </figure>
              <label htmlFor="fileInput">
                <p>افزودن تصویر</p>
                <input
                  id="fileInput"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={fileChangeHandler}
                />
              </label>
            </div>

            <div className="inputs">
              <label htmlFor="productName">نام محصول:</label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="inputs">
              <label htmlFor="productCode">کد محصول:</label>
              <input
                type="number"
                id="productCode"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
              />
            </div>

            <div className="inputs">
              <label htmlFor="buyPrice">قیمت خرید:</label>
              <input
                type="number"
                id="buyPrice"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
              />
            </div>

            <button className="add_product" onClick={handleAddProduct}>
              افزودن
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;
