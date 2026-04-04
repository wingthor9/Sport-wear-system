"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useAdminResetPassword } from "@/app/features/hooks";
import { ResetPasswordInput } from "@/modules/auth/auth.type";
import z from "zod";
import { getRedirectPath } from "@/utils/auth";

const resetPasswordSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export default function ResetPasswordPage() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const { mutate: resetPassword, isPending } = useAdminResetPassword();
    const [showPassword, setShowPassword] = useState(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, } = useForm<ResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema), defaultValues: {
            email,
        },
    });
    //   const { handleSubmit, formState: { errors }, setError, clearErrors, } = useForm();


    const onSubmit = (data: ResetPasswordInput) => {

        resetPassword(
            { email, password: data.password },
            {
                onSuccess: () => {
                    toast.success("Password reset successfully!");
                    router.replace("/dashboard")
                    // router.replace(getRedirectPath(resetPassword.user?.role));
                },
                onError: () => {
                    toast.error("Failed to reset password");
                },
            }
        );

    };

    return (
        <>
            <Toaster />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="hidden" {...register("email")} />
                <div className="space-y-2">
                    <Label htmlFor="password">New password</Label>

                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            {...register("password")}
                            className={errors.password ? "border-red-500" : ""}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>

                    {errors.password && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle />
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm password</Label>

                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword")}
                                className={errors.confirmPassword ? "border-red-500" : ""}
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showConfirmPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>

                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle />
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>  */}

                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Resetting password..." : "Reset password"}
                </Button>

            </form>
        </>
    );
}