import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../features/home/Home'
import ErrorPage from '../features/common/ErrorPage'
import Layout from '../features/layout/Layout'
import Products from '../features/products/Products'
import AboutUs from '../features/aboutUs/AboutUs'
import ContactUs from '../features/ContactUs/ContactUs'
import SingleProject from '../features/SingleProject/SingleProject'
import NotFound from '../features/common/NotFound'
import Blog from '../features/blog/Blog'
import SinglePodcast from '../features/singlePodcast/SinglePodcast'
import SingleNew from '../features/singleNew/SingleNew'



const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                index:true,
                element:(
                <Home/>
            )
            },
            {
                path: "aboutUs",
                element:<AboutUs/>
            },
            {
                path: "blog",
                element:<Blog/>
            },
            {
                path: "contactUs",
                element:<ContactUs/>
            },
            {
                path: "products",
                element:(
                <Products/>
            )
            }, 
            {
                path: "singleProject",
                element:(
                <SingleProject/>
            )
            },
            {
                path: "singlePodcast",
                element:(
                <SinglePodcast/>
            )
            },            {
                path: "singleNew",
                element:(
                <SingleNew/>
            )
            },
            ]
        },
        {
        path: "*",
        element:(
        <NotFound/>
    )
    },
])

export default function AppRouter() {
  return (
    <RouterProvider router={router}/>
  )
}
