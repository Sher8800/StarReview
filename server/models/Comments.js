import { Schema, model } from 'mongoose'

const CommentsSchema = new Schema(
    {
        autor: { type: String, required: true },
        comments: { type: String, }
    },
    { timestamps: true }
)

export default model('Comments', CommentsSchema)