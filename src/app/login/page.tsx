import LoginForm from "@/app/login/components/login-form";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "@/components/theme-switcher";

export default function LoginPage() {
    return (
        <div className=" p-5 h-screen ">
            <ThemeSwitcher/>
            <div className="card">
                <div className="card-body space-y-6 flex justify-center items-center">
                    <div className="relative mb-8">
                        <Image
                            src="/images/logo.svg"
                            alt="Logo Light"
                            width={400}
                            height={300}
                            className="block dark:hidden"
                        />
                        <Image
                            src="/images/logo-branca.png"
                            alt="Logo Dark"
                            width={400}
                            height={300}
                            className="hidden dark:block"
                        />
                    </div>

                    <div className="max-w-lg bg-base-100 rounded-2xl p-5 space-y-3 shadow-lg">
                        <div className="text-center space-y-3">
                            <h1 className="text-4xl font-bold">Entrar</h1>
                            <h2 className="text-gray-500">
                                Entre com suas credenciais para acessar suas informações e continuar sua jornada!
                            </h2>
                        </div>
                        <LoginForm/>
                        <div className="text-center">
                            <p>
                                <span>Não possui cadastro?</span>
                                <Link href="/register" className="text-primary font-semibold"> Cadastre-se aqui</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
