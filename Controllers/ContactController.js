// labels to API Method . controllers contain the logic of request response..

// desc get all contacts
// route GET /api/contacts
// access private   (private when authentication concept involved..)

const asyncHandler  = require("express-async-handler")
const Contact = require("../models/contactModel") 

const getContacts = asyncHandler( async (req,res)=>
{
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts)
});



// desc get a contact
// route GET /api/contact/:id
// access private   (private when authentication concept involved..)


const getContact =  asyncHandler(async (req,res)=>
{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
});



// here the error is in html format to put it in json format we will use custo middleware 
// name=req.body.name(in es6 if key and value are same we just use key.)


// desc create a contact
// route POST /api/contacts
// access private   (private when authentication concept involved..)


const createContact =  asyncHandler(async (req,res)=>
{
    console.log("The request body is:-", req.body)
    const {name,email,phone} = req.body;
    if( !name || !phone || !email)
    {
        res.status(400);
        throw new Error("All fields are mandatory!!");
    }

    const contact = await Contact.create({
        name, email , phone,user_id: req.user.id
    });
    res.status(201).json(contact)
});



// desc update a contact
// route POST /api/contacts
// access private   (private when authentication concept involved..)



const updateContact =  asyncHandler( async (req,res)=>
{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts")
    }




    const updatedContact = await Contact.findByIdAndUpdate (
        req.params.id,
        req.body,
        { new: true} 
    );


    res.status(200).json(updatedContact)
});



// desc delete a contact
// route DELETE /api/contacts
// access private   (private when authentication concept involved..)




const deleteContact =  asyncHandler( async (req,res)=>
{
    const contact = await Contact.findById(req.params.id);

    // if(contact)
    // {
    //     Contact.remove();
    //     res.status(200).json(contact);
        
    // }

    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permission to delete other user contacts")
    }

       await Contact.deleteOne({_id: req.params.id});
       res.status(200).json(contact);
    
    
});

module.exports = {getContacts,getContact,createContact,updateContact,deleteContact}



// Contact.remove(); it removes all contacts