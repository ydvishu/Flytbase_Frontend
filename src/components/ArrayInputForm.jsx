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
        Enter Array
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>
      <button className='bg-pink-600 px-6 py-2 rounded-md h-10 shadow-md my-6 font-medium' onClick={handleAddToArray}>Add to Array</button>
      <button className='bg-pink-600 px-6 py-2 rounded-md h-10 shadow-md my-6 font-medium' onClick={()=> console.log(arrayData)}>Console Log</button>

      
    </div>
  );
};

export default ArrayInputForm;
