const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const createmodel = require("../middleware/createmodel");
const apiAuth = require("../middleware/apiAuth")

router.route("/:project/users/signup").post(apiAuth, async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})

router.route("/:project/users/signin").post(apiAuth, async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})




router.route("/:project/:table/:id")
    .get(createmodel, async (req, res) => {
        try {
            const Model = mongoose.models[req.table];
            const data = await Model.findById(req.params.id);
            res.status(200).json({ data });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Error Occured", error });
        }
    })
    .delete(createmodel, async (req, res) => {
        try {
            const Model = mongoose.models[req.table];
            const data = await Model.findOneAndDelete({ _id: req.params.id });
            if (!data) {
                return res.status(400).send({ message: "Object Not exist or Already Deleted" })
            }
            res.status(200).json({ data });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Error Occured", error });
        }
    })
    .put(createmodel, async (req, res) => {
        try {
            const Model = mongoose.models[req.table];
            const object = await Model.findById(req.params.id);
            if (!object) {
                return res.status(400).send({ message: "Object with given id not exist" })
            }
            object.set(req.body);
            await object.save();
            res.status(200).json({ data: object });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Error Occured", error });
        }
    })



router.route("/:project/:table").post(createmodel, async (req, res) => {
    try {

        const Model = mongoose.models[req.table];
        const object = new Model(req.body);
        console.log(object);
        await object.save();

        res.status(200).json({ data: object });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})
    .get(createmodel, async (req, res) => {
        try {
            const Model = mongoose.models[req.table];
            const data = await Model.find({});
            res.status(200).json({ data });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Error Occured", error });
        }
    })



module.exports = router;