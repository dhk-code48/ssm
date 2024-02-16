import BackButton from "@/components/back-button";
import React, { FC } from "react";

const SuperAdminLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="p-6 space-y-5">
      <BackButton />
      {children}
    </div>
  );
};

export default SuperAdminLayout;
