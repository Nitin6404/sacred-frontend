import React from "react";
import { AddServiceModal } from "./add-service-modal";

const AddServiceNav = () => {
  return (
    <nav className="mb-6 flex items-center justify-between">
      <AddServiceModal />
    </nav>
  );
};

export default AddServiceNav;
