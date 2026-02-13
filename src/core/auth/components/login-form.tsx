import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Entre na sua conta</h1>
                    <p className="text-muted-foreground text-sm text-balance">Digite seu email e senha para continuar</p>
                </div>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" placeholder="seu@email.com" required />
                </Field>
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                            Esqueceu a senha?
                        </a>
                    </div>
                    <Input id="password" type="password" required />
                </Field>
                <Field>
                    <Button type="submit" className="w-full">
                        Entrar
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
