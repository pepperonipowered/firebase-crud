import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { auth } from "./../../../config/firebase.ts";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { loginSchema } from "@/lib/schema/login-schema.ts";
import type z from "zod";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const login = async ({ email, password }: z.infer<typeof loginSchema>) => {
        await createUserWithEmailAndPassword(auth, email, password);
        toast("You submitted the following values:", {
            description: (
                <pre className="bg-code text-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                    <code>{JSON.stringify({ email, password }, null, 2)}</code>
                </pre>
            ),
            position: "bottom-right",
            classNames: {
                content: "flex flex-col gap-2",
            },
            style: {
                "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
        });
    };

    const loginForm = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validators: {
            onSubmit: loginSchema,
        },
        onSubmit: ({ value }) => login(value),
    });

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            {...props}
            id="login-form"
            onSubmit={(e) => {
                e.preventDefault();
                loginForm.handleSubmit();
            }}
        >
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">
                        Login to your account
                    </h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your email below to login to your account
                    </p>
                </div>
                <loginForm.Field
                    name="email"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Email
                                </FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    aria-invalid={isInvalid}
                                    autoComplete="off"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                                {isInvalid && (
                                    <FieldError
                                        errors={field.state.meta.errors}
                                    />
                                )}
                            </Field>
                        );
                    }}
                />
                <loginForm.Field
                    name="password"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                        return (
                            <Field data-invalid={isInvalid}>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor={field.name}>
                                        Password
                                    </FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    aria-invalid={isInvalid}
                                    autoComplete="off"
                                    type="password"
                                    placeholder=""
                                    required
                                />
                                {isInvalid && (
                                    <FieldError
                                        errors={field.state.meta.errors}
                                    />
                                )}
                            </Field>
                        );
                    }}
                />
                <Field>
                    <Button type="submit">Login</Button>
                </Field>
                <FieldSeparator>Or continue with</FieldSeparator>
                <Field>
                    <Button variant="outline" type="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                            />
                        </svg>
                        Login with Google
                    </Button>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account?{" "}
                        <a href="#" className="underline underline-offset-4">
                            Sign up
                        </a>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
