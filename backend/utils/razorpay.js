import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_TEST_KEY,
  key_secret: process.env.RAZORPAY_TEST_SECRET_KEY,
});

export default razorpay;
