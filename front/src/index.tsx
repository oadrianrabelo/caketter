import Card from "./utils/Card";

export default function Home() {
  return (
    <>
      <div className="bg-[#EFEFEF] dark:bg-gray-800 border-solid border-2 border-gray-500 rounded-lg">
        <div className="container mx-auto p-8">
          <section className="mb-16 text-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Bem vindo ao{" "}
              <span className="text-[#345E59] dark:text-purple-400">Caketter</span>!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Transforme sua confeitaria com nossa plataforma fácil de usar.
            </p>
            <p className="mt-4">
              <a href="/signup" className="text-2xl font-bold text-blue-600 dark:text-white hover:underline">
              Crie uma conta agora!
              </a>
            </p>
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Precisa de Ajuda ou Tem Perguntas?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Nossa equipe de suporte está pronta para ajudar!
            </p>
            <a
              href="/contact"
              className="bg-[#64B6AC] text-white hover:bg-[#345E59] focus:ring-4 focus:ring-[#C0FDFB] text-white font-medium py-2 px-4 rounded-full transition duration-300"
            >
              Contate o Suporte
            </a>
          </section>
        </div>
      </div>

    </>
  );
}
