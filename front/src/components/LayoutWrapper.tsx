import { ReactNode } from "react";
import SectionContainer from "./SectionContainer";
import Link from "./Link";
import Footer from './Footer';
import ThemeSwitch from './ThemeSwittch';

interface Props {
  children: ReactNode;
}

const headerNavLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Costumers",
    href: "/costumers",
  },
  {
    title: "Cakes",
    href: "/cakes",
  },
  {
    title: "Orders",
    href: "/orders",
  },
];

const LayoutWrapper = ({ children }: Props) => {
  return (
    <>
      <SectionContainer>
        <div className="flex h-screen w-auto flex-col justify-between ">
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
                    className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              <ThemeSwitch />
            </div>
          </header>
          <main className="mb-auto">
            {children}
          </main>
          <Footer />
        </div>
      </SectionContainer>
    </>
  );
};

export default LayoutWrapper;