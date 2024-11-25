'use client';

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@nextui-org/card";

// Function for API call
const registerUser = async (data: any) => {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};

interface IAuth {
  type?: "login" | "register";
}

export default function Auth({ type = "login" }: IAuth) {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Registration successful:", data);
    },
    onError: (error: Error) => {
      console.error("Registration failed:", error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {
      email: formData.email ? "" : "Email is required",
      username: type === "register" && !formData.username ? "Username is required" : "",
      password: formData.password ? "" : "Password is required",
      confirmPassword:
        type === "register"
          ? formData.confirmPassword
            ? formData.confirmPassword === formData.password
              ? ""
              : "Passwords do not match"
            : "Confirm password is required"
          : "",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (!hasErrors) {
      mutation.mutate(formData);
    }
  };

  return (
    <Card className="w-[300px] p-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        {type === "login" ? "Login" : "Register"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {type === "register" && (
          <div>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
        )}

        <div>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {type === "register" && (
          <div>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Submitting..." : type === "login" ? "Login" : "Register"}
        </Button>
        {mutation.isError && (
          <div className="mt-4 text-red-500 text-center">{mutation.error?.message}</div>
        )}
      </form>
    </Card>
  );
}
