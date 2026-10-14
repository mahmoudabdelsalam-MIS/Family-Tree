import React from 'react'
import { SiReact, SiFlutter, SiGithub, SiGit , SiAngular, SiPhp, SiFigma, SiTailwindcss , SiNodedotjs , SiTypescript } from 'react-icons/si'
import bgSingleProject from '../../../assets/bgSingleProject.png'
import mobilesSela from '../../../assets/mobilesSela.png'
import SmallIconApp from './SmallIconApp'

export default function MainApp() {
  return (
    <div>
      <div className='relative flex flex-col justify-center items-center py-10 md:py-15 px-4 md:px-8 gap-6 md:gap-10 text-black z-10 overflow-hidden'>
        <div className='absolute bottom-40 -right-10 w-72 h-72 bg-primary/30 animate-pulse rounded-full blur-3xl pointer-events-none' />
        <div className='absolute top-30 -left-24 w-72 h-72 bg-primary/30 animate-pulse rounded-full blur-3xl pointer-events-none' />
        
        <div className='absolute top-[10%] left-[15%]'>
        <SmallIconApp icon={SiReact} color="#61DAFB" size={45}/>
        </div>

        <div className='absolute top-[25%] left-[8%]'>
        <SmallIconApp icon={SiFlutter} color="#02569B" size={45}/>
        </div>

        <div className='absolute top-[35%] left-[18%]'>
        <SmallIconApp icon={SiGithub} color="#181717" size={45}/>
        </div>

        <div className='absolute top-[50%] left-[12%]'>
        <SmallIconApp icon={SiAngular} color="#DD0031" size={45}/>
        </div>

        <div className='absolute top-[10%] left-[80%]'>
        <SmallIconApp icon={SiPhp} color="#777BB4" size={45}/>
        </div>

        <div className='absolute top-[25%] left-[86%]'>
        <SmallIconApp icon={SiFigma} color="#F24E1E" size={45}/>
        </div>

        <div className='absolute top-[35%] left-[75%]'>
        <SmallIconApp icon={SiTailwindcss} color="#06B6D4" size={45}/>
        </div>

        <div className='absolute top-[50%] left-[83%]'>
        <SmallIconApp icon={SiNodedotjs} color="#5FA04E" size={45}/>
        </div>

        <div className='absolute top-[65%] left-[78%]'>
        <SmallIconApp icon={SiTypescript} color="#3178C6" size={45}/>
        </div>

        <div className='absolute top-[65%] left-[18%]'>
        <SmallIconApp icon={SiGit} color="#F05032" size={45}/>
        </div>

        {/* النصوص الرئيسية */}
        <h2 className='font-bold text-xl sm:text-2xl md:text-3xl max-w-2xl text-center leading-relaxed md:leading-12 px-2'>
        تطبيق صُمّم ليحوّل الفكرة إلى تجربة استخدام سلسة، ذكية، وممتعة في كل خطوة
        </h2>
        
        <p className='font-semibold text-sm sm:text-base md:text-lg text-center text-gray-700 px-2'>
        أداءً خارق السرعة وحلًا مذهلًا يضرب في صميم احتياجات المستخدم
        </p>

        {/* أزرار المتاجر */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-2">

            <div className='bg-black border-2 md:border-3 border-black group hover:bg-white transition-all duration-300 px-4 py-2 sm:py-1.5 flex items-center justify-center rounded-xl cursor-pointer min-w-[160px]'>
            <svg className="w-7 h-7 sm:w-9 sm:h-9 mr-2" viewBox="0 0 512 512">
                <path fill="#00f0ff" d="M11 20.2C8 22.8 6 27.2 6 33v446c0 5.8 2 10.2 5 12.8l234.8-235.8L11 20.2z"/>
                <path fill="#00ea7a" d="M327.3 322.2L245.8 256l81.5-66.2 92.5 53.6c11.5 6.7 11.5 17.5 0 24.2l-92.5 54.6z"/>
                <path fill="#ffe100" d="M245.8 256L11 501.8c4.2 2.1 9.4 2.5 14.6-.5l301.7-175.1L245.8 256z"/>
                <path fill="#ff2a4d" d="M245.8 256l81.5-66.2L25.6 14.7c-5.2-3-10.4-2.6-14.6-.5L245.8 256z"/>
            </svg>
            <div className='text-white group-hover:text-black transition-colors duration-300 items-center'>
                <p className='text-lg sm:text-xl font-medium'>Google Play</p>
            </div>
        </div>

            <div className='bg-white border-2 md:border-3 border-black group hover:bg-black transition-all duration-300 px-4 py-2 sm:py-1.5 flex items-center justify-center rounded-xl cursor-pointer min-w-[160px]'>
            <svg className="w-7 h-7 sm:w-9 sm:h-9 mr-2 fill-black group-hover:fill-white transition-colors duration-300" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.31c.64-.78 1.08-1.85.96-2.93-.93.04-2.07.62-2.74 1.4-.6.7-1.12 1.8-0.98 2.87 1.04.08 2.12-.55 2.76-1.34z"/>
            </svg>
            <div className='text-black group-hover:text-white transition-colors duration-300'>
                <p className='text-lg sm:text-xl font-medium'>App Store</p>
            </div>
        </div>
        </div>

        <div className='relative flex justify-center items-center bg-secondary rounded-full w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] lg:w-[65vh] lg:h-[65vh] overflow-hidden mt-4'>
            <img 
            src={mobilesSela} 
            draggable='false' 
            alt="mobilesSela" 
            className='absolute inset-0 w-full h-full object-cover select-none'
            />
        </div>
    </div>
    </div>
  )
}