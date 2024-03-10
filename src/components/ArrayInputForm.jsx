import React, { useState } from 'react';

const ArrayInputForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [arrayData, setArrayData] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddToArray = () => {
    // Assuming the input is comma-separated values
    const newArray = inputValue.split(',').map(item => item.trim());
    setArrayData(newArray);
    setInputValue('');
  };

  return (
    <div>
      <label>
        Enter Array (comma-separated values):
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>
      <button onClick={handleAddToArray}>Add to Array</button>

      <div>
        <h2>Array Data:</h2>
        <pre>{JSON.stringify(arrayData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ArrayInputForm;
