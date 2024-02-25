import React, { useReducer } from "react";


const Checkbox = ({ id, label, }) => {
    
    const [isChecked, setIsChecked] = useReducer(checked => !checked, false);
    console.log(isChecked)
    return (
      <div className="checkbox-wrapper">
        <input
          id={id}
          type="checkbox"
          value={isChecked}
          onChange={setIsChecked}
          
        />
        <label className="p-2" htmlFor={id}>{label}</label>
      </div>
    );
  }
  
  export default Checkbox;