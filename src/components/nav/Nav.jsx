import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import { useGetTagsListQuery } from "../../features/posts/postsApiSlice";

import "./nav.css";

const Nav = () => {
  const [dropdown, setDropdown] = useState(false);
  const { data: getCats } = useGetTagsListQuery();

  const catRef = useRef();

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleOutsideClick = (e) => {
    if (catRef.current && !catRef.current.contains(e.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      <div className="nav-wrapper">
        <div className="nav__posts">
          <NavLink to={"/"} className="nav__posts-title">
            Новые
          </NavLink>
          <NavLink to={"/popular"} className="nav__posts-title">
            Популярные
          </NavLink>
        </div>
        <div className="nav__categories category " ref={catRef}>
          <button className="category__btn" onClick={handleDropdown}>
            Категории
          </button>
          {dropdown && (
            <div className="category__dropdown">
              <ul className="dropdown-list">
                {getCats?.map((cat, index) => (
                  <li
                    className="dropdown-item"
                    key={index}
                    onClick={handleDropdown}
                  >
                    <Link
                      to={`/post/category/${cat.cat}`}
                      className="dropdown-link"
                    >
                      {cat.cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
