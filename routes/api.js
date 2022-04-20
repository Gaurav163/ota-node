const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const createmodel = require("../middleware/createmodel");
const apiAuth = require("../middleware/apiAuth");
const jwt = require('jsonwebtoken');
const { route } = require("./project");



const isauth = async (token, secret) => {
    try {
        const decodedToken = await jwt.verify(token, secret);
        return decodedToken;
    } catch (error) {
        return false;
    }
}

router.route("/:project/users/signup").post(apiAuth, async (req, res) => {
    try {
        let access = req.s_auth;
        if (access === 3 || access === 5) {
            if (req.query.key !== req.skey) {
                return res.status(400).send({ message: "Key id not provided or key Mismatched" });
            }
        }
        const Model = mongoose.models[req.table];
        const checkuser = await Model.findOne({ username: req.username });
        if (checkuser) {
            res.status(400).send({ message: "Username already user" });
        }
        const user = new Model(req.body);
        await user.save();
        res.send({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})

router.route("/:project/users/signin").post(apiAuth, async (req, res) => {
    try {
        let access = req.s_auth;
        if (access === 3 || access === 5) {
            if (req.query.key !== req.skey) {
                return res.status(400).send({ message: "Key id not provided or key Mismatched" });
            }
        }
        const Model = mongoose.models[req.table];
        const user = await Model.findOne({ username: req.body.username });;
        if (!user) {
            return res.status(400).send({ message: "Username Invalid" });
        }
        if (user.password !== req.body.password) {
            return res.status(400).send({ message: "Wrong Password" });
        }
        if (user && req.body.password === user.password) {
            const payload = {
                id: user._id,
                username: user.username
            }
            const token = jwt.sign(payload, req.stoken);
            res.send({ token, user });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})

router.route("/:project/users/all").get(apiAuth, async (req, res) => {
    try {
        let access = req.tableinfo.s_get;
        if (access === 5 || access == 3) {
            if (req.query.key !== req.skey) {
                return res.status(400).send({ message: "Key id not provided or key Mismatched" });
            }
        }
        const Model = mongoose.models[req.table];
        const users = await Model.find({}, "-password -_id");
        res.send({ data: users });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})

router.route("/:project/users/profile").get(apiAuth, async (req, res) => {
    try {
        let access = req.tableinfo.s_getbyid;
        if (access === 5) {
            if (req.query.key !== req.skey) {
                return res.status(400).send({ message: "Key id not provided or key Mismatched" });
            }
        }
        const Model = mongoose.models[req.table];
        const token = req.cookies.token || req.headers["x-auth-token"] || req.header["x-access-token"];
        const user = await isauth(token, req.stoken);
        if (user) {
            const userr = await Model.findOne({ username: user.username });
            res.send({ user: userr });
        } else {
            res.status(403).send({ message: "Access not allowed" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
}).put(apiAuth, async (req, res) => {
    try {
        let access = req.tableinfo.s_put;
        if (access === 5) {
            if (req.query.key !== req.skey) {
                return res.status(400).send({ message: "Key id not provided or key Mismatched" });
            }
        }
        const Model = mongoose.models[req.table];
        const token = req.cookies.token || req.headers["x-auth-token"] || req.header["x-access-token"];
        const user = await isauth(token, req.stoken);
        if (user) {
            const userr = await Model.findOne({ username: user.username });
            userr.set(req.body);
            await userr.save();
            res.send({ user: userr });
        } else {
            res.status(403).send({ message: "Access not allowed" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
}).delete(apiAuth, async (req, res) => {
    try {
        let access = req.tableinfo.s_delete;
        if (access === 5) {
            if (req.query.key !== req.skey) {
                return res.status(400).send({ message: "Key id not provided or key Mismatched" });
            }
        }
        const Model = mongoose.models[req.table];
        const token = req.cookies.token || req.headers["x-auth-token"] || req.header["x-access-token"];
        const user = await isauth(token, req.stoken);
        if (user) {
            const userr = await Model.findOneAndDelete({ username: user.username });
            res.send({ user: userr });
        } else {
            res.status(403).send({ message: "Access not allowed" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})




router.route("/:project/:table/:id")
    .get(createmodel, async (req, res) => {

        let access = req.tableinfo.s_getbyid;
        if (access === 3 || access === 5) {
            if (req.query.key !== req.skey) {
                return res.status(400).send({ message: "Key id not provided or key Mismatched" });
            }
        }
        if (access === 4 || access === 5) {
            console.log("haa");
            const token = req.cookies.token || req.headers["x-auth-token"] || req.header["x-access-token"];
            const isvalid = await isauth(token, req.stoken)
            if (!isvalid) {
                return res.status(401).json({ message: "Login Required for this api" });
            }
        }

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

        //secure 
        let access = req.tableinfo.s_delete;
        if (access === 3 || access === 5) {
            if (req.query.key !== req.skey) {
                return res.status(400).send({ message: "Key id not provided or key Mismatched" });
            }
        }
        if (access === 4 || access === 5) {
            console.log("haa");
            const token = req.cookies.token || req.headers["x-auth-token"] || req.header["x-access-token"];
            const isvalid = await isauth(token, req.stoken)
            if (!isvalid) {
                return res.status(401).json({ message: "Login Required for this api" });
            }
        }

        //end
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

        //secure 
        let access = req.tableinfo.s_put;
        if (access === 3 || access === 5) {
            if (req.query.key !== req.skey) {
                return res.status(400).send({ message: "Key id not provided or key Mismatched" });
            }
        }
        if (access === 4 || access === 5) {
            console.log("haa");
            const token = req.cookies.token || req.headers["x-auth-token"] || req.header["x-access-token"];
            const isvalid = await isauth(token, req.stoken)
            if (!isvalid) {
                return res.status(401).json({ message: "Login Required for this api" });
            }
        }

        //end

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
    //secure 
    let access = req.tableinfo.s_post;
    if (access === 3 || access === 5) {
        if (req.query.key !== req.skey) {
            return res.status(400).send({ message: "Key id not provided or key Mismatched" });
        }
    }
    if (access === 4 || access === 5) {
        console.log("haa");
        const token = req.cookies.token || req.headers["x-auth-token"] || req.header["x-access-token"];
        const isvalid = await isauth(token, req.stoken)
        if (!isvalid) {
            return res.status(401).json({ message: "Login Required for this api" });
        }
    }

    //end
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
        //secure 
        let access = req.tableinfo.s_get;
        if (access === 3 || access === 5) {
            if (req.query.key !== req.skey) {
                return res.status(400).send({ message: "Key id not provided or key Mismatched" });
            }
        }
        if (access === 4 || access === 5) {
            console.log("haa");
            const token = req.cookies.token || req.headers["x-auth-token"] || req.header["x-access-token"];
            const isvalid = await isauth(token, req.stoken)
            if (!isvalid) {
                return res.status(401).json({ message: "Login Required for this api" });
            }
        }

        //end
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