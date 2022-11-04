import express from "express";
import cors from "cors";

import { routeProduct } from "./product_API/productRoutes";

export class Server {
    private app = express()
    private paths = {
        product : "/api/product" 
    }

    constructor(){
        this.middlewares();
        this.routes();
    }

    private routes() {
        this.app.use( this.paths.product , routeProduct)
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        // this.app.use( express.static("public") );
    }

    public listen() { this.app.listen( process.env.PORT ) }
}