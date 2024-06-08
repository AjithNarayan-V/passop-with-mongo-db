import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="bg-white shadow  dark:bg-gray-800">
                <div className="w-full flrex mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 flex">© 2023 <a href="" className="hover:underline"><div className='text-sm font-bold'>
                        <span className='text-green-600'>&lt;</span>
                        <span >pass</span>
                        <span className='text-green-600'>OP&gt;</span>
                    </div></a>. All Rights Reserved.
                    </span>
                    <span className='flex text-gray-400'>Created with &nbsp; <img className='w-3 mt-1 justify-center' src="/icons/heart.png" alt="love" />&nbsp; by Ajith Narayan</span>
                    <ul className="flex flex-wrap items-center mt-3 tex t-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
            </footer>

        </>
    )
}

export default Footer