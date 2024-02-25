import React, { useState} from 'react';

//datepicker
import DatePicker from 'react-datepicker';
//datepicker css
import 'react-datepicker/dist/react-datepicker.css';
import '../datepicker.css';
//icons
import { BsCalendar } from 'react-icons/bs';

const CheckIn = () => {
  // eslint-disable-next-line
  const [startDate, setStartDate] = useState(new Date);
  const onChange = (dates) => {
    // eslint-disable-next-line
    const [start, end] = dates;
    setStartDate(start);
  };
  return (
    <div className='relative flex items-center justify-end h-full'>
      {/* icon */}
    <div className='absolute z-10 pr-8'>
      <div>
        <BsCalendar className='text-accent text-base' />
      </div>
    </div>
    <DatePicker className='w-full h-full' 
    selected={startDate} 
    onChange={onChange}
    selectsDisabledDaysInRange
     placeholderText='Check in'
    startDate={startDate}
    />
  </div>
  );
  
};

export default CheckIn;
