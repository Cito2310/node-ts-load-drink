import { Router } from "express";
import { check } from "express-validator";

import { checkFields } from '../middlewares/checkFields';
import { checkSizeUnit } from '../middlewares/checks';

import { createProduct, getProduct, removeProduct, updateProduct, modifyAmountProduct } from './productController';

export const routeProduct = Router();

routeProduct.get("/", getProduct)

routeProduct.post("/", [
    check("brand", "brand is required").trim().notEmpty(),
    check("brand", "brand length can only be greater than 2 and less than 20").trim().isLength({min:2, max: 20}),
    check("brand", "brand must be a string").trim().isString(),
    
    check("category", "category is required").trim().notEmpty(),
    check("category", "category length can only be greater than 2 and less than 20").trim().isLength({min:2, max: 20}),
    check("category", "category must be a string").trim().isString(),
    
    check("location", "location can only be less than 100 and greater than 0").trim().isInt({ min: 0, max: 99 }),
    check("location", "location is required").trim().notEmpty(),
    check("location", "location must be a integer number").trim().isInt(),

    check("flavor", "flavor is required").trim().notEmpty(),
    check("flavor", "flavor length can only be greater than 2 and less than 20").trim().isLength({min:2, max: 20}),
    check("flavor", "flavor must be a string").trim().isString(),
    
    check("size", "size is required").trim().notEmpty(),
    check("size", "size length can only be greater than 2 and less than 20").trim().isLength({min:2, max: 20}),
    check("size", "size must be a string").trim().isString(),
    check("size", "unit not valid - only 'l' 'ml' 'cc' 'oz'").trim().custom(checkSizeUnit),
    
    checkFields
], createProduct)

routeProduct.delete("/:id", [
    check("id", "id must be a MongoId").isMongoId(),
    checkFields
], removeProduct)

routeProduct.put("/:id", [
    check("id", "id must be a MongoId").isMongoId(),

    check("brand", "brand length can only be greater than 2 and less than 20").trim().optional().isLength({min:2, max: 20}),
    check("brand", "brand must be a string").trim().optional().isString(),
    
    check("category", "category length can only be greater than 2 and less than 20").trim().optional().isLength({min:2, max: 20}),
    check("category", "category must be a string").trim().optional().isString(),
    
    check("location", "location can only be less than 100 and greater than 0").trim().optional().isInt({ min: 0, max: 99 }),
    check("location", "location must be a integer number").trim().optional().isInt(),

    check("flavor", "flavor length can only be greater than 2 and less than 20").trim().optional().isLength({min:2, max: 20}),
    check("flavor", "flavor must be a string").trim().optional().isString(),
    
    check("size", "size length can only be greater than 2 and less than 20").trim().optional().isLength({min:2, max: 20}),
    check("size", "size must be a string").trim().optional().isString(),
    check("size", "unit not valid - only 'l' 'ml' 'cc' 'oz'").trim().optional().custom(checkSizeUnit),

    checkFields
], updateProduct)

routeProduct.put("/amount/:id", [
    check("id", "id must be a MongoId").isMongoId(),

    check("newAmount", "amount is required").trim().notEmpty(),
    check("newAmount", "amount length can only be greater than 0 and less than 200").trim().isInt({min:0, max: 200}),
    check("newAmount", "amount must be a integer number").trim().isInt(),

    checkFields
], modifyAmountProduct)