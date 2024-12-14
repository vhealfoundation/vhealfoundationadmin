// Story.jsx
import React from "react";
import Layout from "../hoc/Layout";
const Story = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Story</h1>
      <p className="mt-4">Add and edit success stories or other impactful narratives.</p>
    </div>
  );
};

export default Layout(Story);
