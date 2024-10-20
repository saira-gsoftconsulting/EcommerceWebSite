import React, { useState } from "react";
import { FaColumns, FaSearch } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { BsViewList } from "react-icons/bs";
import CustomInput from "../common/inputField/inputField";
const ShopSlideBar = ({
  searchQuery,
  setSearchQuery,
  gridView,
  totalResults,
  visibleProducts,
  products,
  toggleGridView,
  handleProductsToShowChange,
  setSortOption,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const applyFilter = (inputValue) => {
    const filteredSuggestions = products.filter((product) =>
      product.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };
  const handleSearch = (value) => {
    setSearchQuery(value);
    applyFilter(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (product) => {
    setSearchQuery(product.name);
    setShowSuggestions(false);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="bg-[#F9F1E7] py-4 px-4 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center w-full lg:gap-6">
          <div className="relative w-full md:w-72 lg:w-auto">
            <div className="flex items-center bg-white border border-gray-400 rounded w-full">
              <FaSearch className="absolute left-3 text-gray-500" />
              <CustomInput
                placeholder="Search Product"
                className="pr-10 pl-10 py-3 w-full"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchQuery}
              />
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute top-full left-0 bg-white border border-gray-300 rounded mt-1 w-full z-50 max-h-48 overflow-y-auto">
                {suggestions.map((product, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(product)}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex gap-4 items-center md:w-72 lg:w-auto">
            <label htmlFor="sort" className="text-lg">
              Sort by:
            </label>
            <select
              id="sort"
              className="border border-gray-300 rounded px-3 py-1"
              onChange={handleSortChange}
            >
              <option value="default">Default</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>

          <div className="flex gap-4 items-center md:w-72 lg:w-auto">
            <label htmlFor="productsToShow" className="text-lg">
              Show:
            </label>
            <select
              id="productsToShow"
              className="border border-gray-300 rounded px-3 py-1"
              onChange={(e) => handleProductsToShowChange(e.target.value)}
            >
              {[4, 8, 12, 16, 20, 24, 28, 32].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-36 gap-4 w-full justify-between">
          <div className="flex gap-6 items-center justify-center">
            <IoGrid
              className="cursor-pointer text-2xl"
              onClick={() => toggleGridView("grid")}
            />
            <BsViewList
              className="cursor-pointer text-2xl"
              onClick={() => toggleGridView("list")}
            />
            <FaColumns
              className="cursor-pointer text-2xl"
              onClick={() => toggleGridView("column")}
            />
          </div>
          <p className="text-black text-center lg:text-left">
            {totalResults > 0 ? `Showing 1-${visibleProducts} results of ${totalResults}` : "No results found"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopSlideBar;
