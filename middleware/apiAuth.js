const Project = require("../models/project");
const mongoose = require("mongoose");


module.exports = async (req, res, next) => {
    try {
        const project = await Project.findOne({ name: req.params.project, "tables.name": "users" });
        if (!project) {
            return res.status(400).json({ message: "Invalid Api end point . Either table or project or both not exist" });
        }

        let tableName = "api_" + req.params.project + "_" + req.params.table;
        const table = project.tables.find(obj => obj.name == "users");
        const schema = JSON.parse(table.schema);
        
        if (schema.username == demo.username && schema.password == demo.password) {

            console.log(schema);
        }
        res.send("wow");




    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
}