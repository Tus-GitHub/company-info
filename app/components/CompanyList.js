'use client';

import { LuMonitorCog } from "react-icons/lu";
import { FaFacebook, FaApple, FaSearch, FaGoogle } from "react-icons/fa";
import { useState, useCallback } from 'react';

export default function CompanyList({ companies, error }) {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localError, setLocalError] = useState(error);

  const fetchCompanyDetails = async (companyId) => {
    setLoading(true);
    setLocalError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/companies/${companyId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch company details');
      }
      const data = await res.json();

      if (data && data[0] && data[0].description && data[0].directors && data[0].name) {
        setSelectedCompany(data[0]);
        setIsModalOpen(true);
      } else {
        setLocalError('Invalid company data structure');
      }
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      handleCloseModal();
    }
  };

  return (
    <div className="">
      <div className='bg-dblue h-10 min-w-full text-white flex justify-end gap-1 md:gap-3 items-center text-xs md:text-base'>
        <div className='border-r-2  pr-2 md:pr-5 mr-2 border-white'>www.registerkaro.in</div>
        <div className='border-r-2 pr-2 md:pr-5 mr-2 border-white'>+918447746183</div>
        <div className='flex gap-1 md:gap-4 md:pr-16 pr-4'>
          <FaFacebook className="text-lg hover:text-dyellow" />
          <FaGoogle className="text-lg hover:text-dyellow" />
          <FaApple className="text-lg hover:text-dyellow" />
        </div>
      </div>
      <div className='border-b-2 border-slate-100 h-16 justify-between flex items-center'>  
        <p className='text-dpurple text-xs md:text-4xl font-bold pl-20 collapse md:visible'>Register<span className='text-dyellow'>Karo</span></p>
        <div className='flex md:gap-8 gap-2 text-xs md:text-lg md:pr-16 pr-4'>
          <div className='flex md:gap-8 gap-2 text-xs md:text-lg font-medium'>
            <button>Home</button>
            <button className='collapse md:visible'>Our Services</button>
            <button>Blog</button>
            <button>Contact Us</button>
            <button>About Us</button>
            <button><FaSearch className="text-lg"/></button>
        </div>
        <button className='bg-dyellow md:p-3 p-1 font-thin  md:font-medium md:pl-6 md:pr-6 pl-2 pr-2 text-white rounded-lg'>Talk An Expert</button>
        </div>
      </div>
      <div className="h-[80vh] w-screen m-0 p-0 bg-[url('/working.avif')] bg-no-repeat bg-cover bg-center flex justify-between">
        <div className='md:pl-20 pl-4 py-8 flex flex-col justify-around'>
          <div className='font-medium text-xs md:text-base'>Google Rating</div>
          <p className='md:text-5xl text-base font-medium'>Your trusted partner<br></br> for compliance buisness needs</p>
          <p className='text-slate-800 md:text-xl text-sm'>An online buisness compilance platform that helps entrepreneurs and<br></br>other individual with various, <span className='text-slate-900 font-medium'>registration, tax filings, </span> and other <span className='text-slate-900 font-medium'>legal</span><br></br> <span className='text-slate-900 font-medium'>matters.</span></p>
          <div className='flex gap-8 items-center '>
            <button className='bg-dblue text-white md:p-3 md:px-8 px-4 p-2 rounded-sm text-sm md:text-base font-medium'>Talk An Expert</button>
            <p className='font-medium text-sm md:text-base'>See how it works</p>
          </div>
        </div>
        <div className='flex flex-col justify-start gap-y-10 pt-12 collapse md:visible'>
          <button className='bg-white p-4 rounded-xl'>Annual Compliance</button>
          <button className='bg-white p-4 rounded-xl pr-10'>Payroll Services</button>
          <button className='bg-white p-4 rounded-xl'>Company Formation</button>
          <button className='bg-white p-4 rounded-xl'>Annual Compliance</button>
        </div>
      </div>
      <div className='md:pt-16 pt-8 flex flex-col justify-center items-center md:gap-y-8 gap-y-4'>
        <div className='md:text-2xl text-base font-semibold'>
          Trusted By over 100+ Startup and freelance business</div>
        <div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex md:gap-x-10 gap-x-6">
          {companies.map((company) => (
            <div key={company.id} className="flex items-center justify-between">
              <button
                onClick={() => fetchCompanyDetails(company.id)}
                className="md:w-20 w-12 h-20"
              >
                {company.name === "Volkswagen" ? <img className='rounded-full' src="/volkswagen.jpeg" /> : company.name === "Udemy" ? <img className='rounded-full' src="/udemy.png" /> : <img className='rounded-full' src="/pintrest.png" />}
              </button> 
            </div>
          ))}
        </div>

          {isModalOpen && selectedCompany && (
            <div
              id="modal-overlay"
              onClick={handleOutsideClick}
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            >
              <div className="bg-gradient-to-r from-dyellow from-5% via-lpink via-30% to-dblue to-95% md:p-8 p-4 rounded-lg md:w-1/2 w-2/3 flex flex-col justify-center items-center" >
                {selectedCompany.description && selectedCompany.directors ? (
                  <>
                    <h2 className="md:text-xl text-sm font-bold text-lslate">About <span className="text-dpurple">{selectedCompany.name} </span> </h2>
                    <p className='text-xs md:text-base'>{selectedCompany.description}</p>
                    <h3 className="md:text-lg text-xs font-semibold mt-4">Directors:</h3>
                    <ul className="list-disc md:pl-5 pl-1 text-sm md:text-base">
                      {selectedCompany.directors.map((director, index) => (
                        <li key={index} className="text-gray-900">
                          {director}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-red-500">Error: Missing company data</p>
                )}
                <button
                  onClick={handleCloseModal}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='bg-lgrey flex flex-col  items-center mt-24 pt-10 gap-y-12 pb-8'>
          <p className='uppercase text-dyellow text-lg'>welcome to registerkaro.in</p>
          <p className='md:text-4xl text-2xl font-bold text-lslate'>Explore Our Services</p>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-x-52 gap-y-24">
            <div className="p-4 flex flex-col justify-center items-center">
              <LuMonitorCog  className="text-5xl text-dyellow"/>
              <p className="text-xl font-bold py-6">Company Formation</p>
              <p className="pb-6 text-lg font-light text-center">Build web-based solution that<br></br> enhance customer experience.</p>
              <button className="font-medium text-lslate">Learn more -</button>
            </div>
            <div className="p-4 flex flex-col justify-center items-center">
              <LuMonitorCog  className="text-5xl text-dyellow"/>
              <p className="text-xl font-bold py-6">Company Secretarial Services</p>
              <p className="pb-6 text-lg font-light text-center">Make data-driven decisions and<br></br>utilize technology to reach<br></br>business goals.</p>
              <button className="font-medium text-lslate">Learn more -</button>
            </div>
            <div className="p-4 flex flex-col justify-center items-center">
              <LuMonitorCog  className="text-5xl text-dyellow"/>
              <p className="text-xl font-bold py-6">Virtual Office Address</p>
              <p className="pb-6 text-lg font-light text-center">Foster customer relationship by<br></br> effectively serving your market.</p>
              <button className="font-medium text-lslate">Learn more -</button>
            </div>
            <div className="p-4 flex flex-col justify-center items-center">
              <LuMonitorCog  className="text-5xl text-dyellow"/>
              <p className="text-xl font-bold py-6">Annual Compliance Services</p>
              <p className="pb-6 text-lg font-light text-center">Turn your ideas into modern<br></br> products with our design experts.</p>
              <button className="font-medium text-lslate">Learn more -</button>
            </div>
            <div className="p-4 flex flex-col justify-center items-center">
              <LuMonitorCog  className="text-5xl text-dyellow"/>
              <p className="text-xl font-bold py-6">Payroll Services</p>
              <p className="pb-6 text-lg font-light text-center">Expand your business across the<br></br>globe with minimal effort.</p>
              <button className="font-medium text-lslate">Learn more -</button>
            </div>
            <div className="p-4 flex flex-col justify-center items-center">
              <LuMonitorCog  className="text-5xl text-dyellow"/>
              <p className="text-xl font-bold py-6">Bookkeeping Services</p>
              <p className="pb-6 text-lg font-light text-center">Steering user behaviours with<br></br> creative design, data insights &<br></br>technology.</p>
              <button className="font-medium text-lslate">Learn more -</button>
            </div>
          </div>
          <button className="text-white bg-dblue p-4 px-6 rounded-md">See All Services</button>
      </div>
      <div className="flex">
        <div className="md:w-1/2 w-full flex flex-col gap-y-8 pt-16 md:pl-20 pl-10">
          <p className="text-dyellow text-sm md:text-base">WELCOME TO REGISTERKARO.IN</p>
          <p className="text-dblue font-bold md:text-3xl text-2xl">About <span className="text-dyellow">Register Karo</span></p>
          <p className="md:text-lg text-sm">We have been using Intelegencia as our DevOps vendor for our field service
            applications over the last couple of years and I’m extremely pleased with their performance, ability to
            execute, and willingness to adapt in our ever changing environment. Perry is an
            outstanding leader who is fanatical about customer satisfaction. He has built a solid team
            which has consistently delivered on projects thereby exceeding everyone’s expectations.
          </p>
          <p className="md:text-lg text-sm">I would strongly recommend their services to any organization that is looking for solid, reliable, and predictable outcomes.</p>
          <button className="bg-dblue text-white text-lg font-light md:px-6 md:py-3 py-1 rounded-md md:w-36 w-64">Learn More</button>
        </div>
        <div className="collapse md:visible"><img  src="/RegisterKaro.png" /></div>
      </div>
      <div className="flex pt-10 flex-col md:flex-row w-full">
        <div className="md:w-1/2  flex flex-col md:pr-36 pr-4 gap-y-8 md:pl-20 pl-10">
          <p className="text-dyellow uppercase">why registerkaro.in</p>
          <p className="text-slate-900 md:text-3xl text-lg font-bold">Why Choose Register Karo</p>
          <p className="pb-8 md:pb-0">It is with consistent services and results that build trust with the people and that in turn help us to serve the buisness better.</p>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-x-12 gap-y-4 md:gap-y-0 px-6">
          <div className="md:px-12 md:py-14 p-4 rounded-lg flex flex-col justify-center items-center bg-lpink">
            <LuMonitorCog className="text-3xl text-orange-700" />
            <p className="pt-4 text-lg font-semibold">Confidential & Safe</p>
            <p className="text-center text-slate-600 pt-2">All your private information is safe<br></br>with us</p>
          </div>
          <div className="md:px-12 md:py-14 p-4 rounded-lg flex flex-col justify-center items-center bg-lblue">
            <LuMonitorCog className="text-3xl text-green-600" />
            <p className="pt-4 text-lg font-semibold">No Hidden Fee</p>
            <p className="text-center text-slate-600 pt-2">Everything is put before you with<br></br>no hidden charges or conditions</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full md:pt-10 pt-4 pr-6 pb-10">
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-x-10 gap-y-4 md:gap-y-0">
            <div className="md:px-12 md:py-12 p-4 rounded-lg flex flex-col justify-center items-center bg-lblue">
              <LuMonitorCog className="text-3xl text-blue-700" />
              <p className="pt-4 text-lg font-semibold">Guaranted Satisfaction</p>
              <p className="text-center text-slate-600 pt-2">Everything is put before you with<br></br>no hidden charges or conditions</p>
            </div>
            <div className=" md:px-14 md:py-12 p-4 rounded-lg flex flex-col justify-center items-center bg-lpink">
              <LuMonitorCog className="text-3xl text-red-700" />
              <p className="pt-4 text-lg font-semibold">Expert CA/CS Assistance</p>
              <p className="text-center text-slate-600 pt-2">Everything is put before you with<br></br>no hidden charges or conditions</p>
            </div>
            <div className="md:px-14 md:py-12 p-4  rounded-lg flex flex-col justify-center items-center bg-lblue">
              <LuMonitorCog className="text-3xl text-dyellow" />
              <p className="pt-4 text-lg font-semibold">Confidential & Safe</p>
              <p className="text-center text-slate-600 pt-2">Everything is put before you with<br></br>no hidden charges or conditions</p>
            </div>
          </div>
        </div>
        <footer className="bg-blue-900 text-white pt-12 pb-8">
          <div className="container mx-auto px-3  md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-5 md:gap-8 gap-x-8 text-sm">
              <div className="col-span-2">
                <p className="mb-6">
                  Design outstanding interfaces with advanced Figma features in a matter of minutes.
                </p>
                <div className="flex space-x-8">
                  <FaFacebook className="text-lg hover:text-dyellow" />
                  <FaGoogle className="text-lg hover:text-dyellow" />
                  <FaApple className="text-lg hover:text-dyellow" />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-dyellow">START A BUSINESS</h4>
                <ul className="space-y-2">
                  <li>Features</li>
                  <li>Solutions</li>
                  <li>Integrations</li>
                  <li>Enterprise</li>
                  <li>Solutions</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-dyellow">GOVERNMENT REGISTRATION</h4>
                <ul className="space-y-2">
                  <li>Partners</li>
                  <li>Community</li>
                  <li>Developers</li>
                  <li>App</li>
                  <li>Blog</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-dyellow text-xs md:text-base">COMPLIANCE & TAX</h4>
                <ul className="space-y-2">
                  <li>Channels</li>
                  <li>Scale</li>
                  <li>Watch the Demo</li>
                  <li>Our Competition</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-dyellow">BIS & CDSCO</h4>
                <ul className="space-y-2">
                  <li>About Us</li>
                  <li>News</li>
                  <li>Leadership</li>
                  <li>Media Kit</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-center mt-12">
              <button className="bg-dyellow text-blue-900 rounded-full p-3 mb-6 hover:bg-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 15.75L12 8.25l-7.5 7.5"
                  />
                </svg>
              </button>
              <p className="text-sm">© 2024 Registerkaro.in. All Rights Reserved.</p>
            </div>
          </div>
      </footer>
    </div>
  );
}