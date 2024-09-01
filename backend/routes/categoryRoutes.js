import express from 'express';
import categoryModel from '../models/categoryModel';
import productModel from '../models/productModel';
import { isAuth, isAdmin } from '../util';
import slugify from 'slugify';
import fs from 'fs'

const router = express.Router();

router.get('/category-list', async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    //console.log(category)
    res.status(200).send({
      success: true,
      message: 'All Categories List',
      categories
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while fetching the category list',
    });
  }
});

router.post('/create-category', isAuth, isAdmin, async (req, res) => {
  try {
    const  name  = req.body.name;
    if (!name) {
      return res.status(401).send({ message: 'Name is required' });
    }
    const existingcat = await categoryModel.findOne({ name });
    if (existingcat) {
      return res.status(200).send({
        success: true,
        message: 'Category Already Exists',
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    return res.status(201).send({
      success: true,
      message: 'New Category has been created successfully',
      data:category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in Creating Category',
    });
  }
});

router.put('/update-category/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const  name  = req.body.name;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: 'Category Updated Successfully',
      data:category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while updating the category',
    });
  }
});

//fetch a particular category
router.get('/single-category/:slug', async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: 'Requested single category data has been successfully fetched',
      data:category,
    });
  } catch (error) {
    console.log(error); 
    res.status(500).send({
      success: false,
      error,
      message: 'Error while fetching the requested category',
    });
  }
});

//delete a category
router.delete('/delete-category/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productModel.find({
      category: id,
    });
    await productModel.deleteMany({
      category: id,
    })
    //console.log(products);
    if(products){
      products.forEach((product)=>{
         let img_path = product.image;
         let file_path = process.env.DIRECTORY_PATH+img_path;
       fs.unlink(file_path, (err) => {
       if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }
     console.log(`File ${file_path} has been successfully removed.`);
  });
      })
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: 'Category and associated products are Deleted Successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while deleting the requested category',
    });
  }
});


export default router;