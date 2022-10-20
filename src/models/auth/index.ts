import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  encryptPassword: (password: string) => Promise<string>
  validatePassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    min: 6,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  }
})

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

export default model<IUser>('User', userSchema)
