"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerSchema, RegisterFormData } from "../schemas/register.schema";
import { useRegisterMutation } from "../hooks/register-mutation.hook";

export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
    const { mutate, isPending, isError, error } = useRegisterMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormData) => {
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
                    <h1 className="text-2xl font-bold">Crie sua conta</h1>
                    <p className="text-muted-foreground text-sm text-balance">Preencha os dados abaixo para criar sua conta</p>
                </div>

                <Field>
                    <FieldLabel htmlFor="username">Nome de Usuário</FieldLabel>
                    <Input id="username" type="text" placeholder="Seu nome de usuário" {...register("username")} />
                    {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                </Field>

                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" placeholder="seu@email.com" {...register("email")} />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </Field>

                <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <Input id="password" type="password" {...register("password")} />
                    <FieldDescription>Deve ter no mínimo 8 caracteres.</FieldDescription>
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </Field>

                {isError && <p className="text-sm text-red-500 text-center">{error?.message}</p>}

                <Field>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "Criando conta..." : "Criar Conta"}
                    </Button>
                </Field>

                <FieldDescription className="text-center">
                    Já tem uma conta?{" "}
                    <a href="/login" className="underline underline-offset-4">
                        Faça login
                    </a>
                </FieldDescription>
            </FieldGroup>
        </form>
    );
}
