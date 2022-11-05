import { model, Schema, Types } from "mongoose";

export interface IProduct {
    brand: string,
    category: string,
    location: number,

    flavor: string,
    size: string,

    amount: number,

    _id: Types.ObjectId,
}

const productSchema = new Schema<IProduct>({
    brand: {type: String, required: true, lowercase: true},
    category: {type: String, required: true, lowercase: true},
    location: {type: Number, required: true},

    flavor: {type: String, required: true, lowercase: true},
    size: {type: String, required: true, lowercase: true},

    amount: {type: Number, default: 0},
})

productSchema.methods.toJSON = function() {
    const {__v , ...rest } = this.toObject();
    return rest;
}

export const Product = model("Product", productSchema);