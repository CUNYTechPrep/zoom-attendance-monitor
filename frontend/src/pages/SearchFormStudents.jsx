import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

function SearchFormStudents() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `/api/students?name=${name}&email=${email}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Server error while fetching students', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-wrapper d-flex flex-column justify-content-center align-items-center text-center w-100 bg-light">
      {error && <ErrorAlert details={'Failed to fetch students'} />}
      <h1>Search by Student</h1>
      <div className="d-grid gap-3 w-100 px-3" style={{ maxWidth: '300px' }}>
        <form className="mb-3">
          <div className="mb-3 text-start">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label me-3">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              onChange={handleEmailChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            Search
          </button>
        </form>
        {loading && (
          <div className="my-3">
            <LoadingSpinner />
          </div>
        )}
        <div className="results mt-4">
          {results.length > 0 ? (
            <ul className="list-group">
              {results.map((result) => (
                <li key={result.id} className="list-group-item">
                  {result.name} - {result.email}
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchFormStudents;
