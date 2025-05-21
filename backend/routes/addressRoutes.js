import express from 'express';
import { createAddress, getUserAddresses, setDefaultAddress } from '../controllers/addressController.js';
import auth from '../middleware/authenticate.js';

const router = express.Router();

router.post('/', auth, createAddress);
router.get('/', auth, getUserAddresses);
router.put('/:id/default', auth, setDefaultAddress);

export default router;
