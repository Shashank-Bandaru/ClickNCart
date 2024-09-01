import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';
import categoryModel from '../models/categoryModel';
import fs from 'fs'
const router = express.Router();

router.get("/allcategories",async(req,res)=>{
  try {
    const category = await Product.find({}, {category:1, _id:0});
    //console.log(category)
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching the category list",
    });
  }
})

router.get("/", async (req, res) => {
  const slug = req.query.category;
  const category = await categoryModel.findOne({ slug: slug });
  const searchKeyword = req.query.searchKeyword ? {
    $or: [
      { name: { $regex: req.query.searchKeyword, $options: "i" } },
      { description: { $regex: req.query.searchKeyword, $options: "i" } },
    ]
  } : {};
  const order = req.query.sortOrder
  let sortOrder = {};
  if(order==="lowest"){
    sortOrder = {price:1};
  }else if(order==="highest"){
    sortOrder = {price:-1};
  }else{
    sortOrder =  {updatedAt: -1 };
  }
    // (req.query.sortOrder === 'lowest' ? { price: -1 } : { price: 1 })
    // :
   
  const products = (slug)? await Product.find({ category:category, ...searchKeyword }).sort(sortOrder) :await Product.find({ ...searchKeyword }).sort(sortOrder) ;
  res.send(products);
});

router.get("/:id", async (req, res) => {
  //console.log(req.params.id);
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." ,success: false});
  }
});

router.post('/:id/reviews', isAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    let count = (product.reviews.length!==0) ? product.reviews.length:1; 
    product.rating =
     ( product.reviews.reduce((a, c) => c.rating + a, 0) /
      count);
    const updatedProduct = await product.save();
    res.status(201).send({
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      message: 'Review saved successfully.',
      success: true,
    });
  } else {
    res.status(404).send({ message: 'Product Not Found',success: false });
  }
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    if(req.body.image!=='' && product.image!==req.body.image){
       const img_path = product.image;
       const file_path = process.env.DIRECTORY_PATH+img_path;
       fs.unlink(file_path, (err) => {
         if (err) {
           console.error(`Error removing file: ${err}`);
           return;
         }
         console.log(`File ${file_path} has been successfully removed.`);
       });
    }
    product.name = req.body.name ? req.body.name : product.name;
    product.price = req.body.price;
    product.image = req.body.image ? req.body.image : product.image;
    product.brand = req.body.brand ? req.body.brand : product.brand;
    product.category = req.body.category ? req.body.category : product.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description? req.body.description : product.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res.status(200).send({ message: 'Product Updated', data: updatedProduct,success: true, });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Product.' ,success: false});

});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const  deletedProduct = await Product.findById(req.params.id);
  const result = await Product.findByIdAndDelete(req.params.id);
  const img_path = deletedProduct.image;
  const file_path = process.env.DIRECTORY_PATH+img_path;
  fs.unlink(file_path, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }
    console.log(`File ${file_path} has been successfully removed.`);
  });
  if (result) {
    res.status(201).send({ message: "Product Deleted Successfully",success: true });
  } else {
    res.status(500).send({message:"Error in Deletion.",success: false});
  }
});


router.post("/", isAuth, isAdmin, async (req, res) => {
  try{
   switch(true){
    case !req.body.name: 
    return res.status(500).send({ error: "Name is Required",success: false });
    case !req.body.image:
      return res.status(500).send({ error: "Image is Required",success: false });
    case !req.body.brand:
      return res.status(500).send({ error: "Brand is Required" ,success: false});
    case !req.body.category:
      return res.status(500).send({ error: "Category is Required",success: false });
    case !req.body.description:     
    return res.status(500).send({ error: "Description is Required" ,success: false});   
   }

   // for countInstock , prices and reviews we have default values in the model

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res.status(201).send({ message: 'New Product Created', data: newProduct ,success: true});
  }
  return res.status(500).send({ message: ' Error in Creating Product.',success: false, });}
  catch(error){
    console.log(error);
  }
})


export default router;