function HomePage() {
  return (
    <div className="home-wrapper d-flex flex-column justify-content-center align-items-center text-center w-100 bg-light">
      <h1 className="mb-4">ZOOM ATTENDANCE</h1>
      <div className="d-grid gap-3 w-100 px-3" style={{ maxWidth: '300px' }}>
        <button className="btn btn-primary btn-lg">Search by Meeting</button>
        <button className="btn btn-secondary btn-lg">Search by Student</button>
      </div>
    </div>
  );
}

export default HomePage;
