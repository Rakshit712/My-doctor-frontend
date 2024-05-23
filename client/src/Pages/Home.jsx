import React from 'react';
import Speciality from '../Component/Speciality';
import DoctorCard from '../Component/DoctorInfo';
import Header from '../Component/Navbar';
import Sidebar from '../Component/Sidebar';
import Footer from '../Component/Footer';


const Home = () => {
  return (
    <>
    <Header/>
      <div className='flex bg-gray-50'>
        <Sidebar/>
        <div className='flex flex-col p-5 sm:p-8 lg:ml-[250px] '> 
          {/* Your existing content */}
          <img className='w-[311px] h-[103px] sm:w-[1215px] sm:h-[405px]' src="https://my-doctors.net/assests/images/final%20banner/final%20banner.svg" alt="" />
          <h1 className='text-[42px] text-blue-700 font-bold'> 20+ Speciality</h1>
          <Speciality />
          <DoctorCard />

        </div>
      </div>
      <Footer/>
    </>
  )
}


export default Home;
