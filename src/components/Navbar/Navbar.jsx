import { NavLink, Link } from "react-router-dom";
import Logo from "../../assets/images/freshcart-logo.svg";
import { userContext } from "../Context/userData.Context";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../Context/cart.context";

export default function Navbar() {
  const { token, Logout } = useContext(userContext);
  const { product, getProducts } = useContext(cartContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-slate-100 py-4 shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="container flex items-center gap-8 relative">
        <Link to="/" className="flex-shrink-0">
          <img src={Logo} alt="FreshCart Logo" className="h-10" />
        </Link>

        {token && (
          <>
            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-6">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `navLinkStyle ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `navLinkStyle ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`
                  }
                  to="/carts"
                >
                  Carts
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `navLinkStyle ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`
                  }
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `navLinkStyle ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`
                  }
                  to="/categories"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `navLinkStyle ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`
                  }
                  to="/wishlist"
                >
                  Wishlist
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `navLinkStyle ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`
                  }
                  to="/allorders"
                >
                  Orders
                </NavLink>
              </li>
            </ul>

            {/* Mobile Menu */}
            <div
              className={`lg:hidden fixed inset-0 bg-slate-900/50 ${
                isOpen ? "block" : "hidden"
              }`}
              onClick={toggleMenu}
            >
              <div
                className="absolute right-0 top-0 h-screen w-64 bg-white shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4">
                  <button onClick={toggleMenu} className="ml-auto block mb-4">
                    <i className="fa-solid fa-times text-2xl"></i>
                  </button>
                  <ul className="space-y-4">
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          `block navLinkStyle ${
                            isActive ? "before:!w-full font-semibold" : ""
                          }`
                        }
                        to="/"
                        onClick={toggleMenu}
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          `block navLinkStyle ${
                            isActive ? "before:!w-full font-semibold" : ""
                          }`
                        }
                        to="/carts"
                        onClick={toggleMenu}
                      >
                        Carts
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          `block navLinkStyle ${
                            isActive ? "before:!w-full font-semibold" : ""
                          }`
                        }
                        to="/products"
                        onClick={toggleMenu}
                      >
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          `block navLinkStyle ${
                            isActive ? "before:!w-full font-semibold" : ""
                          }`
                        }
                        to="/categories"
                        onClick={toggleMenu}
                      >
                        Categories
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          `block navLinkStyle ${
                            isActive ? "before:!w-full font-semibold" : ""
                          }`
                        }
                        to="/wishlist"
                        onClick={toggleMenu}
                      >
                        Wishlist
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          `block navLinkStyle ${
                            isActive ? "before:!w-full font-semibold" : ""
                          }`
                        }
                        to="/allorders"
                        onClick={toggleMenu}
                      >
                        Orders
                      </NavLink>
                    </li>
                  </ul>

                  {/* Mobile Social Links */}
                  <div className="mt-6 pt-6 border-t">
                    <ul className="flex flex-wrap gap-4">
                      {[
                        {
                          href: "https://www.facebook.com",
                          icon: "fa-facebook",
                        },
                        {
                          href: "https://www.instagram.com",
                          icon: "fa-instagram",
                        },
                        { href: "https://www.twitter.com", icon: "fa-twitter" },
                        { href: "https://www.youtube.com", icon: "fa-youtube" },
                        {
                          href: "https://www.linkedin.com",
                          icon: "fa-linkedin",
                        },
                      ].map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900"
                            aria-label={link.icon.split("-")[1]}
                          >
                            <i className={`fa-brands ${link.icon}`}></i>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <button
          className="lg:hidden ml-auto text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {token && (
          <Link
            className="cart cursor-pointer text-xl relative mr-4"
            to="/cart"
          >
            <i className="fa-solid fa-cart-shopping" aria-label="Cart"></i>
            <div className="cardCounter size-7 absolute top-0 right-0 text-white bg-primary-500 rounded-full transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center ">
              {product === null ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                product.numOfCartItems
              )}
            </div>
          </Link>
        )}

        {/* Desktop Social Links */}
        <ul className="hidden lg:flex items-center gap-4 ml-auto">
          {[
            { href: "https://www.facebook.com", icon: "fa-facebook" },
            { href: "https://www.instagram.com", icon: "fa-instagram" },
            { href: "https://www.twitter.com", icon: "fa-twitter" },
            { href: "https://www.youtube.com", icon: "fa-youtube" },
            { href: "https://www.linkedin.com", icon: "fa-linkedin" },
          ].map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900"
                aria-label={link.icon.split("-")[1]}
              >
                <i className={`fa-brands ${link.icon}`}></i>
              </a>
            </li>
          ))}
        </ul>

        <ul className=" items-center gap-4 hidden lg:flex">
          {!token ? (
            <>
              <li>
                <NavLink
                  to="/auth/signup"
                  className={({ isActive }) =>
                    `navLinkStyle ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`
                  }
                >
                  Signup
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/auth/login"
                  className={({ isActive }) =>
                    `navLinkStyle ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/">
                <i
                  className="fa-solid fa-right-from-bracket "
                  aria-label="Logout"
                  onClick={Logout}
                ></i>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
