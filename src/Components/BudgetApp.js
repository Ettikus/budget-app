import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './App.css'; // Import your CSS file for BudgetApp styling

const BudgetApp = () => {
  const [budget, setBudget] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryAmount, setNewCategoryAmount] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [newSubcategoryAmount, setNewSubcategoryAmount] = useState('');

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleBudgetChange = (event) => {
    const value = event.target.value;
    setBudget(value);
  };

  const handleCategoryAmountChange = (categoryIndex, event) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].amount = event.target.value;
    setCategories(updatedCategories);
  };

  const handleSubcategoryAmountChange = (categoryIndex, subIndex, event) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].subcategories[subIndex].amount = event.target.value;
    setCategories(updatedCategories);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const addCategory = () => {
    if (newCategoryName.trim() !== '' && newCategoryAmount.trim() !== '') {
      setCategories([
        ...categories,
        {
          name: newCategoryName,
          amount: newCategoryAmount,
          subcategories: [],
        },
      ]);
      setNewCategoryName('');
      setNewCategoryAmount('');
    }
  };

  const addSubcategory = (categoryIndex) => {
    if (newSubcategoryName.trim() !== '' && newSubcategoryAmount.trim() !== '') {
      const updatedCategories = [...categories];
      updatedCategories[categoryIndex].subcategories.push({
        name: newSubcategoryName,
        amount: newSubcategoryAmount,
      });
      setCategories(updatedCategories);
      setNewSubcategoryName('');
      setNewSubcategoryAmount('');
    }
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleDeleteSubcategory = (categoryIndex, subIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].subcategories.splice(subIndex, 1);
    setCategories(updatedCategories);
  };

  return (
    <div className="budget-app">
      <div ref={componentRef}>
        <h1>My Budget App</h1>
        <label htmlFor="budgetInput">Set Budget:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            id="budgetInput"
            value={budget}
            onChange={handleBudgetChange}
            placeholder="Enter budget amount"
          />
          <select onChange={handleCurrencyChange} value={selectedCurrency}>
            {['USD', 'GBP', 'EUR', 'ZAR'].map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="categories">
          <h2>Categories</h2>
          <div style={{ display: 'flex' }}>
            {categories.map((category, index) => (
              <div key={index} className="category-item">
                <div>
                  <h3>
                    {category.name}
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteCategory(index)}
                    >
                      Delete
                    </button>
                  </h3>
                  <input
                    type="number"
                    value={category.amount}
                    onChange={(e) => handleCategoryAmountChange(index, e)}
                  />
                </div>
                <div>
                  {category.subcategories.map((subcategory, subIndex) => (
                    <div key={subIndex} className="subcategory-item">
                      <span>{subcategory.name}</span>
                      <input
                        type="number"
                        value={subcategory.amount}
                        onChange={(e) => handleSubcategoryAmountChange(index, subIndex, e)}
                      />
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteSubcategory(index, subIndex)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <div>
                    <input
                      type="text"
                      value={newSubcategoryName}
                      onChange={(e) => setNewSubcategoryName(e.target.value)}
                      placeholder="Enter subcategory name"
                    />
                    <input
                      type="number"
                      value={newSubcategoryAmount}
                      onChange={(e) => setNewSubcategoryAmount(e.target.value)}
                      placeholder="Enter subcategory amount"
                    />
                    <button onClick={() => addSubcategory(index)}>Add Subcategory</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name"
            />
            <input
              type="number"
              value={newCategoryAmount}
              onChange={(e) => setNewCategoryAmount(e.target.value)}
              placeholder="Enter category amount"
            />
            <button onClick={addCategory}>Add Category</button>
          </div>
        </div>

        {/* Remaining JSX content... */}
      </div>
      <button onClick={handlePrint}>Download PDF</button>
    </div>
  );
};

export default BudgetApp;
