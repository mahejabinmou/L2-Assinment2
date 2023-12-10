import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// Create a new user
// router.post('/create-user', UserControllers.createUser);
router.post('/', UserControllers.createUser);

// Retrieve a list of all users
router.get('/', UserControllers.getAllUsers);

// Retrieve a specific user by ID
router.get('/:userId', UserControllers.getSingleUsers);

// Update user information
router.put('/:userId', UserControllers.updateSingleUser);

// Delete a user
router.delete('/:userId', UserControllers.deleteSingleUser);

// Add a New Product in Order
router.put('/:userId/orders', UserControllers.addNewProduct);

// Retrieve all orders for a specific user
router.get('/:userId/orders', UserControllers.getAllOrdersFromUser);

// Calculate Total Price of Orders for a Specific Users
router.get(
  '/:userId/orders/total-price',
  UserControllers.getTotalOrdersPriceByUser,
);

export const UserRoutes = router;
