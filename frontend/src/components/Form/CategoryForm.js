import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            style={{fontSize:"1.5rem"}}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success" style={{fontSize:"1.5rem"}}>
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;