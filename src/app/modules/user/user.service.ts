import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

// Create a new user
const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }
  const result = await User.create(userData);
  return result;
};

// Retrieve a list of all users
const getAllUsersFromDB = async () => {
  const result = await User.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });

  return result;
};

// Retrieve a specific user by ID
const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

// Update user information
const updateUserFromDB = async (userId: number, user: TUser) => {
  await User.updateOne({ userId }, { $set: user }, { new: true });

  const result = await User.findOne({ userId });
  return result;
};

// Delete a user
const deleteUserFromDB = async (userId: number) => {
  const result = await User.deleteOne({ userId });
  return result;
};

// Add New Product in Order
const addNewProductInUserIntoDb = async (userId: number, order: TOrder) => {
  const result = await User.updateOne(
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
  const result = await User.findOne({ userId }).select({ orders: 1, _id: 0 });
  return result;
};

// Calculate Total Price of Orders for a Specific User
const getTotalOrdersPriceByUserIntoDB = async (userId: number) => {
  const result = await User.aggregate([
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
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
  addNewProductInUserIntoDb,
  getAllOrdersFromUserIntoDB,
  getTotalOrdersPriceByUserIntoDB,
};
