import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import mail from "@/assets/mail.svg";
import otp from "@/assets/otp.svg";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { InputIcon } from "@/components/ui/input-icon";
import { useBhasiniStore } from "@/store/store";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("Get OTP");
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [otpPin, setOtpPin] = useState(""); // Store OTP from backend here

  const InvalidEmailError = "Invalid Email ID";

  const navigate = useNavigate();
  const InvalidOtpError = "Invalid OTP";

  const { login } = useBhasiniStore();

  const contactRef = useRef<HTMLInputElement>(null);
  const otpRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);

    if (!otpGenerated) {
      const email = contactRef.current?.value || "";
      if (!email || !email.includes("@")) {
        console.log("Invalid Email");
        setError(InvalidEmailError);
        setLoading(false);
        return;
      }

      // Sending POST request to backend to generate OTP
      try {
        const response = await fetch("http://localhost:3000/auth/sendOTP", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();
        setOtpPin(data.otp_pin);
        setButtonText("Verify OTP");
        setOtpGenerated(true);
        setError("");
      } catch (err) {
        setError("Failed to generate OTP.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      const otp = otpRef.current?.value || "";
      if (otp !== otpPin) {
        console.log("Invalid OTP");
        setError(InvalidOtpError);
        setLoading(false);
        return;
      }
      login({
        email: "borncancer21@gmail.com",
        name: "Akshat Sipany",
        token: "test",
        type: "user",
      });
      setError("");
      navigate("/dashboard");
      console.log("Login Successful!");
      setLoading(false);
    }
  }

  return (
    <>
      <Card className="w-full max-w-md p-2">
        <CardHeader className="px-20">
          <CardTitle className="text-2xl text-center top-10">Log In !</CardTitle>
          <CardDescription className="text-center">
            <span>Start contributing now !</span>
          </CardDescription>
          <Button className="bg-lightBlue hover:bg-lightBlueHover">
            Contributor
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div className="grid gap-2">
            <InputIcon
              ref={contactRef}
              icon={mail}
              id="contact"
              type="email"
              placeholder="Email Address"
              required
            />
          </div>
          {otpGenerated && (
            <div className="grid gap-2">
              <InputIcon
                icon={otp}
                ref={otpRef}
                className="appearance-none"
                id="otp"
                type="text"
                maxLength={6}
                placeholder="Enter OTP"
                required
              />
            </div>
          )}
        </CardContent>
        <Button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-bhasiniBlue hover:bg-bhashiniBlueHover w-full"
        >
          {buttonText}
        </Button>
        <CardFooter className="flex items-center justify-center m-5">
          <span>
            New Member ?{" "}
            <a
              className="text-bhasiniBlue hover:cursor-pointer  hover:text-bhashiniBlueHover"
              onClick={() => navigate("/auth/signup")}
            >
              <u>Sign Up</u>
            </a>
          </span>
        </CardFooter>
      </Card>
    </>
  );
};

export default LoginPage;
