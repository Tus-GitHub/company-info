'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

<<<<<<< HEAD
=======
  // Fetch all companies when the page loads
>>>>>>> bd5de844634343ec74ceae59d9b67d59c01744f0
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setError(null);
      
      try {
<<<<<<< HEAD
        const res = await fetch('/api/companiess'); 
=======
        const res = await fetch('/api/companiess'); // Modify with your correct API endpoint
>>>>>>> bd5de844634343ec74ceae59d9b67d59c01744f0
        if (!res.ok) {
          throw new Error('Failed to fetch companies');
        }
        const data = await res.json();
<<<<<<< HEAD
        setCompanies(data);
=======
        setCompanies(data); // Assuming 'data' is an array of companies
>>>>>>> bd5de844634343ec74ceae59d9b67d59c01744f0
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

<<<<<<< HEAD

=======
  // Fetch detailed information of the selected company
>>>>>>> bd5de844634343ec74ceae59d9b67d59c01744f0
  const fetchCompanyDetails = async (companyId) => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`/api/companies/${companyId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch company details');
      }
      const data = await res.json();
<<<<<<< HEAD
      setSelectedCompany(data); 
=======
      setSelectedCompany(data); // Set the selected company details
>>>>>>> bd5de844634343ec74ceae59d9b67d59c01744f0
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Company Information</h1>

<<<<<<< HEAD

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}


=======
      {/* Display loading or error message */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display list of companies with buttons */}
>>>>>>> bd5de844634343ec74ceae59d9b67d59c01744f0
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

<<<<<<< HEAD

=======
      {/* Display the selected company's details and directors */}
>>>>>>> bd5de844634343ec74ceae59d9b67d59c01744f0
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