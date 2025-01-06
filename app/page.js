'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setSelectedCompany(data); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Company Information</h1>


      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}


      <div className="space-y-4">
        {companies.map((company) => (
          <div key={company.id} className="flex items-center justify-between">
            <button
              onClick={() => fetchCompanyDetails(company.id)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {company.name === "Volkswagen" ? "volks" : company.name === "Udemy" ? "U" : "P" }
            </button>
          </div>
        ))}
      </div>

      {selectedCompany && selectedCompany.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Company Information</h2>
          <p>{selectedCompany[0].description}</p>
          <h3 className="text-lg font-semibold mt-4">Directors:</h3>
          <ul className="list-disc pl-5">
            {selectedCompany[0].directors.map((director, index) => (
              <li key={index} className="text-gray-600">
                {director}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}