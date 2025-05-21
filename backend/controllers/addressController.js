import Address from '../models/Address.js';
import User from '../models/userModel.js'; 

// Create a new address
export const createAddress = async (req, res) => {
  try {
    const { firstName, lastName, streetAddress, city, state, country, zipCode, phoneNumber, email } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !streetAddress || !city || !state || !country || !zipCode || !phoneNumber || !email) {
      return res.status(400).json({ 
        error: 'All fields are required',
        receivedFields: Object.keys(req.body),
        requiredFields: ['firstName', 'lastName', 'streetAddress', 'city', 'state', 'country', 'zipCode', 'phoneNumber', 'email']
      });
    }

    const newAddress = new Address({
      user: req.user._id,
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      country,
      zipCode,
      phoneNumber,
      email
    });

    // Check if this is the first address
    const existingAddresses = await Address.find({ user: req.user._id });
    if (existingAddresses.length === 0) {
      newAddress.isDefault = true;
    }

    const savedAddress = await newAddress.save();
    
    // Add address reference to user
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { addresses: savedAddress._id } },
      { new: true }
    );

    res.status(201).json(savedAddress);
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ 
      error: 'Failed to create address',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Get all addresses for the user
export const getUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Set a specific address as default
export const setDefaultAddress = async (req, res) => {
  try {
    // First reset all addresses to non-default
    await Address.updateMany(
      { user: req.user._id },
      { $set: { isDefault: false } }
    );

    // Then set the selected address as default
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: { isDefault: true } },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    res.json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};