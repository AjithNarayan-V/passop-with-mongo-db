import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-900'>
            <div className=' flex justify-around p-3  text-white text-center '>
                <div className='text-2xl font-bold'>
                    <span className='text-green-600'>&lt;</span>
                    <span >pass</span>
                    <span className='text-green-600'>OP&gt;</span>
                </div>
                {/* <div>
                    <ul className='flex gap-3'>
                        <li className='hover:font-bold'><a href="/">Home</a></li>
                        <li className='hover:font-bold'><a href="/">About</a></li>
                        <li className='hover:font-bold'><a href="/">Contact</a></li>
                    </ul>
                </div> */}
               <a href="https://github.com/AjithNarayan-V" target='_blank'>
                <button className="github flex">
                    <img src="/icons/github.svg" alt="Github" className='invert w-9' />
                    <span className='pt-2 pl-2 '>Github</span>
                </button>
                </a>

            </div>
        </nav >
    )
}

export default Navbar