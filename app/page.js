'use client';

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
      <div className='bg-dblue h-10 w-full text-white flex justify-end gap-1 md:gap-3 items-center text-xs md:text-base'>
        <div className='border-r-2 pr-5 mr-2 border-white'>www.registerkaro.in</div>
        <div className='border-r-2 pr-5 mr-2 border-white'>+918447746183</div>
        <div className='flex gap-1 md:gap-4 pr-16'>
          <p>I</p>
          <p>F</p>
          <p>T</p>
          <p>P</p>
        </div>
      </div>
      <div className='border-b-2 border-slate-100 h-16 justify-between flex items-center invisible md:visible'>  
        <p className='text-dpurple text-xs md:text-4xl font-bold pl-20'>Register<span className='text-dyellow'>Karo</span></p>
        <div className='flex gap-8 text-sm md:text-lg pr-16'>
          <div className='flex gap-8 text-sm md:text-lg mt-3 font-medium'>
            <p>Home</p>
            <p>Our Services</p>
            <p>Blog</p>
            <p>Contact Us</p>
            <p>About Us</p>
            <p>Sea</p>
        </div>
        <div className='bg-dyellow p-3 font-medium pl-6 pr-6 text-white rounded-lg'>Talk An Expert</div>
        </div>
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
