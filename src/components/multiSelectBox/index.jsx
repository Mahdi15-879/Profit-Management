/* eslint-disable react/prop-types */
import { useState } from "react";
import "./multiSelectBox.css";
import arrowIcon from "../../assets/Arrow-Bottom-Icon.svg";
import checked from "../../assets/icon-checked-white.svg";
// import clothes from "../../assets/clothes.svg";

const MultiSelectBox = ({
  title,
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [itemsClicked, setItemsClicked] = useState(false);

  const itemClickedHandler = (option) => {
    const isOptionSelected = selectedOptions.includes(option);
    const updatedOptions = isOptionSelected
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
  };

  return (
    <div className="multi_select">
      <div
        className={`select_btn ${itemsClicked ? "open" : ""}`}
        onClick={() => setItemsClicked(!itemsClicked)}
      >
        <span className="btn_text">
          {title ? (
            title
          ) : (
            <>
              {selectedOptions?.length}
              {`لیست محصولات`}
            </>
          )}
        </span>

        <figure className="arrow_icon">
          <img src={arrowIcon} alt="Arrow Icon" />
        </figure>
      </div>

      {options.length > 0 ? (
        <ul className="list_items">
          {options.map((option) => (
            <li
              className="item"
              key={option.code}
              onClick={() => itemClickedHandler(option)}
            >
              {selectedOptions.includes(option) ? (
                <div className="check_icon">
                  <figure>
                    <img src={checked} alt="Check Icon" />
                  </figure>
                </div>
              ) : (
                <span className="checkbox"></span>
              )}
              <div className="item_info">
                {/* <figure>
                  <img src={option.img ? option.img : clothes} alt="product" />
                </figure> */}

                <div className="item_infos">
                  <h6>{`نام محصول: ${option.title}`}</h6>
                  <p>{`کد محصول: ${option.code}`}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="empty_list_items">
          <li className="item">محصولی به لیست اضافه نشده است!</li>
        </ul>
      )}
    </div>
  );
};

export default MultiSelectBox;
