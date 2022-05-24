import React from 'react';

interface PropsArgs{
  label: string;
  onChange?: any;
  id?: string;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'password' | 'email';
  value?: string;
}

export default function InputComponent({label, onChange, required, id, placeholder, type, value}: PropsArgs) {
  return (
    <div className="mb-6">
        <label className="block mb-2 text-sm font-light text-gray-900 dark:text-gray-300">
            {label}
        </label>
        <input 
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
            type={type} 
            id={id}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            value={value}
        />
    </div>
  )
}
