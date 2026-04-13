// // import { Link, useLocation } from "react-router-dom";
// // import { ShoppingCart, Menu, X } from "lucide-react";
// // import { useCart } from "@/context/CartContext";
// // import { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import logo from "@/assets/logoimage2.png";

// // const navLinks = [
// //   { to: "/", label: "Home" },
// //   { to: "/products", label: "Shop" },
// // ];

// // const Navbar = () => {
// //   const { totalItems } = useCart();
// //   const location = useLocation();
// //   const [mobileOpen, setMobileOpen] = useState(false);

// //   return (
// //     <nav className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
// //       <div className="container mx-auto flex h-16 items-center justify-between px-4">
// //         <Link to="/" className="flex items-center gap-2">
// //           <img src={logo} alt="MangoMart" width={36} height={36} />
// //           <span className="font-display text-xl font-bold text-gradient-mango">Go-Mango</span>
// //         </Link>

// //         {/* Desktop nav */}
// //         <div className="hidden items-center gap-8 md:flex">
// //           {navLinks.map((link) => (
// //             <Link
// //               key={link.to}
// //               to={link.to}
// //               className={`text-sm font-medium transition-colors hover:text-primary ${
// //                 location.pathname === link.to ? "text-primary" : "text-muted-foreground"
// //               }`}
// //             >
// //               {link.label}
// //             </Link>
// //           ))}
// //         </div>

// //         <div className="flex items-center gap-4">
// //           <Link to="/cart" className="relative p-2 text-foreground transition-colors hover:text-primary">
// //             <ShoppingCart size={22} />
// //             {totalItems > 0 && (
// //               <motion.span
// //                 initial={{ scale: 0 }}
// //                 animate={{ scale: 1 }}
// //                 className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground"
// //               >
// //                 {totalItems}
// //               </motion.span>
// //             )}
// //           </Link>
// //           <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
// //             {mobileOpen ? <X size={22} /> : <Menu size={22} />}
// //           </button>
// //         </div>
// //       </div>

// //       {/* Mobile menu */}
// //       <AnimatePresence>
// //         {mobileOpen && (
// //           <motion.div
// //             initial={{ height: 0, opacity: 0 }}
// //             animate={{ height: "auto", opacity: 1 }}
// //             exit={{ height: 0, opacity: 0 }}
// //             className="overflow-hidden border-t border-border bg-card md:hidden"
// //           >
// //             <div className="flex flex-col gap-2 px-4 py-4">
// //               {navLinks.map((link) => (
// //                 <Link
// //                   key={link.to}
// //                   to={link.to}
// //                   onClick={() => setMobileOpen(false)}
// //                   className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
// //                 >
// //                   {link.label}
// //                 </Link>
// //               ))}
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </nav>
// //   );
// // };

// // export default Navbar;




// //testing 2
// // import { Link, useLocation } from "react-router-dom";
// // import { ShoppingCart, Menu, X } from "lucide-react";
// // import { useCart } from "@/context/CartContext";
// // import { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import logo from "@/assets/logoimage2.png";

// // const navLinks = [
// //   { to: "/", label: "Home" },
// //   { to: "/products", label: "Shop" },
// // ];

// // const Navbar = () => {
// //   const { totalItems } = useCart();
// //   const location = useLocation();
// //   const [mobileOpen, setMobileOpen] = useState(false);

// //   return (
// //     <nav className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
// //       <div className="container mx-auto flex h-16 items-center justify-between px-4">
// //         <Link to="/" className="flex items-center gap-2">
// //           <img src={logo} alt="MangoMart" width={36} height={36} />
// //           <span className="font-display text-xl font-bold text-gradient-mango">Go-Mango</span>
// //         </Link>

// //         {/* Desktop nav */}
// //         <div className="hidden items-center gap-8 md:flex">
// //           {navLinks.map((link) => (
// //             <Link
// //               key={link.to}
// //               to={link.to}
// //               className={`text-sm font-medium transition-colors hover:text-primary ${
// //                 location.pathname === link.to ? "text-primary" : "text-muted-foreground"
// //               }`}
// //             >
// //               {link.label}
// //             </Link>
// //           ))}
// //         </div>

// //         <div className="flex items-center gap-4">
// //           <Link to="/cart" className="relative p-2 text-foreground transition-colors hover:text-primary">
// //             <ShoppingCart size={22} />
// //             {totalItems > 0 && (
// //               <motion.span
// //                 initial={{ scale: 0 }}
// //                 animate={{ scale: 1 }}
// //                 exit={{ scale: 0 }}
// //                 className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-[10px] font-bold text-white shadow-lg"
// //               >
// //                 {totalItems}
// //               </motion.span>
// //             )}
// //           </Link>
// //           <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
// //             {mobileOpen ? <X size={22} /> : <Menu size={22} />}
// //           </button>
// //         </div>
// //       </div>

// //       {/* Mobile menu */}
// //       <AnimatePresence>
// //         {mobileOpen && (
// //           <motion.div
// //             initial={{ height: 0, opacity: 0 }}
// //             animate={{ height: "auto", opacity: 1 }}
// //             exit={{ height: 0, opacity: 0 }}
// //             className="overflow-hidden border-t border-border bg-card md:hidden"
// //           >
// //             <div className="flex flex-col gap-2 px-4 py-4">
// //               {navLinks.map((link) => (
// //                 <Link
// //                   key={link.to}
// //                   to={link.to}
// //                   onClick={() => setMobileOpen(false)}
// //                   className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
// //                 >
// //                   {link.label}
// //                 </Link>
// //               ))}
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </nav>
// //   );
// // };

// // export default Navbar;



// //testing 3

// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ShoppingCart, Menu, X, User, LogOut, Heart, Settings, Package } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "sonner";
// import logo from "@/assets/logoimage2.png";

// const navLinks = [
//   { to: "/", label: "Home" },
//   { to: "/products", label: "Shop" },
// ];

// // Auth hook for user management
// const useAuth = () => {
//   const [user, setUser] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("rememberMe");
//     setUser(null);
//     toast.success("Logged out successfully");
//   };

//   return { user, isLoading, logout };
// };

// const Navbar = () => {
//   const { totalItems } = useCart();
//   const { user, logout } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const userMenuRef = useRef<HTMLDivElement>(null);

//   // Close user menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
//         setShowUserMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setShowUserMenu(false);
//     navigate("/");
//   };

//   return (
//     <nav className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         <Link to="/" className="flex items-center gap-2">
//           <img src={logo} alt="MangoMart" width={36} height={36} />
//           <span className="font-display text-xl font-bold text-gradient-mango">Go-Mango</span>
//         </Link>

//         {/* Desktop nav */}
//         <div className="hidden items-center gap-8 md:flex">
//           {navLinks.map((link) => (
//             <Link
//               key={link.to}
//               to={link.to}
//               className={`text-sm font-medium transition-colors hover:text-primary ${
//                 location.pathname === link.to ? "text-primary" : "text-muted-foreground"
//               }`}
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>

//         <div className="flex items-center gap-4">
//           {/* User Menu */}
//           <div className="relative" ref={userMenuRef}>
//             {user ? (
//               <>
//                 <button
//                   onClick={() => setShowUserMenu(!showUserMenu)}
//                   className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white transition-all hover:scale-105"
//                 >
//                   {user.avatar ? (
//                     <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
//                   ) : (
//                     <User size={18} />
//                   )}
//                 </button>
                
//                 <AnimatePresence>
//                   {showUserMenu && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                       className="absolute right-0 mt-2 w-64 rounded-lg bg-card shadow-lg border border-border overflow-hidden"
//                     >
//                       <div className="p-3 border-b border-border bg-gradient-to-r from-green-50 to-orange-50">
//                         <p className="text-sm font-semibold text-foreground">{user.name}</p>
//                         <p className="text-xs text-muted-foreground">{user.email}</p>
//                       </div>
//                       <div className="py-1">
//                         <Link
//                           to="/profile"
//                           onClick={() => setShowUserMenu(false)}
//                           className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
//                         >
//                           <User size={16} />
//                           My Profile
//                         </Link>
//                         <Link
//                           to="/orders"
//                           onClick={() => setShowUserMenu(false)}
//                           className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
//                         >
//                           <Package size={16} />
//                           My Orders
//                         </Link>
//                         <Link
//                           to="/wishlist"
//                           onClick={() => setShowUserMenu(false)}
//                           className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
//                         >
//                           <Heart size={16} />
//                           Wishlist
//                         </Link>
//                         <Link
//                           to="/settings"
//                           onClick={() => setShowUserMenu(false)}
//                           className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
//                         >
//                           <Settings size={16} />
//                           Settings
//                         </Link>
//                         <div className="border-t border-border my-1"></div>
//                         <button
//                           onClick={handleLogout}
//                           className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
//                         >
//                           <LogOut size={16} />
//                           Logout
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </>
//             ) : (
//               <Link
//                 to="/login"
//                 className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
//               >
//                 <User size={18} />
//                 <span className="hidden sm:inline">Account</span>
//               </Link>
//             )}
//           </div>

//           {/* Cart Icon */}
//           <Link to="/cart" className="relative p-2 text-foreground transition-colors hover:text-primary">
//             <ShoppingCart size={22} />
//             {totalItems > 0 && (
//               <motion.span
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0 }}
//                 className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-[10px] font-bold text-white shadow-lg"
//               >
//                 {totalItems}
//               </motion.span>
//             )}
//           </Link>

//           <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
//             {mobileOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="overflow-hidden border-t border-border bg-card md:hidden"
//           >
//             <div className="flex flex-col gap-2 px-4 py-4">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.to}
//                   to={link.to}
//                   onClick={() => setMobileOpen(false)}
//                   className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//               {!user && (
//                 <>
//                   <Link
//                     to="/login"
//                     onClick={() => setMobileOpen(false)}
//                     className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/register"
//                     onClick={() => setMobileOpen(false)}
//                     className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
//                   >
//                     Register
//                   </Link>
//                 </>
//               )}
//               {user && (
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setMobileOpen(false);
//                   }}
//                   className="rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 text-left"
//                 >
//                   Logout
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;






// src/components/Navbar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, User, LogOut, Heart, Settings, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logoimage2.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
];

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <nav className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200"></div>
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200"></div>
            <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="MangoMart" width={36} height={36} />
          <span className="font-display text-xl font-bold text-gradient-mango">Go-Mango</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            {user ? (
              <>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white transition-all hover:scale-105"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <User size={18} />
                  )}
                </button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 rounded-lg bg-card shadow-lg border border-border overflow-hidden"
                    >
                      <div className="p-3 border-b border-border bg-gradient-to-r from-green-50 to-orange-50">
                        <p className="text-sm font-semibold text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          <User size={16} />
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          <Package size={16} />
                          My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          <Heart size={16} />
                          Wishlist
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          <Settings size={16} />
                          Settings
                        </Link>
                        <div className="border-t border-border my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <User size={18} />
                <span className="hidden sm:inline">Account</span>
              </Link>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 text-foreground transition-colors hover:text-primary">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-[10px] font-bold text-white shadow-lg"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-card md:hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    Register
                  </Link>
                </>
              )}
              {user && (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    Wishlist
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;