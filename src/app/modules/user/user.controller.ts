import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema, {
  ordersValidationSchema,
} from './user.validation';
import { TUser } from './user.model';

//create a new user for
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    //data validation using zod
    const zodParseData = userValidationSchema.parse(userData);

    //will call service function to send this data
    const result = await UserServices.createUserIntoDB(zodParseData);

    //send response

    res.status(200).json({
      success: true,
      message: 'User  created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

//all user
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

//single user by id
const getSingleUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUsersFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// Update user information
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    // check user exists or not
    const userIsExists = await TUser.isUserExists(Number(userId));
    if (!userIsExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const result = await UserServices.updateUserFromDB(
      Number(userId),
      userData,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// Delete a user
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // check user exists or not
    const userIsExists = await TUser.isUserExists(Number(userId));
    if (!userIsExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    await UserServices.deleteUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const addNewProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    // check user exists or not
    const userIsExists = await TUser.isUserExists(Number(userId));
    if (!userIsExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // data validation using zod
    const zodParsedData = ordersValidationSchema.parse(userData);

    await UserServices.addNewProductInUserIntoDb(Number(userId), zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// Retrieve all orders for a specific user
const getAllOrdersFromUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // check user exists or not
    const userIsExists = await TUser.isUserExists(Number(userId));
    if (!userIsExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const result = await UserServices.getAllOrdersFromUserIntoDB(
      Number(userId),
    );
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// Calculate Total Price of Orders for a Specific User
const getTotalOrdersPriceByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // check user exists or not
    const userIsExists = await TUser.isUserExists(Number(userId));
    if (!userIsExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const result = await UserServices.getTotalOrdersPriceByUserIntoDB(
      Number(userId),
    );
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: Number.isInteger(result[0]?.totalPrice)
          ? result[0]?.totalPrice
          : parseFloat(result[0]?.totalPrice.toFixed(2)) || 0,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};
export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUsers,
  updateSingleUser,
  deleteSingleUser,
  addNewProduct,
  getAllOrdersFromUser,
  getTotalOrdersPriceByUser,
};
