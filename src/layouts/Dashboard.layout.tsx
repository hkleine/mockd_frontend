import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {SideNav, Header, DashboardContent} from "../components";

export const DashboardLayout = ({children}: any) => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div>
      <div className="flex flex-row h-screen overflow-y-hidden overflow-x-hidden">
        <SideNav/>
        <div className="flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden">
          <Header/>
          <DashboardContent> 
            {children}
          </DashboardContent>
        </div>
      </div>
    </div>
  );
}