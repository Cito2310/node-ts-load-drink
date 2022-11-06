import { Request, Response } from "express";

import { BodyInputProduct } from '../interfaces/bodyInputProduct';
import { bodyUpdateProduct } from '../interfaces/bodyUpdateProduct';

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

    // check exist product with id
    const existProduct = await Product.findById(id);
    if (!existProduct) {return res.status(404).json({msg: "product id not exist"})}

    // remove product with id
    await Product.findByIdAndDelete(id);
    return res.status(200).json({msg: "product removed successfully"})
}

export const updateProduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { __v, _id, amount, ...product } = req.body as bodyUpdateProduct;

    // check exist product with id
    const existProduct = await Product.findById(id);
    if (!existProduct) {return res.status(404).json({msg: "product id not exist"})}

    // check body not is empty
    if (Object.keys(product).length === 0) {return res.status(400).json({msg: "body is empty"})}
    
    // create payload
    let payload = {} as bodyUpdateProduct;
    if (product.brand) { payload.brand = product.brand }
    if (product.category) { payload.category = product.category }
    if (product.flavor) { payload.flavor = product.flavor }
    if (product.location) { payload.location = product.location }
    if (product.size) { payload.size = product.size }
    
    // check payload not is empty
    if (Object.keys(payload).length === 0) {return res.status(400).json({msg: "there is no valid property on the body"})}


    // update product
    const updateProduct = await Product.findByIdAndUpdate(id, payload, { new: true });
    return res.status(200).json(updateProduct)
}

export const modifyAmountProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { newAmount } = req.body;

    // check exist product with id
    const existProduct = await Product.findById(id);
    if (!existProduct) {return res.status(404).json({msg: "product id not exist"})}

    // update amount product
    const updateProduct = await Product.findByIdAndUpdate(id, {amount: newAmount}, { new: true });
    return res.status(200).json(updateProduct)
}