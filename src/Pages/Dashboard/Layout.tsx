/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { SideBarContext } from "@/hooks/SideBarContext";
import Header from "@/components/Dashboard/header/Header";
import SideBar from "@/components/Dashboard/sidebar/SideBar";
import { cn } from "@/lib/utils";
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
        <div className="">
          <Header />
          <div className="flex overflow-x-auto ">
            <div
              className={cn(
                "z-10 fixed bottom-0 top-0 transition-all duration-300  h-screen"
              )}
            >
              <SideBar />
            </div>
            <div
              className={cn(
                "mt-[6rem]",
                " ms-[4.5rem]  flex-1 relative px-5 transition-all duration-300",
                open ? "lg:ms-64" : "ms-24"
              )}
              style={{
                minHeight: "calc(100vh - 6rem)",
              }}
            >
              <div
                className={cn(
                  "bottom-0 top-0 left-0 right-0 bg-background/60 z-[9]",
                  open ? "max-lg:fixed" : "hidden"
                )}
                onClick={() => setOpen(false)}
              />
              <Outlet />
              {/* <Toaster /> */}
            </div>
          </div>
        </div>
        {/* <Outlet /> */}
      </div>
    </SideBarContext.Provider>
  );
}

export default Layout;
