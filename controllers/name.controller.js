const db = require("../models")
const { Names } = db;
const addName = async (req, res, next) => {
    try {
        const { name } = req.body;
        const newName = await Names.create({
            name: name
        });
        if (!newName) {
            console.log("Not created");
        }
        return res.status(201).send(newName);
    } catch (error) {
        next(error)
    }
}
module.exports = { addName }