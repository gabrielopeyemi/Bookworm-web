import React from 'react';

interface PropsArgs{
  label: string;
  onChange?: any;
  id?: string;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'password' | 'email';
  value?: string;
  types?: string;
  sectionData?: any
}

export default function InputComponent({label, onChange, required, id, placeholder, type, value, types, sectionData}: PropsArgs) {
  if(types === 'section'){
    return(
      <div className="mb-6">
        <label className="block mb-2 text-sm font-light text-gray-900 dark:text-gray-300">
            {label}
        </label>
        <select  onChange={onChange} id="countries" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {/* <option selected>Choose a country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
        <option value="DE">Germany</option> */}
          {sectionData.map((eachSection: any) => (
            <option value={eachSection} key={eachSection} selected={eachSection === value ? true : false}>{eachSection}</option>
          ))}
        </select>
      </div>
    )
  }
  if (types === 'date'){
    return (
      <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
      </div>
      {/* <input type="year" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/> */}
  <input type="month" id="bdaymonth" name="bdaymonth"/>
  <input type="submit"/>
    </div>
    )
  }
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
