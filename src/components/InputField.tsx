import React from 'react';

const InputField = ({label, type, name, className, ...others}) => {

  return (
    <>
       { label && <label className="text-sm">{label}:</label> }
          <input
            type={type}
            name={name}
            className={ className }
            {...others}
          />
    </>
  )
}

export default InputField