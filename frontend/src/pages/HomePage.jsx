// pages/HomePage.jsx

function HomePage() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-3 bg-light text-center">
      <h1 className="mb-4">ZOOM ATTENDANCE</h1>
      <div className="d-grid gap-3 w-100" style={{ maxWidth: '300px' }}>
        <button className="btn btn-primary btn-lg">Search by Meeting</button>
        <button className="btn btn-secondary btn-lg">Search by Student</button>
      </div>
    </div>
  );
}

export default HomePage;
