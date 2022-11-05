import { Request, Response } from "express";
import { BodyInputProduct } from '../interfaces/bodyInputProduct';

export const createProduct = (req: Request, res: Response) => {
    const {__v, _id, amount, ...product} = req.body as BodyInputProduct;

    res.json(req.body)
}