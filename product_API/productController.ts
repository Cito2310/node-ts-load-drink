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
    return res.json(newProduct)
}