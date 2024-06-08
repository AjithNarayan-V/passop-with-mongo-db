import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Body = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setpasswordArray] = useState([]);

    const getpasswords = async () => {  
        let req = await fetch("http://localhost:3000/")
        // let passwords = localStorage.getItem("passwords");
        let passwords=await req.json();
        setpasswordArray(passwords);
        console.log(passwords)
    }
    useEffect(() => {
        getpasswords();
       
    }, []);

    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "text";
        } else {
            ref.current.src = "icons/eyecross.png";
            passwordRef.current.type = "password";
        }
    };

    const savePassword =async () => {
        if (form.site.length > 1 && form.username.length > 1 && form.password.length > 1) {
            const newEntry = { ...form, id: uuidv4() };

            toast('Password saved successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})})
            const updatedPasswordArray = [...passwordArray, newEntry];
            setpasswordArray(updatedPasswordArray);
            await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(newEntry)})
            // localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));

            setform({ site: "", username: "", password: "" });
        } else {
            toast('No data in fields', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(item => item.id === id);
        if (passwordToEdit) {
            setform(passwordToEdit);
            const updatedPasswordArray = passwordArray.filter(item => item.id !== id);
            setpasswordArray(updatedPasswordArray);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
        }
    };

    const deletePassword =async (id) => {
        console.log("deleting with id:",id)
        const confirmed = window.confirm("Do you want to delete?");
        if (confirmed) {
            const updatedPasswordArray = passwordArray.filter(item => item.id !== id);
            setpasswordArray(updatedPasswordArray);
            await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})})            // localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
        }
    };

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const copyText = (text) => {
        toast('Text copied', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-screen w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className='text-center mycontainer'>
                <div className='text-xl font-bold '>
                    <span className='text-green-600'>&lt;</span>
                    <span>pass</span>
                    <span className='text-green-600'>OP&gt;</span>
                </div>
                <p className='text-lg'>Your own Password Manager</p>

                <div className='flex flex-col items-center text-black gap-8 '>
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder='Enter the URL'
                        type="text"
                        className='border border-green-500 mt-3 rounded-full p-1.5 px-3 w-full'
                        name='site'
                    />
                    <div className="flex gap-4 justify-between w-full">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder='Enter User id'
                            type="text"
                            className='border border-green-500 w-full rounded-full p-1.5 px-3'
                            name='username'
                        />
                        <div className='relative w-full'>
                            <input
                                ref={passwordRef}
                                value={form.password}
                                onChange={handleChange}
                                placeholder='Enter Password'
                                type="password"
                                className='border border-green-500 w-full rounded-full p-1.5 px-3'
                                name='password'
                            />
                            <span onClick={showPassword} className='absolute right-[18px] top-[6px] cursor-pointer '>
                                <img ref={ref} className='p-1' width={26} src="icons/eyecross.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={savePassword} className='flex justify-center p-1.5 items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 w-fit border border-green-900'>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover"
                                style={{ width: '24px', height: '24px' }} // Adjust size as needed
                            ></lord-icon>
                            Add Password
                        </button>
                    </div>
                </div>

                <div className='passwords text-left'>
                    <h2 className='m-2 font-bold text-xl'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to Show</div>}
                    {passwordArray.length !== 0 &&
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-hidden rounded">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="text-center px-6 py-3">Sites</th>
                                        <th scope="col" className="text-center px-6 py-3">Username</th>
                                        <th scope="col" className="text-center px-6 py-3">Password</th>
                                        <th scope="col" className="text-center px-6 py-3">Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passwordArray.map((item, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className='flex items-start justify-center'>
                                                    <a href={item.site} target='_blank' rel="noopener noreferrer">{item.site}</a>
                                                    <div onClick={() => copyText(item.site)} className='loardiconcopytext px-2 invert size-7 top-2 items-center'>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                            trigger="hover"
                                                            style={{ width: '17px', height: '17px' }}
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className='flex items-start justify-center'>
                                                    <span>{item.username}</span>
                                                    <div onClick={() => copyText(item.username)} className='loardiconcopytext px-2 invert size-7 top-2 items-center'>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                            trigger="hover"
                                                            style={{ width: '17px', height: '17px' }}
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className='flex items-start justify-center'>
                                                    <span>{item.password}</span>
                                                    <div onClick={() => copyText(item.password)} className='loardiconcopytext px-2 invert size-7 top-2 items-center'>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                            trigger="hover"
                                                            style={{ width: '17px', height: '17px' }}
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-2 text-center">
                                                <div className='flex items-center justify-center gap-2'>
                                                    <div onClick={() => editPassword(item.id)} className='loardiconedittext  size-7 top-2 items-center'>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/vhyuhmbl.json"
                                                            trigger="hover"
                                                            style={{ width: '20px', height: '20px' }}>
                                                        </lord-icon>
                                                    </div>
                                                    <div onClick={() => deletePassword(item.id)} className='loardiconedittext invert size-7 top-2 items-center'>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                            trigger="hover"
                                                            style={{ width: '20px', height: '20px' }}>
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Body;
