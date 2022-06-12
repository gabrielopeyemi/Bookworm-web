import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri'
import InputComponent from '../components/input';
import { API } from '../config';
import axios from 'axios';
import { useRouter } from 'next/router';
import dashboard from './dashboard';

export default function AddArticle() {

  const [title, setTitle] = useState('');
  const router = useRouter();
  const [authors, setAuthors] = useState('');
  const [journal, setJournal] = useState('');
  const [monthAndYearOfPublication, setMonthAndYearOfPublication] = useState('');
  const [volumeNumber, setVolumeNumber] = useState('');
  const [typeOfPublication, setTypeOfPublication] = useState('');
  const [nameOfPublisher, setNameOfPublisher] = useState('');
  const [DOIURL, setDOIURL] = useState('');
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [showErrorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // useEffect(() => {
  //   console.log({ KI: status.loggedIn, user: user.token })
  // }, [])
  const handleCreateArticle = async () => {
    let data = {
      title: title,
      author: authors,
      journal: journal,
      monthAndYearOfPublication: monthAndYearOfPublication,
      volumeNumber: volumeNumber,
      typeOfPublication: typeOfPublication,
      nameOfPublisher: nameOfPublisher,
      DOIURL: DOIURL
    }
    const Token = window.localStorage.getItem('TOKEN')
    console.log({Token})
    const res = await axios.post(`${API}article/create`, data, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JSON.parse(Token)}`
      }
    });
    console.log({res});
    if (res.data.success) {
      setSuccessModal(true)
      router.push('/dashboard')
      return;
    }
    setErrorModal(true);
    setErrorMessage(res.data.message)
  }
  return (

    <div>
      {showSuccessModal ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Article Success !</strong>
          <span className="block sm:inline">{title} was added successfully to your publications.</span>
          <span onClick={() => setSuccessModal(false)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
          </span>
        </div>
      ) : null}
      {showErrorModal ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Publication Creation Error !</strong>
          <span className="block sm:inline">{title} wasn't added successfully. {errorMessage}</span>
          <span onClick={() => setErrorModal(false)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
          </span>
        </div>

      ) : null}
      <section className='w-full p-9 mx-18 flex justify-center'>
        <form className='border p-5 form'>
          <h1 className='text-4xl tracking-wide	font-medium my-9'>Create article</h1>
          <InputComponent
            label='Title'
            type="text"
            id="email"
            placeholder=""
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          // required={required}
          />
          <InputComponent
            label='Authors'
            type="text"
            id="email"
            placeholder=""
            value={authors}
            onChange={(e: any) => setAuthors(e.target.value)}
          // required={required}
          />
          <InputComponent
            label='Journal'
            type="text"
            id="email"
            placeholder=""
            value={journal}
            onChange={(e: any) => setJournal(e.target.value)}
          // required={required}
          />
          <InputComponent
            label='Month and year of Publication'
            type="text"
            id="email"
            placeholder=""
            value={monthAndYearOfPublication}
            onChange={(e: any) => setMonthAndYearOfPublication(e.target.value)}
          // required={required}
          />
          <InputComponent
            label='Volume Number'
            type="text"
            id="email"
            placeholder=""
            value={volumeNumber}
            onChange={(e: any) => setVolumeNumber(e.target.value)}
          // required={required}
          />
          <InputComponent
            label='Type of Publication'
            type="text"
            id="typeOfPublication"
            placeholder=""
            value={typeOfPublication}
            onChange={(e: any) => setTypeOfPublication(e.target.value)}
          // required={required}
          />
          <InputComponent
            label='Name of Publisher'
            type="text"
            id="nameOfPublisher"
            placeholder=""
            value={nameOfPublisher}
            onChange={(e: any) => setNameOfPublisher(e.target.value)}
          // required={required}
          />
          <InputComponent
            label='DOI/URL'
            type="text"
            id="DOIURL"
            placeholder=""
            value={DOIURL}
            onChange={(e: any) => setDOIURL(e.target.value)}
          // required={required}
          />
          <span onClick={() => handleCreateArticle()} className="bg-blue-500 w-full cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create article
          </span>
        </form>

      </section>


    </div>
  )
}
