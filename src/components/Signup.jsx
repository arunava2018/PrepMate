import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signup } from "../db/apiAuth";
import { UrlState } from "../context";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// ✅ Validation Schema
const signupSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  college: Yup.string().required("College name is required"),
  passoutYear: Yup.number()
    .typeError("Passout year must be a number")
    .min(2000, "Enter a valid year")
    .max(new Date().getFullYear() + 10, "Year too far")
    .required("Passout year is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

function Signup() {
  const navigate = useNavigate();
  const { fetchUser } = UrlState(); // ✅ Get fetchUser from context
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    passoutYear: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      setLoading(true);
      await signupSchema.validate(formData, { abortEarly: false });

      // 1️⃣ Call signup API
      await signup(formData);

      // 2️⃣ Refresh user in context
      await fetchUser();

      // 3️⃣ Show success alert
      setSuccessAlert(true);

      // 4️⃣ Automatically navigate to dashboard after 2s
      setTimeout(() => navigate("/dashboard"), 2000);

    } catch (err) {
      if (err?.inner) {
        // Yup validation errors
        const newErrors = {};
        err.inner.forEach((e) => (newErrors[e.path] = e.message));
        setErrors(newErrors);
      } else {
        // API errors
        setErrors({ general: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>

      {successAlert && (
        <Alert variant="success" className="mb-4">
          <AlertTitle>Signup Successful!</AlertTitle>
          <AlertDescription>
            Your account has been created. Redirecting to dashboard...
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1">
            <Input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* College */}
          <div className="space-y-1">
            <Input
              name="college"
              type="text"
              placeholder="College Name"
              value={formData.college}
              onChange={handleInputChange}
            />
            {errors.college && <p className="text-red-500 text-sm">{errors.college}</p>}
          </div>

          {/* Passout Year */}
          <div className="space-y-1">
            <Input
              name="passoutYear"
              type="number"
              placeholder="Passout Year"
              value={formData.passoutYear}
              onChange={handleInputChange}
            />
            {errors.passoutYear && <p className="text-red-500 text-sm">{errors.passoutYear}</p>}
          </div>

          {/* Password (full width) */}
          <div className="space-y-1 relative md:col-span-2">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
        </CardContent>

        {errors.general && <p className="text-red-500 text-center mt-2">{errors.general}</p>}

        <CardFooter>
          <Button type="submit" disabled={loading} className="w-full space-y-1">
            {loading ? <BeatLoader size={10} color="#fff" /> : "Signup"}
          </Button>
        </CardFooter>
      </form>

      <p className="mx-auto mt-2">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/auth/login")}
          className="text-yellow-400 underline cursor-pointer"
        >
          Login
        </span>
      </p>
    </Card>
  );
}

export default Signup;
