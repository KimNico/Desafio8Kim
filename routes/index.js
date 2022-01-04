const express = require("express");
const req = require("express/lib/request");
const fs = require("fs")
const path= require("path");
const prod = require("../controller/prodController");


const router  = express.Router();

router.get('/', async(req,res,next)=>{
    res.render("form",{data: await prod.getProductos()})
});

router.get("/productos", async(req,res,next)=>{
    let data = await prod.getProductos();
    res.render("productos",{data})
});

router.post("/productos",async(req,res,next)=>{
    prod.addProduct(req.body)
    res.redirect("/");
})

router.put("/productos/:id",async(req,res,next)=>{
    res.json(await prod.updateProductosById(req.body,req.params.id))
})

module.exports.router;
