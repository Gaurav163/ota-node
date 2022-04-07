const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Project = require("../models/project");
const crypto = require("crypto");
const mongoose = require("mongoose");

router.route("/create").post(auth, async (req, res) => {
    try {
        const p = await Project.findOne({ name: req.body.name });
        if (p) {
            res.status(400).json({ message: "Project " + req.body.name + " Already Exist." })
        } else {
            const project = {};
            project.name = req.body.name;
            project.owner = req.user.email;
            project.token = crypto.randomBytes(32).toString("hex");
            project.key = crypto.randomBytes(12).toString("hex");
            const newproject = new Project(project);
            await newproject.save();
            res.status(200).json({ project: newproject });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured" });
    }
})


router.route("/table").post(auth, async (req, res) => {
    try {
        const project = await Project.findOne({ name: req.body.project });
        console.log(req.body);
        if (!project) {
            return res.status(400).json({ message: "Project not exist" });
        }
        if (project.owner != req.user.email) {
            return res.status(403).json({ message: "Access not Allowed" });
        }

        const old = project.tables.find(o => o.name === req.body.name);
        console.log("old", old);
        if (old) {
            return res.status(400).json({ message: "table already exist" });
        }

        const table = {};
        table.name = req.body.name;
        table.schema = JSON.stringify(req.body.schema);

        project.tables.push(table);
        console.log(project);
        await project.save();
        res.status(200).json({ table: table });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})
    .put(auth, async (req, res) => {
        try {
            console.log("wow");
            const project = await Project.findOne({ name: req.body.project });
            console.log(req.body);
            if (!project) {
                return res.status(400).json({ message: "Project not exist" });
            }
            if (project.owner != req.user.email) {
                return res.status(403).json({ message: "Access not Allowed" });
            }
            const checktable = project.tables.find(table => table.name === req.body.name);
            if (!checktable) {
                return res.status(400).json({ message: "Table not exist" });
            }

            const inputSchema = req.body.schema;
            if (project.apiAuth === true && req.body.name === "users") {
                inputSchema.username = { type: "String", unique: true, required: true };
                inputSchema.password = { type: "String", required: true };
            }
            console.log(inputSchema);

            const schema = JSON.stringify(inputSchema);


            await Project.updateOne({ _id: project._id, "tables._id": checktable._id }, { "$set": { "tables.$.schema": schema } });

            const newSchema = mongoose.Schema(inputSchema);
            const tableName = "api_" + project.name + "_" + req.body.name;

            if (mongoose.models[tableName]) {
                mongoose.models[tableName].schema = newSchema;
                console.log(mongoose.models[tableName].schema);
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Error Occured", error });
        }
    })

router.route("/apiauth/:project").get(auth, async (req, res) => {
    try {
        const project = await Project.findOne({ name: req.params.project });
        if (!project) {
            return res.status(400).json({ message: "Project not exist" });
        }
        if (project.owner != req.user.email) {
            return res.status(403).json({ message: "Access not Allowed" });
        }
        if (project.apiAuth === true) {
            return res.send({ message: "API Auth Already enabled for that project" });
        }
        const users = project.tables.find(table => table.name === "users");
        let schema;
        if (users) {
            schema = JSON.parse(users.schema);
            schema.username = { type: "String", unique: true, required: true };
            schema.password = { type: "String", required: true };
            const newschema = JSON.stringify(schema);
            project.tables.map(table => {
                if (table.name === "users") table.schema = newschema;
            })

        } else {
            schema = {
                username: { type: "String", unique: true, required: true },
                password: { type: "String", required: true }
            }
            const table = {};
            table.name = "users";
            table.schema = JSON.stringify(schema);
            project.tables.push(table);
        }
        const newSchema = mongoose.Schema(schema);
        const tableName = "api_" + project.name + "_users";

        if (mongoose.models[tableName]) {
            mongoose.models[tableName].schema = newSchema;
        }
        project.apiAuth = true;
        await project.save();
        res.send({ message: "API Authentication Enabled for project " + project.name });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error: error.message });
    }
})

router.route("/:name").get(async (req, res) => {
    try {
        req.user = { email: "gouravlathwal63@gmail.com" };
        const project = await Project.findOne({ name: req.params.name });
        if (project) {
            if (project.owner === req.user.email) {
                res.send(project);
            } else {
                res.status(403).send({ message: "Access Denied" });
            }
        } else {
            res.status(400).send({ message: "Project name Invalid" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured" });
    }
})

module.exports = router;