import Link from "next/link";
import { Logo } from "./navbar/logo";

const footerLinks = [
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Pricing",
    href: "#pricing",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
];

const Footer = () => {
  return (
    <footer className="dark:border-t mt-40 dark bg-background text-foreground">
      <div className="max-w-screen-xl mx-auto">
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          {/* Left: Logo  */}
          <div className="flex items-center gap-4 sm:order-1 order-2">
            <Logo />
          </div>

          {/* Middle: Footer Links */}
          <ul className="flex items-center gap-4 flex-wrap sm:order-2 order-2 w-full sm:w-auto justify-center sm:justify-start">
            {footerLinks.map(({ title, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          {/* Right: Copyright */}

          <div className="flex items-center gap-4 sm:order-3 order-3">
            <span className="text-muted-foreground text-sm text-center sm:text-start">
              &copy; {new Date().getFullYear()}{" "}
              <Link
                href="https://www.mindworkstr.com/en"
                className="hover:underline"
                target="_blank"
              >
                Mindworks
              </Link>
              . All rights reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
