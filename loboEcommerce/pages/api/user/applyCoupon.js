import { createRouter } from "next-connect";
import User from "../../../models/User";
import Coupon from "../../../models/Coupon";
import Cart from "../../../models/Cart";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";
const handler = createRouter().use(auth);

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { coupon } = req.body;
    // console.log(coupon);
    const user = User.findById(req.user);
    const checkCoupon = await Coupon.findOne({ coupon });
    // console.log(checkCoupon);
    if (checkCoupon == null) {
        // console.log(res, checkCoupon);
        return res.json({ message: "Invalid coupon" });
    }
    const { cartTotal } = await Cart.findOne({ user: req.user });
    let totalAfterDiscount =
      cartTotal - (cartTotal * checkCoupon.discount) / 100;

    await Cart.findOneAndUpdate({ user: user._id }, { totalAfterDiscount }, { new: true });

    res.json({
      totalAfterDiscount: totalAfterDiscount.toFixed(2),
      discount: checkCoupon.discount,
    });

    db.disconnectDb();
    return res.json({ addresses: user.address });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler.handler();
