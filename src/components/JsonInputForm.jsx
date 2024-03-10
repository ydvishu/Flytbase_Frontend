import React, { useState } from 'react';

const JsonInputForm = ({setUserProvidedData}) => {
  const [jsonData, setJsonData] = useState('');
  const [parsedData, setParsedData] = useState(null);

  const handleInputChange = (event) => {
    setJsonData(event.target.value);
  };

  const handleParseJson = () => {
    try {
      const parsedJson = JSON.parse(jsonData);
      console.log(parsedData)
      setParsedData(parsedJson);
      setUserProvidedData(parsedData);
    } catch (error) {
      console.error('Error parsing JSON:', error.message);
      setParsedData(null);
    }
  };

  return (
    <div className='flex gap-4 p-3'>
      <textarea
        className='p-2'
        value={jsonData}
        onChange={handleInputChange}
        placeholder="Enter JSON data here"
        rows={1}
        cols={40}
      />
      <br />
      
      <button className='bg-pink-600 px-6 py-2 rounded-md h-10 shadow-md my-6 font-medium'
            onClick={handleParseJson}
            >Parse JSON</button>
      <br />
      {/* {parsedData && (
        <div>
          <h2>Parsed JSON Data:</h2>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default JsonInputForm;
