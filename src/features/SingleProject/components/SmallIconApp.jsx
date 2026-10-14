import React from 'react'

export default function SmallIconApp({className ="" , icon : Icon , size , color}) {
  return (
    <div className='hidden md:block absolute z-20 animate-[bounce_4s_ease-in-out_infinite] hover:scale-110 transition-transform duration-500' >
    <div className={`${className} w-16 h-16 rounded-full flex justify-center items-center p-1`}>
      {Icon && <Icon size={size} color={color}/>}
    </div>
    </div>
  )
}
