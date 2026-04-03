"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef, useEffect } from "react";
import { AlertCircle, ArrowLeft, Shield } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useAdminVerifyOtp } from "@/app/features/hooks";
import { VerifyOTPInput } from "@/modules/auth/auth.type";
import z from "zod";

const otpSchema = z.object({
    otp: z.string().length(6),
});

export function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const { mutate: verifyOtp, isPending } = useAdminVerifyOtp();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendTimer, setResendTimer] = useState(60);

  const {
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<VerifyOTPInput>({
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    if (!email) router.push("/forgot-password");
  }, [email]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
    clearErrors("otp");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const onSubmit = () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("otp", { message: "Please enter all 6 digits" });
      return;
    }

    verifyOtp(
      { email, otp: otpValue },
      {
        onSuccess: () => {
          toast.success("OTP verified successfully!");
          router.push(`/reset-password?email=${email}`);
        },
        onError: () => {
          setError("otp", { message: "Invalid OTP" });
          toast.error("Invalid OTP");
        },
      }
    );
  };

  return (
    <>
      <Toaster />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Enter OTP
            </Label>

            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className={`w-12 h-12 text-center font-bold ${
                    errors.otp ? "border-red-500" : ""
                  }`}
                />
              ))}
            </div>

            {errors.otp && (
              <p className="text-sm text-red-500 flex items-center gap-1 justify-center">
                <AlertCircle className="h-4 w-4" />
                {errors.otp.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Verifying..." : "Verify OTP"}
          </Button>

          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full py-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

        </form>
    </>
  );
}