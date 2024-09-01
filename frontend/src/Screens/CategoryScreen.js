import React, { useEffect, useState } from "react";
import CategoryForm from "../components/Form/CategoryForm";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, listCategories, saveCategory, updateCategory } from "../actions/categoryActions";
const CreateCategory = () => {
  const categoryList = useSelector(state => state.categoryList);
  const { categories } = categoryList;
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const categorySave = useSelector(state => state.categorySave);
  const { loading: loadingSave, success: successSave, error: errorSave } = categorySave;

  const categoryDelete = useSelector(state => state.categoryDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = categoryDelete;

  const categoryUpdate = useSelector(state=>state.categoryUpdate);
  const {loading : loadingUpdate,success:successUpdate,error:errorUpdate} = categoryUpdate;
  const dispatch = useDispatch();
  

  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
     dispatch(saveCategory({
      name:name
    }));
    } catch (error) {
      console.log(error);
      //toast.error("Something went wrong in input form");
    }
  };

  
  useEffect(() => {
    dispatch(listCategories());
    return () => {
        //
      };
       // eslint-disable-next-line
  }, [successSave,successDelete,successUpdate]);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateCategory({
        _id:selected._id,
        name:updatedName
      }))
       
    } catch (error) {
    console.log(error);
     // toast.error("Something went wrong while updating category data");
    }
  };
  //delete category
  const handleDelete = async (categoryId) => {
    try {
    let answer = window.prompt("Please enter \"Yes\"(case insensitive) in the text box below if you want to delete the category (all associated products will be deleted as well)");
        if (!answer || answer.toLocaleUpperCase() !=="YES") return;
        dispatch(deleteCategory(categoryId));
    } catch (error) {
        console.log(error);
      //toast.error("Something went wrong");
    }
  };
  return (
      <div className="m-3 p-3">
        <>
          <div >
            <h1 >Manage Category List</h1>
            <div className="p-3 w-150">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75 h-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map(category => (
                    <>
                      <tr key={category._id}>
                        <td key={category.name}>{category.name}</td>
                        <td>
                          <button
                           className="button mx-3 bg-primary text-white"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(category.name);
                              setSelected(category);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="button  bg-danger text-white"
                            onClick={() => {
                              handleDelete(category._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </>
      </div>
  );
};

export default CreateCategory;