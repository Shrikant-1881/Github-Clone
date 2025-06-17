import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <img
          src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
          alt="Github logo"
        />
        <h3>GitHub</h3>
      </Link>
      <div>
        <Link to={"/"}>
          {/* /repo */}
          <p>Create a Repository </p>
        </Link>
        <Link to={"/profile"}>
          <p>Profile </p>
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
