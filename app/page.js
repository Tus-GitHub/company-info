
import CompanyList from './components/CompanyList';

async function getCompaniesData() {
  let companies = [];
  let error = null;

  try {
    const res = await fetch('http://localhost:3000/api/companiess', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch companies');
    }
    companies = await res.json();
  } catch (err) {
    error = err.message;
  }

  return { companies, error };
}

export default async function HomePage() {
  const { companies, error } = await getCompaniesData();
  return <CompanyList companies={companies} error={error} />;
}
