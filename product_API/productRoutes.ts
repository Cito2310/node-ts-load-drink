import { Request, Response, Router } from "express";
import { check } from "express-validator";
import { checkFields } from '../middlewares/checkFields';

export const routeProduct = Router();

routeProduct.post("/", [
    // checkFields
], (req: Request, res: Response)=>{res.json("Hello world")})