import { Schema, model } from 'mongoose'

const RoleSchema = new Schema(
    {
        role: { type: String, unique: true, default: 'USER' }
    }
)

export default model('Role', RoleSchema)