import { useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Recaptcha = ({ onVerify }: any) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    const verifyCallback = async () => {
      if (executeRecaptcha) {
        const token = await executeRecaptcha();
        onVerify(token);
      }
    };
    verifyCallback();
  }, [executeRecaptcha, onVerify]);

  return null;
};

export default Recaptcha;
