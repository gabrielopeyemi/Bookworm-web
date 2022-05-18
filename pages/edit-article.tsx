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

  useEffect(() => {
      console.log(query);   
    console.log({ KI: status.loggedIn, user: user.token })

  }, []);
  const handlePostArticle =()=>{
    axios.post(`${API}/article/create`, (x) =>{
      //...data
      
    }, {
      headers: {
        'Authorization': `Basic ${token}` 
      }
    })
  };
  const handleGetArticle = async () => {
    const res = await axios.get(`${API}/article/get/${query.id}`,{headers: {
        'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('TOKEN'))}`
    }})
    console.log(res);
    console.log(res.data.data)
    const {title,author,journal,volumeNumber, typeOfPublication,nameOfPublisher,DOIURL, monthAndYearOfPublication} = res.data.data;
    res.data.success ? (

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
        <section className='w-full p-9 mx-18 flex justify-center'>
          <form className='border p-5 form'>
            <h1 className='text-4xl tracking-wide	font-medium my-9'>Edit article</h1>
            <InputComponent 
              label='Title'
              type="text" 
              id="email" 
              placeholder="" 
              value={title}
              // required={required}
            />
            <InputComponent 
              label='Authors'
              type="text" 
              id="email" 
              placeholder="" 
              value={authors}
              // required={required}
            />
            <InputComponent 
              label='Journal'
              type="text" 
              id="email" 
              placeholder="" 
              value={journal}
              // required={required}
            />
            <InputComponent 
              label='Month and year of Publication'
              type="text" 
              id="email" 
              placeholder=""
              value={monthAndYearOfPublication} 
              // required={required}
            />
            <InputComponent 
              label='Volume Number'
              type="text" 
              id="email" 
              placeholder="" 
              value={volumeNumber}
              // required={required}
            />
            <InputComponent 
              label='Type of Publication'
              type="text" 
              id="typeOfPublication" 
              placeholder="" 
              value={typeOfPublication}
              // required={required}
            />
            <InputComponent 
              label='Name of Publisher'
              type="text" 
              id="nameOfPublisher" 
              placeholder="" 
              value={nameOfPublisher}
              // required={required}
            />
            <InputComponent 
              label='DOI/URL'
              type="text" 
              id="DOIURL" 
              placeholder="" 
              value={DOIURL}
              // required={required}
            />
            <span className="bg-blue-500 w-full cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update article
            </span>
          </form>
        </section>
    </div>
  )
}
