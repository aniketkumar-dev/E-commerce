import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModule.js";

// function for add products
const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller
        } = req.body;

        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter(Boolean);

        console.log("FILES:", req.files);

        const uploadToCloudinary = (filePath) => {
            return new Promise((resolve, reject) => {

                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "image",
                        folder: "products"
                    },
                    (error, result) => {
                        if (error) {
                            console.log(
                                "CLOUDINARY UPLOAD ERROR:",
                                error
                            );
                            reject(error);
                        } else {
                            console.log(
                                "UPLOAD SUCCESS:",
                                result.secure_url
                            );
                            resolve(result.secure_url);
                        }
                    }
                );

                fs.createReadStream(filePath).pipe(uploadStream);
            });
        };

        const imagesUrl1 = [];

        for (const item of images) {
            console.log("Uploading file:", item.path);

            const imageUrl = await uploadToCloudinary(item.path);

            imagesUrl1.push(imageUrl);
        }

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true",
            sizes: JSON.parse(sizes),
            image: imagesUrl1,
            date: Date.now()
        };

        console.log("PRODUCT DATA:", productData);

        const product = new productModel(productData);

        await product.save();

        res.json({
            success: true,
            message: "Product Added"
        });

    } catch (error) {
        console.log("ADD PRODUCT ERROR:", error);

        res.json({
            success: false,
            message: error.message
        });
    }
};

// function for list products 
const listProduct = async (req, res) => {


    try {


        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }


}

// function for remove  products 
const removeProduct = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single  products information
const singleProduct = async (req, res) => {
    try {

        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}

export { listProduct, addProduct, removeProduct, singleProduct }
