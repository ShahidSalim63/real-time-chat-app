import { Model, Schema, model } from 'mongoose'

//Mongoose pluralizes names of Models by default
//Models are Mongoose' abstraction that maps to a MongoDB Collection  
//Models are interface to interact with the Collections 
//Collections (The actual data store) (Similar to SQL Tables) are a group of Documents (Similar to SQL Rows)

const messageSchema = new Schema(
    {
        senderId: {
            type: Schema.Types.ObjectId, //Reference to another document (Instance of a Model )
            ref: 'User', //Similar to Foreign Key in SQL. 
            required: true //We reference another model by it's name during modelling.
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String
        },
        image: {
            type: String
        }
    },
    { timestamps: true }
)

export const Message = new model('Message', messageSchema)
