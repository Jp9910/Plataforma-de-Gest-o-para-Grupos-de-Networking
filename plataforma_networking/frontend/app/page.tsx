import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <main className="flex flex-col items-center justify-between py-32 px-16">
                <h1>Bem vindo(a)!</h1>
                <p>Caso ainda não seja membro,&nbsp; 
                    <Link href="/intencoes/cadastro" className='text-blue-500'>
                        
                        cadastre sua intenção de participar!
                    </Link>
                </p>
            </main>
        </div>
    );
}
