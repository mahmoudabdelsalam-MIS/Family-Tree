import React from 'react'

export default function SingleFeatureProject({icon : Icon , title , desc}) {
  return (
    <div className='flex flex-col justify-center items-center gap-3 text-black mx-auto'>
        <div className='flex justify-center items-center w-15 h-15 rounded-full bg-[#85DB8429]'>
        <div className='flex justify-center items-center rounded-lg w-10 h-10 bg-[#72DC6059]'>
            <div className='flex justify-center items-center w-8 h-8 rounded-lg bg-linear-to-l from-white to-gray/10'>
        {Icon && <Icon className=" text-red-400"/>}
            </div>

        </div>
        </div>
        <div dir='rtl' className='flex flex-col justify-center items-center gap-3'>
        <h4 className='font-bold text-2xl'>{title}</h4>
        <p className='text-md text-center font-semibold max-w-xs'>{desc}</p>
        </div>
      
    </div>
  )
}
