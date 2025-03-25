import { Router } from "express";
import Fruit from "../models/fruit.js";

const fruitsRouter = Router();

fruitsRouter.get("/", (req, res) => {
    res.render("index")
})

// Get the create form
fruitsRouter.get("/fruits/new", (req, res) => {
    res.render("fruits/new");
});

// Get all fruits
fruitsRouter.get("/fruits", async (req, res) => {
    const fruits = await Fruit.find({});
    res.render("fruits/index", { fruits });
});

//Display fruit by id
fruitsRouter.get("/fruits/:id", async (req, res) => {
    const {id} = req.params;
    const fruit = await Fruit.findById(id);
    res.render("fruits/show", { fruit });
})

// Create a fruit
fruitsRouter.post("/fruits", async (req, res) => {
    let { name, isReadyToEat } = req.body;

    if (isReadyToEat) {
        isReadyToEat = true;
    } else {
        isReadyToEat = false;
    }
    const fruit = await Fruit.create({ name, isReadyToEat });
    res.redirect("/fruits");
});

//Edit the form
fruitsRouter.put("/fruits/:id/edit", async (req, res) => {
    const {id} = req.params;
    const fruit = await Fruit.findById(id);
    res.render("fruits/edit", { fruit });
})



export default fruitsRouter;