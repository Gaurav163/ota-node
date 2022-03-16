const mongoose = require("mongoose");
const schema = mongoose.Schema;

const tableSchema = new schema(
    {
        name: String,
        schema: String
    },
    { timestamps: true },
);

const projectSchema = new schema(
    {
        name: { type: String, unique: true, required: true },
        owner: { type: String, required: true },
        token: String,
        key: String,
        apiAuth: { type: Boolean, default: false },
        keySecure: { type: Boolean, default: true },
        tables: [tableSchema]

    },
    { timestamps: true },
);

const Project = mongoose.model("project", projectSchema);
module.exports = Project;
