import crypto from "crypto";
export const generateOtp =  () => {
  const otp = crypto.randomInt(0, Math.pow(10,4)).toString().padStart(4, '0');
  return otp;
};

