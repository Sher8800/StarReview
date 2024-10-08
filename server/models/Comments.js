import { Schema, model } from 'mongoose'

const CommentsSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        authorName: { type: String, required: true },
        recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        comments: { type: String, required: true },
        rating: { type: Number, required: true }
    },
    { timestamps: true }
)

export default model('Comments', CommentsSchema)