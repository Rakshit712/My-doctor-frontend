import React from 'react';

const DoctorCard = () => {
    return (
        <>
            <h1>100+ Doctor</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div className="bg-white border rounded-lg shadow-md  md:w-[380px] md:h-[314px] p-5 ">
                    <div className='flex flex-row  gap-5'>
                        <div className="bg-gray-400 rounded-full p-2 w-[100px] h-[100px]">
                            <svg
                                className="w-[80px] h-[80px] text-white "
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                />
                            </svg>
                        </div>
                        <div className="">
                            <p className="text-lg font-semibold text-gray-800">Dr. Catalina Cummings</p>
                            <p className="text-sm text-gray-600">Bachelor of Naturopathy Sciences | Masters in Practice overview</p>
                            <p className="text-sm text-gray-600">Development Behavioral Pediatrics</p>
                            <p className="text-sm text-gray-600">31 years experience</p>
                            <div className="mt-4">
                                <div className='flex gap-5'>
                                    <p className="text-sm font-semibold">Hospital</p>
                                    <p className="text-sm text-gray-600">Not available</p>
                                </div>
                                <div className='flex gap-5'>
                                    <p className="text-sm font-semibold">Languages</p>
                                    <p className="text-sm text-gray-600">Gujarati, Malayalam, Urdu</p>
                                </div>
                                <div className='flex gap-5'>
                                    <p className="text-sm font-semibold mt-2">Next available</p>
                                    <p className="text-sm p-2"><span className="text-green-600">04-Jul</span></p>
                                </div>
                                <button className="border px-4 py-2 rounded-[50px] mt-5 text-blue-300">
                                    BOOK APPOINTMENT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div className="bg-white border rounded-lg shadow-md  md:w-[380px] md:h-[314px] p-5 ">
                    <div className='flex flex-row  gap-5'>
                        <div className="bg-gray-400 rounded-full p-2 w-[100px] h-[100px]">
                            <svg
                                className="w-[80px] h-[80px] text-white "
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                />
                            </svg>
                        </div>
                        <div className="">
                            <p className="text-lg font-semibold text-gray-800">Dr. Stan D'Amore</p>
                            <p className="text-sm text-gray-600">Bachelor of Naturopathy Sciences | Masters in Practice overview</p>
                            <p className="text-sm text-gray-600">Development Behavioral Pediatrics</p>
                            <p className="text-sm text-gray-600">31 years experience</p>
                            <div className="mt-4">
                                <div className='flex gap-5'>
                                    <p className="text-sm font-semibold">Hospital</p>
                                    <p className="text-sm text-gray-600">Not available</p>
                                </div>
                                <div className='flex gap-5'>
                                    <p className="text-sm font-semibold">Languages</p>
                                    <p className="text-sm text-gray-600">Gujarati, Malayalam, Urdu</p>
                                </div>
                                <div className='flex gap-5'>
                                    <p className="text-sm font-semibold mt-2">Next available</p>
                                    <p className="text-sm p-2"><span className="text-green-600">04-Jul</span></p>
                                </div>
                                <button className="border px-4 py-2 rounded-[50px] mt-5 text-blue-300">
                                    BOOK APPOINTMENT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div className="bg-white border rounded-lg shadow-md  md:w-[380px] md:h-[314px] p-5 ">
                    <div className='flex flex-row  gap-5'>
                        <div className="bg-gray-400 rounded-full p-2 w-[100px] h-[100px]">
                            <svg
                                className="w-[80px] h-[80px] text-white "
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                />
                            </svg>
                        </div>
                        <div className="">
                            <p className="text-lg font-semibold text-gray-800">Dr. Cathrine Muller</p>
                            <p className="text-sm text-gray-600">Bachelor of Naturopathy Sciences | Masters in Practice overview</p>
                            <p className="text-sm text-gray-600">Development Behavioral Pediatrics</p>
                            <p className="text-sm text-gray-600">31 years experience</p>
                            <div className="mt-4">
                                <div className='flex gap-5'>
                                    <p className="text-sm font-semibold">Hospital</p>
                                    <p className="text-sm text-gray-600">Not available</p>
                                </div>
                                <div className='flex gap-5'>
                                    <p className="text-sm font-semibold">Languages</p>
                                    <p className="text-sm text-gray-600">Gujarati, Malayalam, Urdu</p>
                                </div>
                                <div className='flex gap-5'>
                                    <p className="text-sm font-semibold mt-2">Next available</p>
                                    <p className="text-sm p-2"><span className="text-green-600">04-Jul</span></p>
                                </div>
                                <button className="border px-4 py-2 rounded-[50px] mt-5 text-blue-300">
                                    BOOK APPOINTMENT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            </div>
            

        </>
    );
};

export default DoctorCard;
