import "./header.css";

// eslint-disable-next-line react/prop-types
const Header = ({ setProductModal, setCartModal }) => {
  return (
    <div className="Header">
      <button onClick={() => setProductModal(true)}>افزودن محصول</button>
      <button onClick={() => setCartModal(true)}>افزودن سبد خرید</button>
    </div>
  );
};

export default Header;
