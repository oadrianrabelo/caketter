export default function Footer() {
  return (
    <>
      <footer className="p-4 bg-[#fff3f4] md:px-6 md:py-8 ">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0"
          ></a>
          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0">
            <li>
              <a className="mr-4 hover:underline md:mr-6">
                Politica de Privacidade
              </a>
            </li>
            <li>
              <a className="hover:underline">Contatos</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-400 sm:mx-auto" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © 2022{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            CAKETTER
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </>
  );
}
