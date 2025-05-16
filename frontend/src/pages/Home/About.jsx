import React from 'react'
import { aboutpic } from '../../assets';


export default function About() {
  return (
      <div className="py-16 bg-gray-100">
          <div className="container m-auto px-6 text-gray-300 md:px-12 xl:px-6">
              <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                  <div className="md:5/12 lg:w-5/12">
                      <img
                          src={aboutpic}
                          alt="image"

className='w-full object-contain'/>
                  </div>
                  <div className="md:7/12 lg:w-6/12">
                      <h3 className={'text-2xl text-gray-900 font-bold md:text-4xl text-justify italic'}>
                          Book Rental Management System is Carried out by Numan  Ali and Muhammad Faizan 
                      </h3>
                      <p className="mt-6 text-black text-justify italic">
                      Our Book Rental Management System web application is the culmination of our academic journey, 
                      designed to simplify and enhance the process of renting books. This project reflects our dedication 
                      to creating efficient, user-friendly solutions that bridge the gap between book enthusiasts and 
                      accessible reading. Thank you for exploring our work and supporting our vision!
                      </p>
                      <p className="mt-4 text-black">
                      Our project aims to revolutionize the way books are rented by providing a seamless platform for 
                      users to browse, rent, and manage their book collections. Built with modern web technologies, 
                      the system ensures efficiency and convenience for both renters and providers. We hope this
                       application serves as a practical solution for book lovers everywhere.
                      </p>
                  </div>
              </div>
          </div>
      </div>
  );
}