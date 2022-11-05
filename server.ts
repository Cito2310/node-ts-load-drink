import express from "express";
import cors from "cors";

import { dbConnection } from './database/config'; 

import { routeProduct } from "./product_API/productRoutes";

export class Server {
    private app = express()
    private paths = {
        product : "/api/product" 
    }

    constructor(){
        this.middlewares();
        this.routes();
        this.connectDB();
    }

    private routes() {
        this.app.use( this.paths.product , routeProduct)
    }

    private connectDB() {dbConnection()}

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        // this.app.use( express.static("public") );
    }

    public listen() { this.app.listen( process.env.PORT ) }
}