import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { LOCALES } from "../../i18n/locales";
import { FormattedMessage } from "react-intl";
import {Dropdown} from 'react-bootstrap';
export const Navbar = ({ setLanguage }) => {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <FormattedMessage id="smart" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <div className="navbar-nav-links">
              <Link className="nav-link active" aria-current="page" to="/homes">
                <FormattedMessage id="spaces" />
              </Link>
            </div>
              <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
              <FormattedMessage id="language" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item  onClick={()=> setLanguage(LOCALES.SPANISH)} href=""><FormattedMessage id="spanish" /></Dropdown.Item>
                <Dropdown.Item onClick={()=> setLanguage(LOCALES.ENGLISH)} href=""><FormattedMessage id="english" /></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};
