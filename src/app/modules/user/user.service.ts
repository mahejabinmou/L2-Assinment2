import { Orders, User } from './user.interface';
import { TUser } from './user.model';

const createUserIntoDB = async (userData: User) => {
  if (await TUser.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }
  const result = await TUser.create(userData);
  return result;
};

//all user
const getAllUsersFromDB = async () => {
  const result = await TUser.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });

  return result;
};

//single user by id
const getSingleUsersFromDB = async (userId: number) => {
  const result = await TUser.find({ userId });
  return result;
};

// Update user information
const updateUserFromDB = async (userId: number, user: User) => {
  await TUser.updateOne({ userId }, { $set: user }, { new: true });

  const result = await TUser.findOne({ userId });
  return result;
};

// Delete a user
const deleteUserFromDB = async (userId: number) => {
  const result = await TUser.deleteOne({ userId });
  return result;
};
// Add New Product in Order
const addNewProductInUserIntoDb = async (userId: number, order: Orders) => {
  const result = await TUser.updateOne(
    { userId },
    {
      $push: {
        orders: order,
      },
    },
    { new: true },
  );
  return result;
};

// Retrieve all orders for a specific user
const getAllOrdersFromUserIntoDB = async (userId: number) => {
  const result = await TUser.findOne({ userId }).select({ orders: 1, _id: 0 });
  return result;
};

// Calculate Total Price of Orders for a Specific User
const getTotalOrdersPriceByUserIntoDB = async (userId: number) => {
  const result = await TUser.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    { $project: { _id: 0 } },
  ]);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUsersFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  addNewProductInUserIntoDb,
  getAllOrdersFromUserIntoDB,
  getTotalOrdersPriceByUserIntoDB,
};
