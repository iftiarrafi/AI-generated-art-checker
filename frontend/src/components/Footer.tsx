import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-black/5">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between lg:px-10">
        <p>Quick AI image checks with a clean upload experience.</p>
        <div className="flex items-center gap-5">
          <Link href="#checker" className="transition hover:text-black">
            Checker
          </Link>
          <Link href="/" className="transition hover:text-black">
            Home
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
