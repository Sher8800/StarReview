import { Schema, model } from 'mongoose'

const CommentsSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        comments: { type: String, },
        rating: { type: Number }
    },
    { timestamps: true }
)

export default model('Comments', CommentsSchema)