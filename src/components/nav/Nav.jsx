import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useGetTagsListQuery } from "../../features/posts/postsApiSlice";

import "./nav.css";

const Nav = () => {
  const [dropdown, setDropdown] = useState(false);
  const { data: getCats } = useGetTagsListQuery();

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

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
        <div className="nav__categories category ">
          <button className="category__btn" onClick={handleDropdown}>
            Категории
          </button>
          {dropdown && (
            <div className="category__dropdown">
              <ul className="dropdown-list">
                {getCats?.map((cat, index) => (
                  <li className="dropdown-item" key={index}>
                    <Link
                      to={`/post?category=${cat.cat}`}
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
