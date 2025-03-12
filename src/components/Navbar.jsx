import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
      <div className="mycontainer flex justify-between items-center px-4 py-5  h-14">
      <div className="logo font-bold text-white text-2xl" >
         <span className='text-green-700'> &lt;</span>
          <span>Pass</span><span className='text-green-700'>OP/&gt;</span> 
        
        
        </div>

        <button className='text-white bg-green-700 my-5 rounded-full flex justify-between items-center'>
           <img className="invert p-1 w-7" src="github.png" alt="git"/>
           <span className='font-bold px-1'> GitHub</span>
        </button >
      </div>
    </nav>
  )
}

export default Navbar
