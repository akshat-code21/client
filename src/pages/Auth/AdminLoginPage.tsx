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
import { useRef, useState, useEffect } from "react";
import { InputIcon } from "@/components/ui/input-icon";
import { useBhasiniStore } from "@/store/store";

const AdminLoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("Get OTP");
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [otpPin, setOtpPin] = useState("");
  const [otpExpiryTime, setOtpExpiryTime] = useState<number | null>(null);
  const [canResend, setCanResend] = useState(false);

  const InvalidEmailError = "Invalid Email ID";
  const navigate = useNavigate();
  const InvalidOtpError = "Invalid OTP. Please Try Again";

  const { login } = useBhasiniStore();
  const contactRef = useRef<HTMLInputElement>(null);
  const otpRef = useRef<HTMLInputElement>(null);

  const otpExpiryDuration = 5 * 60; // OTP expiry time in seconds

  useEffect(() => {
    if (otpExpiryTime && otpExpiryTime > 0) {
      const timer = setInterval(() => {
        setOtpExpiryTime((prev) => (prev ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    } else if (otpExpiryTime === 0) {
      setCanResend(true);
    }
  }, [otpExpiryTime]);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return;

    try {
      const response = await fetch("http://localhost:3000/auth/refreshToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("Token refreshed successfully");
    } catch (err) {
      console.error("Error refreshing token:", err);
    }
  };

  const isTokenExpired = () => {
    const token = localStorage.getItem("token");
    if (!token) return true;
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return tokenData.exp < currentTime;
  };

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
      try {
        const response = await fetch("http://localhost:3000/auth/sendOTP/admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate OTP");
        }

        const data = await response.json();
        setOtpPin(data.otp_pin);
        setButtonText("Verify OTP");
        setOtpGenerated(true);
        setOtpExpiryTime(otpExpiryDuration);
        setError("");
        setCanResend(false);
      } catch (err) {
        setError("Failed to generate OTP.");
        console.error("Error generating OTP:", err);
      } finally {
        setLoading(false);
      }
    } else {
      const email = contactRef.current?.value || "";
      const otp = otpRef.current?.value || "";

      try {
        const response = await fetch("http://localhost:3000/auth/signin/admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        });

        if (!response.ok) {
          throw new Error(InvalidOtpError);
        }

        const loginData = await response.json();
        login({
          email: loginData.email,
          name: loginData.name,
          token: loginData.token,
          type: "admin",
        });

        localStorage.setItem("adminToken", loginData.token);
        localStorage.setItem("refreshToken", loginData.refreshToken);

        setError("");
        console.log("Login Successful! Redirecting...");
        // navigate("/admin/dashboard/overview", { replace: true });
      } catch (err) {
        setError(InvalidOtpError);
        console.error("Error during login:", err);
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleResendOtp() {
    const email = contactRef.current?.value || "";
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/sendOTP/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to resend OTP");
      }

      const data = await response.json();
      setOtpPin(data.otp_pin);
      setOtpExpiryTime(otpExpiryDuration);
      setCanResend(false);
    } catch (err) {
      setError("Failed to resend OTP.");
      console.error("Error resending OTP:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md p-2">
      <CardHeader className="px-20">
        <CardTitle className="text-2xl text-center top-10">Log In!</CardTitle>
        {/* <CardDescription className="text-center">Admin Login</CardDescription> */}
        <Button className="bg-lightBlue hover:bg-lightBlueHover">Admin</Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className="grid gap-2">
          <InputIcon ref={contactRef} icon={mail} id="contact" type="email" placeholder="Email Address" required />
        </div>
        {otpGenerated && (
          <>
            <div className="grid gap-2">
              <InputIcon icon={otp} ref={otpRef} className="appearance-none" id="otp" type="text" maxLength={6} placeholder="Enter OTP" required />
            </div>
            <div className="text-center text-gray-600">
              {otpExpiryTime ? <span>OTP expires in {otpExpiryTime}s</span> : <span className="text-red-500">OTP expired!</span>}
            </div>
          </>
        )}
      </CardContent>
      <Button disabled={loading} onClick={handleSubmit} className="bg-bhasiniBlue hover:bg-bhashiniBlueHover w-full">
        {buttonText}
      </Button>
      {otpGenerated && canResend && (
        <Button disabled={loading} onClick={handleResendOtp} className="bg-gray-400 hover:bg-gray-500 w-full mt-2">
          Resend OTP
        </Button>
      )}
      <CardFooter className="flex items-center justify-center m-5">
          <span>
            New Admin ?
             <a
              className="text-bhasiniBlue hover:cursor-pointer hover:text-bhashiniBlueHover"
              onClick={() => {
                navigate("/auth/admin/signup");
              }}
            >
              <u>Signup</u>
            </a>
          </span>
        </CardFooter>
    </Card>
  );
};

export default AdminLoginPage;
