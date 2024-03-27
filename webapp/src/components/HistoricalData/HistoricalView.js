import React, { useState } from 'react'
export default function HistoricalView() {
      return (
        <div className='globalHistoricalView'>
          <HistoricalGameElement  />
          <br />
          <HistoricalGameElement  />
          <br />
          <HistoricalGameElement  />
        </div>
      )
}


function HistoricalGameElement(){
  function handleClick (){
    setToggle(!toggle);
  };
  const [toggle, setToggle] = useState(false);
  return (
    <div className='centered-div'>
      <button className="historicalButton" onClick={handleClick}>Toggle State</button>

      <ul style={{ display: toggle ? 'block' : 'none' }}>
        <li>An item</li>
        <li>A second item</li>
        <li>A third item</li>
        <li>A fourth item</li>
        <li>And a fifth one</li>
      </ul>

    </div>
  );
}