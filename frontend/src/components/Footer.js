import React from 'react';

export default function Footer() {
  return (
    <div>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              HungryHub
            </a>
            <span className="text-muted">© 2022, Inc</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-muted" href="/">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="/">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="/">
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="/">
                <i className="fab fa-github"></i>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}