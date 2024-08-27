import { useAuth } from "../context/AuthContext";
import Card from "../utils/Card";
import CaketterLogo from "../assets/1x/SVG/logo-without-text.svg";

export default function Home() {
  const { signed } = useAuth();
  return (
    <>
      <div className="bg-[#EFEFEF] border-solid border-2 border-gray-500 rounded-lg">
        <div className="container mx-auto p-8">
          <section className="mb-16 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Bem vindo ao <span className="text-[#593F91] ">Caketter</span>!
            </h1>
            <img
              src={CaketterLogo}
              alt="Descrição da imagem"
              className="mx-auto mt-8"
              style={{ width: "24%", height: "auto" }} 
            />
            <p className="text-lg font-medium pt-10">
              Transforme sua confeitaria com nossa plataforma fácil de usar.
            </p>
            {!signed && (
              <p className="mt-4">
                <a
                  href="/signup"
                  className="text-2xl font-bold text-blue-600 hover:underline"
                >
                  Crie uma conta agora!
                </a>
              </p>
            )}
          </section>

          <ul className="grid grid-cols-2 md:grid-cols-2 gap-8 justify-center">
            <Card
              title="Organize seus pedidos"
              text="Mantenha seus pedidos organizados de forma eficiente. Acompanhe o status, detalhes e histórico de cada pedido, facilitando a gestão do seu negócio."
              image="https://images.pexels.com/photos/3801451/pexels-photo-3801451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <Card
              title="Armazene dados dos seus clientes"
              text="Guarde informações essenciais sobre seus clientes, como contatos e endereços. Mantenha um registro completo para proporcionar um atendimento personalizado."
              image="https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <Card
              title="Salve seus bolos preferidos"
              text="Crie uma lista dos seus bolos favoritos. Combinações preferidas para facilitar a criação e personalização de novos pedidos."
              image="https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <Card
              title="Não se preocupe com seus dados, eles serão salvos para você"
              text="Todas as informações são armazenadas de forma segura e protegidas. Foque no seu negócio, nós cuidamos da segurança."
              image="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </ul>
          <section className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Precisa de Ajuda ou Tem Perguntas?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Nossa equipe de suporte está pronta para ajudar!
            </p>
            <a
              href="/home"
              className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-800 text-white font-medium py-2 px-4 rounded-full transition duration-300"
            >
              Contate o Suporte
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
