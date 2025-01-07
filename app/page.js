'use client';

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react';

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/companiess'); 
        if (!res.ok) {
          throw new Error('Failed to fetch companies');
        }
        const data = await res.json();
        setCompanies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const fetchCompanyDetails = async (companyId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/companies/${companyId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch company details');
      }
      const data = await res.json();

      if (data && data[0] && data[0].description && data[0].directors) {
        setSelectedCompany(data[0]); 
        setIsModalOpen(true);
      } else {
        setError('Invalid company data structure');
      }
    } catch (err) {
      setError(err.message);
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
          <p>I</p>
          <p>F</p>
          <p>T</p>
          <p>P</p>
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
            <button>Sea</button>
        </div>
        <button className='bg-dyellow md:p-3 p-1 font-thin  md:font-medium md:pl-6 md:pr-6 pl-2 pr-2 text-white rounded-lg'>Talk An Expert</button>
        </div>
      </div>
      <div className="h-[80vh] w-screen m-0 p-0 bg-[url('/working-man.avif')] bg-no-repeat bg-cover bg-center flex justify-between">
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
      <div className='pt-16 flex flex-col justify-center items-center'>
        <div className='text-2xl font-semibold'>Trusted By over 100+ Startup and freelance business</div>
      </div>
      {/* <h1 className="text-2xl font-bold mb-4">Company Information</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {companies.map((company) => (
          <div key={company.id} className="flex items-center justify-between">
            <button
              onClick={() => fetchCompanyDetails(company.id)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {company.name === "Volkswagen" ? "Volks" : company.name === "Udemy" ? "U" : company.name}
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
          <div className="bg-white p-8 rounded-lg w-1/2">
            {selectedCompany.description && selectedCompany.directors ? (
              <>
                <h2 className="text-xl font-semibold">Company Information</h2>
                <p>{selectedCompany.description}</p>
                <h3 className="text-lg font-semibold mt-4">Directors:</h3>
                <ul className="list-disc pl-5">
                  {selectedCompany.directors.map((director, index) => (
                    <li key={index} className="text-gray-600">
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
      )} */}
    </div>
  );
}
