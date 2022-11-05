import { Router } from "express";
import { check } from "express-validator";

import { checkFields } from '../middlewares/checkFields';

import { createProduct } from './productController';

export const routeProduct = Router();

routeProduct.post("/", [
    // checkFields
], createProduct)