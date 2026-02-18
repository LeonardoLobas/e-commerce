"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginFormData } from "../schemas/login.schema";
import { useLoginMutation } from "../hooks/login-mutation.hook";
import { useLoginForm } from "../hooks/login-form.hook";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
    const { mutate, isPending, isError, error } = useLoginMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useLoginForm();

    const onSubmit = (data: LoginFormData) => {
        mutate(data, {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit(onSubmit)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Entre na sua conta</h1>
                    <p className="text-muted-foreground text-sm text-balance">Digite seu usuário e senha para continuar</p>
                </div>

                <Field>
                    <FieldLabel htmlFor="username">Usuário</FieldLabel>
                    <Input id="username" type="text" {...register("username")} />
                    {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                </Field>

                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                            Esqueceu a senha?
                        </a>
                    </div>
                    <Input id="password" type="password" {...register("password")} />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </Field>

                {isError && <p className="text-sm text-red-500 text-center">{error?.message}</p>}

                <Field>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "Entrando..." : "Entrar"}
                    </Button>
                </Field>

                <FieldDescription className="text-center">
                    Não tem uma conta?{" "}
                    <a href="/register" className="underline underline-offset-4">
                        Cadastre-se
                    </a>
                </FieldDescription>
            </FieldGroup>
        </form>
    );
}
