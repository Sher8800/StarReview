import { Schema, model } from 'mongoose'

const UserSchema = new Schema(
    {
        username: { type: String, required: true, },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, },
        roles: [{ type: String, ref: 'Role' }],
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
    },
    { timestamps: true }
)
export default model('User', UserSchema)