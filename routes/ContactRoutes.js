const express = require("express");
const router = express.Router();  
const {getContacts,getContact,createContact,updateContact,deleteContact} = require("../Controllers/ContactController");
const validateToken = require("../middleware/validateTokenHandler");

// one way of doing the thing!! 

// router.route("/").get (getContacts)

// router.route("/:id").get(getContact)

// router.route("/").post(createContact)

// router.route("/:id").put(updateContact)

// router.route("/:id").delete(deleContact)

// other way

// if all the routes are protected routes then use below way
router.use(validateToken);
router.route("/").get(getContacts).post(createContact)
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)

module.exports = router; 

