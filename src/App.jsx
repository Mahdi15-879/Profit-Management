/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import Modal from "./components/modal";

function App() {
  const [productModal, setProductModal] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [sellProducts, setSellProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("buyProducts")) || [];
  });

  const closeModalHandler = () => {
    setProductModal(false);
    setCartModal(false);
  };

  function processProductData(products) {
    const groupedData = products.reduce((acc, item) => {
      const dateTime = item.currentDateTime || "Unknown";
      if (!acc[dateTime]) {
        acc[dateTime] = {
          currentDateTime: dateTime,
          items: [],
          allCounts: 0,
          totalBuyPrice: 0,
          totalSellPrice: 0,
          profit: 0,
        };
      }

      const count = parseFloat(item.count || 0);
      const buyPrice = parseFloat(item.buyPrice || 0);
      const sellPrice = parseFloat(item.sellPrice || 0);

      acc[dateTime].allCounts += count;
      acc[dateTime].totalBuyPrice += buyPrice * count;
      acc[dateTime].totalSellPrice += sellPrice * count;
      acc[dateTime].profit =
        acc[dateTime].totalSellPrice - acc[dateTime].totalBuyPrice;

      acc[dateTime].items.push(item);

      return acc;
    }, {});

    return Object.values(groupedData);
  }

  const formattedNumber = (number) => {
    if (!number) return "";
    return new Intl.NumberFormat("en-US").format(number);
  };

  function removeProduct(product) {
    setSellProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter((item) => item !== product);
      localStorage.setItem("buyProducts", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  }

  useEffect(() => {
    const result = processProductData(sellProducts);
    setProductsList(result);
  }, [sellProducts, setProductsList]);

  return (
    <>
      <Header setCartModal={setCartModal} setProductModal={setProductModal} />

      <Modal
        show={cartModal || productModal}
        onClose={closeModalHandler}
        kind={cartModal ? "cart" : "product"}
        setSellProducts={setSellProducts}
      />

      <div className="products_list">
        {productsList?.length < 1 ? (
          <p className="empty-msg">لیست محصولات خالی است!</p>
        ) : (
          productsList.map((item, index) => (
            <div className="product_item" key={index}>
              <div className="product_info">
                <p
                  style={{
                    backgroundColor: "#1cadf0",
                    color: "#fff",
                    width: "100%",
                    padding: "0.5rem",
                    boxSizing: "border-box",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >{`تاریخ: ${item.currentDateTime.replace(/,$/, "")}`}</p>
                <p>{`مجموع قیمت خرید: ${formattedNumber(
                  item.totalBuyPrice
                )}`}</p>
                <p>{`مجموع قیمت فروش: ${formattedNumber(
                  item.totalSellPrice
                )}`}</p>
                <p>{`سود بدست آمده: ${formattedNumber(item.profit)}`}</p>
                <p>{`تعداد محصولات فروش رفته: ${item.allCounts}`}</p>
              </div>

              {item.items.map((innerItem, innerIndex) => (
                <div className="inner_products" key={innerIndex}>
                  <div className="inner_products_info">
                    <p>{`نام محصول: ${innerItem.productName}`}</p>
                    <p>{`کد محصول: ${innerItem.productCode}`}</p>
                    <p>{`قیمت خرید: ${formattedNumber(innerItem.buyPrice)}`}</p>
                    <p>{`قیمت فروش: ${formattedNumber(
                      innerItem.sellPrice
                    )}`}</p>
                    <p>{`تعداد: ${innerItem.count}`}</p>
                  </div>

                  <button
                    className="delete_btn"
                    onClick={() => removeProduct(innerItem)}
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
