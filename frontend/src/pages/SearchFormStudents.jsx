function SearchFormStudents() {
  return (
    <div className="home-wrapper d-flex flex-column justify-content-center align-items-center text-center w-100 bg-light">
      <h1>Search by Student</h1>
      <div className="d-grid gap-3 w-100 px-3" style={{ maxWidth: '300px' }}>
        <form className="mb-3">
          <div className="mb-3 text-start">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter name" />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label me-3">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" />
          </div>
        </form>
      </div>
    </div>
  );
}   

export default SearchFormStudents;