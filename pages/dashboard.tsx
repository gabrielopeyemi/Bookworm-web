/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useRouter } from 'next/router';
import Modals from '../components/Modals';
import axios from 'axios';
import { API } from '../config';
import Link from "next/link";

export default function dashboard() {

  const [showModal, setShowModal] = useState(false);
  const router = useRouter(); 
  const [data, setData] = useState([]);
  const [showSuccessDeleteModal, setSuccessDeleteModal] = useState(false);
  const [showErrorDeleteModal, setErrorDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState('');
  
  useEffect(() => {
    checkIfIsLogin()
    setIsLoading(false);
  }, []);

  const checkIfIsLogin = () => {
      if(JSON.parse(window.localStorage.getItem('ISLOGIN')!).status){
        return handleGetAllArticle();
      } else return router.push('/');
  }
  
  const handleDeleteArticle = async (id: any) => {
    try {
      const res = await axios.post(`${API}article/delete/${id.id}`,data,{
        headers: {
          'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('TOKEN')!)}` 
        }
      })


      if(res.data.success){
        setShowModal(false);
        setSuccessDeleteModal(true);
        handleGetAllArticle()
        
      }
      else {
        setShowModal(false);
        setErrorDeleteModal(true);
        setErrorMessage(res.data.message)
      }
    }
    catch(err: any){
        setShowModal(false);
      console.log(err);
      setErrorDeleteModal(true);
      setErrorMessage(err)
    }
  }

  const handleGetAllArticle = async () =>{
    try{
      const res = await axios.get(`${API}article`, { headers: {
        "Authorization" : `Bearer ${JSON.parse(window.localStorage.getItem('TOKEN')!)}`,
        'Content-Type': 'application/json',
        'Accept' : 'application/json  ',
      } })
      // console.log({ORE : res.data.data});
      setData(res.data.data);
    }catch(err){
      // console.log({ err });
    }
  };

 const handleOnClick = (id: string) => {
   setShowModal(!showModal);
   setId(id)
}


  if(isLoading){
    return <div>loading...</div>
  }

  return (

    <div>
      {showSuccessDeleteModal ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Article Delete Success !</strong>
                <span className="block sm:inline">Publication was deleted successfully from your publications.</span>
                <span onClick = {() => setSuccessDeleteModal(false)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>
            ) : null}
            {showErrorDeleteModal  ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Publication Delete Error !</strong>
                <span className="block sm:inline">Publication wasn't deleted. {errorMessage}</span>
                <span onClick = {() => setErrorDeleteModal(false)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
                </div>
            ) : null}
        <section className='w-full p-9'>
          {data.length <= 0 ? (<div>no data</div>) : data.map((EachData: any) => {
            return(
            <div className="shadow-xl p-9 flex justify-between" key={EachData._id}>
              <div>
                <span >
                  {EachData.title}.&nbsp;
                </span>
                <span className = "font-normal text-gray-400">
                  &nbsp;{EachData.author}.&nbsp;
                </span>
                <span className = "font-normal text-gray-400">
                  <i>
                    &nbsp;{EachData.journal}.&nbsp;
                  </i>
                </span>
                <span>
                    ({EachData.monthAndYearOfPublication}). {EachData.volumeNumber}, {EachData.typeOfPublication}. {EachData.nameOfPublisher}. &nbsp;
                </span>
                <a className='text-blue-700' href={EachData.DOIURL}>{EachData.DOIURL}</a>
                
              </div>
              <div className='flex justify-between'>
                <Link href={{pathname:"/edit-article",query : {id :EachData._id}}} >
                  <BiEditAlt  data-modal-toggle="defaultModal" size={20} color={'blue'} />
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>
                  <RiDeleteBin6Line size={20} color={'red'} onClick={() => handleOnClick(EachData._id)}/>
                </span>
              </div>
            </div>
          )
          })}
           
        </section>
        <Modals showModal={showModal} setShowModal={setShowModal} handleDeleteArticle={handleDeleteArticle} id={id}/>

    </div>
  )
}
