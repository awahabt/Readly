import React from 'react'
import {Instagram, Facebook, Linkedin} from 'lucide-react';


export default function Footer() {
  return (
    <footer className='bg-gray-800 text-white py-8 sm:640px md:768px lg:1024px xl:1280px 2xl:1536px'>
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between">
                {/* Logo and short description section */}
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h2 className="text-xl font-bold mb-4"> Readly</h2>
                <p>Welcome to the Readly Pakistan's largest Online books Marketplace
                    <br />
                    admin@readly.com
                </p>
                </div>
                {/* Quick Links */}
                <div className='w-full md:w-1/4 mb-6 md:mb-0'>
                <h2 className="text-xl font-bold mb-4">Readly</h2>
                <ul>
                    <li><a href="http://localhost:5173/">Home</a></li>
                    <li><a href="http://localhost:5173/library">Library</a></li>
                    <li><a href="http://localhost:5173/about">About</a></li>
                    <li><a href="http://localhost:5173/contact">Contact</a></li>
                </ul>
                </div>
                {/* Services */}
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h2 className='text-xl font-bold mb-4'>Services</h2>
                <ul>
                    <li><a href="#">Rent A Book</a></li>
                    <li><a href="#">Swap Book</a></li>
                    <li><a href="#">List A Book</a></li>
                </ul>
                </div>
                <div className="w-full md:w-1/4 mb-6 md:mb-0" >
                <h2 className='text-xl font-bold mb-4'>Events</h2>
                <ul>
                    <li><a href="#">Book Show</a></li>
                    <li><a href="#">Discount Offer</a></li>
                    <li><a href="#">Free MemberShip</a></li>
                </ul>
                <h2 className='text-xl font-bold mb-4'>Follow</h2>
                <ul className='flex space-x-4'>
                    {/* Social Media Icons */}
                    <li><a href="#" ><Instagram/>
                    </a></li>
                    <li><a href="#" ><Facebook />
                    </a></li>
                    <li><a href="#" ><Linkedin />
                    </a></li>
                    
                    

                </ul>
                </div>
                </div>
                {/* Bottom Bar */}
                <div className='border-t border-gray-700 mt-8 pt-4 flex justify-between'>
                    <div>
                        <a href="#" className="text-blue-500 hover:text-blue-700">TERMS & 
                        CONDITIONS</a>
                        <span className="mx-4">|</span>
                        <a href="" className='text-blue-500 hover:text-blue-700'>PRIVACY POLICY</a>
                        <span className='mx-4'>|</span>
                        <a href="" className='text-blue-500 hover:text-blue-700'>SITEMAP</a>
                    </div>
                </div>
                <p className='flex justify-center'>Copyright 2024 Readly</p>
                <p className='flex justify-center'>Website by Nouman Ali & Muhammad Faizan</p>

        </div>
    </footer>
  )
}

