import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri'
import InputComponent from '../components/input';
import { AuthContext } from '../dataStores/authContext';
import { API } from '../config';
import { useRouter } from "next/router";
import axios from 'axios';

export default function AddArticle() {

  const router = useRouter();
  const query = router.query;
  const name = query.name;

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [journal, setJournal] = useState('');
  const [monthAndYearOfPublication, setMonthAndYearOfPublication] = useState('');
  const [volumeNumber, setVolumeNumber] = useState('');
  const [typeOfPublication, setTypeOfPublication] = useState('');
  const [nameOfPublisher, setNameOfPublisher] = useState('');
  const [DOIURL, setDOIURL] = useState('');
  const { status, user } = useContext<any>(AuthContext);
  const [_id, setId] = useState('');
  const [showErrorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setSuccessModal] = useState(false);
  useEffect(() => {
    console.log(query);
    console.log({ KI: status.loggedIn, user: user.token })

  }, []);
  const handleUpdateArticle = async () => {
    let submitData = {
      title: title,
      author: authors,
      journal: journal,
      monthAndYearOfPublication: monthAndYearOfPublication,
      volumeNumber: volumeNumber,
      typeOfPublication: typeOfPublication,
      nameOfPublisher: nameOfPublisher,
      DOIURL: DOIURL
    };
    const res = await axios.post(`${API}/article/update/${_id}`, submitData, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('TOKEN'))}`
      }
    })
    console.log(res);

    if (res.data.success) {
      setSuccessModal(true);
      router.push('/dashboard');
    }
    else {
      setErrorMessage(res.data.message);
      setErrorModal(true);
    }
  };
  const handleGetArticle = async () => {
    const res = await axios.get(`${API}/article/get/${query.id}`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('TOKEN'))}`
      }
    })
    console.log(res);
    console.log(res.data.data)
    const { _id, title, author, journal, volumeNumber, typeOfPublication, nameOfPublisher, DOIURL, monthAndYearOfPublication } = res.data.data;
    res.data.success ? (
      setId(_id),
      setTitle(title),
      setAuthors(author),
      setJournal(journal),
      setMonthAndYearOfPublication(monthAndYearOfPublication),
      setVolumeNumber(volumeNumber),
      setTypeOfPublication(typeOfPublication),
      setNameOfPublisher(nameOfPublisher),
      setDOIURL(DOIURL)

    ) : null

  }

  handleGetArticle();
  return (

    <div>
      {showSuccessModal ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Article Update Success !</strong>
          <span className="block sm:inline">{title} was added successfully to your publications.</span>
          <span onClick={() => setSuccessModal(false)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
          </span>
        </div>
      ) : null}
      {showErrorModal ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Update Error !</strong>
          <span className="block sm:inline">{title} wasn't updated successfully. {errorMessage}</span>
          <span onClick={() => setErrorModal(false)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
          </span>
        </div>

      ) : null}
      <section className='w-full p-9 mx-18 flex justify-center'>
        <form className='border p-5 form'>
          <h1 className='text-4xl tracking-wide	font-medium my-9'>Edit article</h1>
          <InputComponent
            label='Title'
            type="text"
            id="title"
            placeholder=""
            value = {title}
            onChange= {(e: any) => setTitle(e.target.value)}
          // required={required}
          />
          <InputComponent
            label='Authors'
            type="text"
            id="authors"
            placeholder=""
            onChange= {(e: any) => setAuthors(e.target.value)}
            value={authors}
          // required={required}
          />
          <InputComponent
            label='Journal'
            type="text"
            id="journal"
            placeholder=""
            onChange= {(e: any) => setJournal(e.target.value)}
            value={journal}
          // required={required}
          />
          <InputComponent
            label='Month and year of Publication'
            type="text"
            id="monthAndYearOfPublication"
            placeholder=""
            onChange= {(e: any) => setMonthAndYearOfPublication(e.target.value)}
           value={monthAndYearOfPublication}
          // required={required}
          />
          <InputComponent
            label='Volume Number'
            type="text"
            id="volumeNumber"
            placeholder=""
            onChange= {(e: any) => setVolumeNumber(e.target.value)}
            value = {volumeNumber}
          // required={required}
          />
          <InputComponent
            label='Type of Publication'
            type="text"
            id="typeOfPublication"
            placeholder=""
            onChange= {(e: any) => setTypeOfPublication(e.target.value)}
          // required={required}
          />
          <InputComponent
            label='Name of Publisher'
            type="text"
            id="nameOfPublisher"
            placeholder=""
            onChange= {(e: any) => setNameOfPublisher(e.target.value)}
          // required={required}
          />
          <InputComponent
            label='DOI/URL'
            type="text"
            id="DOIURL"
            placeholder=""
            onChange= {(e: any) => setDOIURL(e.target.value)}
          // required={required}
          />
          <span onClick={() => handleUpdateArticle()} className="bg-blue-500 w-full cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update article
          </span>
        </form>
      </section>
    </div>
  )
}
