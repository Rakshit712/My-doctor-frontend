import React from 'react'

const Speciality = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='sm:w-[371px]  bg-white sm:h-[190px] border '>
                <div className='flex flex-col  items-center p-10'>
                    <img className='w-[100px] items-center' src="https://my-doctors.net/assests/images/specialities/g/gastroenterology.svg" />
                    <p className='mt-3' >Gastroenterology</p>
                </div>
            </div>
            <div className='sm:w-[371px]  bg-white sm:h-[190px] border '>
                <div className='flex flex-col  items-center p-10'>
                    <img className='w-[100px] items-center' src="https://my-doctors.net/assests/images/specialities/c/child%20&%20adolescent%20psychiatry.svg" />
                    <p className='mt-3' >Child & Adolescentc Psychiatry</p>
                </div>
            </div>
            <div className='sm:w-[371px]  bg-white sm:h-[190px] border '>
                <div className='flex flex-col  items-center p-10'>
                    <img className='w-[100px] items-center' src="https://my-doctors.net/assests/images/specialities/e/endocrinology%20&%20diabetology.svg" />
                    <p className='mt-3' >Endocrinology & Diabetology</p>
                </div>
            </div>
            <div className='sm:w-[371px]  bg-white sm:h-[190px] border '>
                <div className='flex flex-col  items-center p-10'>
                    <img className='w-[100px] items-center' src="https://my-doctors.net/assests/images/specialities/b/bone%20marrow.svg" />
                    <p className='mt-3'>Bone Marrow</p>
                </div>
            </div>
            <div className='sm:w-[371px]  bg-white sm:h-[190px] border '>
                <div className='flex flex-col  items-center p-10'>
                    <img className='w-[100px] items-center' src="https://my-doctors.net/assests/images/specialities/a/anesthesiology.svg" />
                    <p className='mt-3'>Anesthesiology</p>
                </div>
            </div>
            <div className='sm:w-[371px]  bg-white sm:h-[190px] border '>
                <div className='flex flex-col  items-center p-10'>
                    <img className='w-[100px] items-center' src="https://my-doctors.net/assests/images/specialities/b/breast%20&%20oncoplastic%20-%20oncology.svg" />
                    <p className='mt-3'>Breast & Oncoplastic-Oncology</p>
                </div>
            </div>
            <h1 className='text-[22px] text-blue-500'>View all Speciality</h1>
        </div>
    )
}

export default Speciality