import { Schema, model } from 'mongoose';
import { Address, FullName, Orders, User, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<FullName>(
  {
    firstName: { type: String },
    lastName: { type: String },
  },
  {
    _id: false,
  },
);

const ordersSchema = new Schema<Orders>(
  {
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  },
  {
    _id: false,
  },
);

const addressSchema = new Schema<Address>(
  {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
  {
    _id: false,
  },
);

// const hobbiesSchema = new Schema<Hobbies>([{ type: String }]);

const userSchema = new Schema<User>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: { type: String, select: false },
  fullName: { type: fullNameSchema },
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: { type: [String] },
  address: { type: addressSchema },
  orders: { type: [ordersSchema] },
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; //doc

  //hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds),
  );
  next();
});

// delete password for not showing in response
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};
// creating custom static method
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await TUser.findOne({ userId });

  return existingUser;
};

export const TUser = model<User, UserModel>('TUser', userSchema);
// export const UserModel = model<User>('User', userSchema);
