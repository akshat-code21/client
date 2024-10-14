import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import user from "@/assets/user.svg";
import mail from "@/assets/mail.svg";
import phone from "@/assets/phone.svg";
import { InputIcon } from "@/components/ui/input-icon";
import { useRef, useState } from "react";

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const SomethingWentWrongError =
    "No account linked to this contact number found! If you are a new member, sign up first.";
  const InvalidContactError = "Invalid Contact Number";
  const InvalidEmailError = "Invalid Email ID";
  const FormNotFilledError = "Please fill all the fields";

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);

    // Validate form fields
    if (!nameRef.current || !emailRef.current || !contactRef.current) {
      setLoading(false);
      setError("Error");
      return;
    }

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const contact = contactRef.current.value.trim();

    if (name.length === 0) {
      setError(FormNotFilledError);
      setLoading(false);
      return;
    } else if (email.length === 0 || !email.includes("@")) {
      setError(email.length === 0 ? FormNotFilledError : InvalidEmailError);
      setLoading(false);
      return;
    } else if (contact.length !== 10) {
      setError(contact.length === 0 ? FormNotFilledError : InvalidContactError);
      setLoading(false);
      return;
    } 

    setError("");
    const requestBody = {
      name,
      email,
      phoneNumber: contact, 
    };

    // Send POST request to backend
    try {
      const response = await fetch("http://localhost:3000/auth/register/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        
        const data = await response.json();
        setError(data.message || SomethingWentWrongError);
        setLoading(false);
        return;
      }

      
      console.log("Successfully Signed up");
      navigate("/auth/login");
    } catch (error) {
      setError(SomethingWentWrongError);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Card className="w-full max-w-md p-2">
        <CardHeader className="px-20">
          <CardTitle className="text-2xl text-center top-10">Sign Up!</CardTitle>
          <CardDescription className="text-center">
            <span>Start contributing now!</span>
          </CardDescription>
          <Button className="bg-lightBlue hover:bg-lightBlueHover">Contributor</Button>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <InputIcon
              icon={user}
              id="name"
              type="text"
              placeholder="Johnson Doe"
              ref={nameRef}
              required
            />
          </div>
          <div className="grid gap-2">
            <InputIcon
              icon={mail}
              id="email"
              type="email"
              ref={emailRef}
              placeholder="example@email.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <InputIcon
              icon={phone}
              maxLength={10}
              id="contact"
              type="tel" // Change type to 'tel' for phone numbers
              placeholder="+91 9567435261"
              ref={contactRef}
              required
            />
          </div>
        </CardContent>
        <Button
          onClick={handleSubmit}
          className="bg-bhasiniBlue hover:bg-bhashiniBlueHover w-full"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}
        <CardFooter className="flex items-center justify-center m-5">
          <span>
            Already have an account?{" "}
            <a
              className="text-bhasiniBlue hover:cursor-pointer hover:text-bhashiniBlueHover"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              <u>Login</u>
            </a>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
