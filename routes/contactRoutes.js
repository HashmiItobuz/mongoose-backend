import express  from "express";
const router = express.Router();
import {getContacts, createContact, getContact, updateContact, deleteContact} from "../controllers/contactController.js"
import validateToken from "../middleware/validateTokenHandler.js";

//----------------------------------------------
/* First way of routing */

// router.route('/').get(getContacts);

// router.route('/').post(createContact);

// router.route('/:id').get(getContact);

// router.route('/:id').put(updateContact);

// router.route('/:id').delete(deleteContact);

//----------------------------------------------

/* Another way of routing */
router.use(validateToken);
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

export default router
