import React from "react";
import BlogGrid from "./components/blog-grid";

const page = () => {
  return (
    <section className="my-4 p-2">
      <BlogGrid userSide />
    </section>
  );
};

export default page;
