const mongoose = require("mongoose");
const schema = mongoose.Schema;


// s stands for secureurity
// 1 means disable
// 2 means public
// 3 means secured by key
// 4 means authentication check
// 5 both auth and key check
const tableSchema = new schema(
    {
        name: String,
        schema: String,
        s_get: { type: Number, default: 3 },
        s_post: { type: Number, default: 3 },
        s_put: { type: Number, default: 3 },
        s_delete: { type: Number, default: 3 },
        s_getbyid: { type: Number, default: 3 }
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
