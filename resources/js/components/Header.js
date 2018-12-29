import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <header className="text-grey-darker bg-white px-8">
      <div className="container mx-auto py-8 flex items-center justify-between">
        <h1 className="font-light tracking-wide">
          <i className="fas fa-hammer" /> BuildBandit
        </h1>
        <ul className="flex items-center list-reset">
          <li className="mr-12">
            <Link to="/" className="text-grey-darkest no-underline">
              All Projects
            </Link>
          </li>
          <li className="mr-12">
            <Link to="/types" className="text-grey-darkest no-underline">
              Types
            </Link>
          </li>
          <li className="mr-12">
            <Link to="/fieldtypes" className="text-grey-darkest no-underline">
              Field types
            </Link>
          </li>
          <li className="mr-12">
            <Link to="/modules" className="text-grey-darkest no-underline">
              Modules
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
