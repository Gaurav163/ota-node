const Project = require("../models/project");
const mongoose = require("mongoose");


module.exports = async (req, res, next) => {
    try {
        const project = await Project.findOne({ name: req.params.project, "tables.name": req.params.table });
        if (!project) {
            return res.status(400).json({ message: "Invalid Api end point" });
        }

        if (req.params.table === "users" && project.apiAuth) {
            return res.status(400).json({ message: "Api Auth is enabled so this route is disabled" });
        }

        let tableName = "api_" + req.params.project + "_" + req.params.table;

        if (mongoose.models[tableName]) {
            const table = project.tables.find(obj => obj.name == req.params.table);
            req.table = tableName;
            req.tableinfo = table;
            req.skey = project.key;
            req.stoken = project.token;
            req.auth = project.apiAuth;
            req.s_auth = project.s_auth;
            next();
        }
        else {
            const table = project.tables.find(obj => obj.name == req.params.table);
            const schema = JSON.parse(table.schema);
            const tableschema = new mongoose.Schema(
                schema, {
                timestamps: true
            });
            mongoose.model(tableName, tableschema);
            req.table = tableName;
            req.tableinfo = table;
            req.skey = project.key;
            req.stoken = project.token;
            req.auth = project.apiAuth;
            req.s_auth = project.s_auth;
            next();
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
}