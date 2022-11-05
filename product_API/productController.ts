import { Request, Response } from "express";

import { BodyInputProduct } from '../interfaces/bodyInputProduct';

import { Product } from './productModel';

export const createProduct = async (req: Request, res: Response) => {
    const {__v, _id, amount, ...product} = req.body as BodyInputProduct;

    // check exist equal product
    const existEqualProduct = await Product.findOne({ 
        brand: product.brand,
        category: product.category,
        flavor: product.flavor,
        size: product.size,
        location: product.location,
    })
    if (existEqualProduct) {return res.status(400).json({msg: "Exist equal product"})}

    // create and save new product
    const newProduct = new Product(product)
    newProduct.save()
    return res.status(201).json(newProduct)
}

export const getProduct = async (req: Request, res: Response) => {
    const products = await Product.find()
    return res.json(products)
}

export const removeProduct = async (req: Request, res: Response) => {
    const id = req.params.id;

    const existProduct = await Product.findById(id);
    if (!existProduct) {return res.status(404).json({msg: "product id not exist"})}

    await Product.findByIdAndDelete(id);
    return res.status(200).json({msg: "product removed successfully"})
}