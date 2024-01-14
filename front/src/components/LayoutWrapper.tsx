import { ReactNode } from "react";
import SectionContainer from "./SectionContainer";
import Link from "./Link";
import Footer from "./Footer";
import ThemeSwitch from "./ThemeSwittch";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: ReactNode;
}

const headerNavLinks = [
  {
    title: "Home",
    href: "/home",
  },
  {
    title: "Clientes",
    href: "/costumers",
  },
  {
    title: "Bolos",
    href: "/cakes",
  },
  {
    title: "Pedidos",
    href: "/orders",
  },
];

const LayoutWrapper = ({ children }: Props) => {
  const { logout, signed } = useAuth();

  function handleLogout() {
    logout();
  }
  return (
    <>
      <SectionContainer>
        <div className="flex h-screen w-auto flex-col justify-between ">
          {signed && (
            <header className="flex items-center justify-between py-2">
              <div>
                <Link href="/" aria-label="">
                  <div className="flex items-center justify-between">
                    <div className="mr-3"></div>
                  </div>
                </Link>
              </div>
              <div className="flex item-center text-base leading-5">
                <div className="hidden sm:block">
                  {headerNavLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="p-1 font-medium text-gray-900 sm:p-4"
                    >
                      {link.title}
                    </Link>
                  ))}
                  <Link
                    onClick={handleLogout}
                    href="#"
                    className="p-1 font-medium text-red-700 sm:p-4"
                  >
                    Sair
                  </Link>
                </div>
                {/* <ThemeSwitch /> */}
              </div>
            </header>
          )}
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
      </SectionContainer>
    </>
  );
};

export default LayoutWrapper;
