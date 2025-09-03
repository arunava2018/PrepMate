import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BeatLoader } from "react-spinners";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { login } from "@/db/apiAuth";
import { UrlState } from "@/context";

// ✅ Login validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const { fetchUser } = UrlState();
  const emailInputRef = useRef(null);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  useEffect(() => {
    // Autofocus email input on mount
    emailInputRef.current?.focus();
  }, []);

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
      await loginSchema.validate(formData, { abortEarly: false });

      // Call login API
      await login(formData);

      // Refresh user in context
      await fetchUser();

      // Show success alert
      setSuccessAlert(true);

      // Redirect after 2s
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      if (err.inner) {
        const newErrors = {};
        err.inner.forEach((e) => (newErrors[e.path] = e.message));
        setErrors(newErrors);
      } else {
        setErrors({ general: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  // Disable submit if loading or validation errors or empty fields
  const isSubmitDisabled =
    loading ||
    !formData.email ||
    !formData.password ||
    Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {successAlert && (
        <Alert variant="success" className="mb-4">
          <AlertTitle>Login Successful!</AlertTitle>
          <AlertDescription>Redirecting to dashboard...</AlertDescription>
        </Alert>
      )}

      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          ref={emailInputRef}
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="relative space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      {/* General error */}
      {errors.general && (
        <p className="text-red-500 text-sm">{errors.general}</p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitDisabled}
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
      >
        {loading ? <BeatLoader size={10} color="#fff" /> : "Login"}
      </Button>

      <p className="mx-auto">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/auth/signup")}
          className="text-yellow-400 underline cursor-pointer"
        >
          Register
        </span>
      </p>
    </form>
  );
}
