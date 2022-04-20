const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Project = require("../models/project");
const crypto = require("crypto");
const mongoose = require("mongoose");
const User = require("../models/user");

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
            const user = await User.findById(req.user.id);
            user.projects.push(project.name);
            await newproject.save();
            await user.save();
            res.status(200).json({ project: newproject });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured" });
    }
})

router.route("/projects").get(auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id, "projects -_id");
        res.send(user);

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

router.route("/secure/:project/:table").post(auth, async (req, res) => {
    try {
        const project = await Project.findOne({ name: req.params.project, "tables.name": req.params.table });
        if (!project) {
            return res.status(400).json({ message: "Project not exist" });
        }
        if (project.owner != req.user.email) {
            return res.status(403).json({ message: "Access not Allowed" });
        }
        const data = {};

        if (req.body.s_get && req.body.s_get > 0 && req.body.s_get <= 5)
            data.s_get = req.body.s_get;
        if (req.body.s_post && req.body.s_post > 0 && req.body.s_post <= 5)
            data.s_post = req.body.s_post;
        if (req.body.s_delete && req.body.s_delete > 0 && req.body.s_delete <= 5)
            data.s_delete = req.body.s_delete;
        if (req.body.s_put && req.body.s_put > 0 && req.body.s_put <= 5)
            data.s_put = req.body.s_put;
        if (req.body.s_getbyid && req.body.s_getbyid > 0 && req.body.s_getbyid <= 5)
            data.s_getbyid = req.body.s_getbyid;

        project.tables.forEach(table => {
            if (table.name === req.params.table) {
                table.set(data);
            }
        })
        await project.save();
        res.send({ message: "Table Access updated", updates: data });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error: error.message });
    }
})

router.route("/secureauth/:project").post(auth, async (req, res) => {
    try {
        const project = await Project.findOne({ name: req.params.project });
        if (!project) {
            return res.status(400).json({ message: "Project not exist" });
        }
        if (project.owner != req.user.email) {
            return res.status(403).json({ message: "Access not Allowed" });
        }
        let data = project.s_auth;
        if (!project.apiAuth) {
            return res.status(400).send({ message: "ApiAuth not Enalbled" });
        }
        if (req.body.s_auth && req.body.s_auth >= 1 && req.body.s_auth <= 3) data = req.body.s_auth;
        project.s_auth = data;
        await project.save();
        res.send({ message: "Authentivation Api Access updated", updates: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error: error.message });
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
        project.s_auth = 2;
        await project.save();
        res.send({ message: "API Authentication Enabled for project " + project.name });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error: error.message });
    }
})

router.route("/removeapiauth/:project").get(auth, async (req, res) => {
    try {
        const project = await Project.findOne({ name: req.params.project });
        if (!project) {
            return res.status(400).json({ message: "Project not exist" });
        }
        if (project.owner != req.user.email) {
            return res.status(403).json({ message: "Access not Allowed" });
        }
        if (project.apiAuth === false) {
            return res.send({ message: "API Auth Already disabled for that project" });
        }

        project.apiAuth = false;
        project.s_auth = 1;
        await project.save();
        res.send({ message: "API Authentication Enabled for project " + project.name });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error: error.message });
    }
})

router.route("/:name").get(auth, async (req, res) => {
    try {
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