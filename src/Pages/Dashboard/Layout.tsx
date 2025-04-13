/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { SideBarContext } from "@/hooks/SideBarContext";
import Header from "@/components/Dashboard/header/Header";
import SideBar from "@/components/Dashboard/sidebar/SideBar";
// import { toast } from "@/hooks/use-toast";
// import { t } from "i18next";

function Layout() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // if (loading) {
  //   return (
  //     <div className="fixed left-0 top-0 right-0 bottom-0 bg-background z-[1000]">
  //       <div className="flex justify-center items-center h-full">
  //         <div className="spinner">
  //           <div className="spinnerin"></div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <SideBarContext.Provider value={{ open, setOpen }}>
      <div>
        <div className="flex">
          <SideBar />
          <div className="flex-1 flex flex-col min-h-screen bg-background">
            <Header />
            <div
              className="p-4 bg-background-1 overflow-y-auto"
              style={{ minHeight: "calc(100vh - 4.5rem)" }}
            >
              <Outlet />
            </div>
          </div>
        </div>
        {/* <Outlet /> */}
      </div>
    </SideBarContext.Provider>
  );
}

export default Layout;
