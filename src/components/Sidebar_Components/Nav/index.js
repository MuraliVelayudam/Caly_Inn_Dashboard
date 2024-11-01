import { navLinks } from "@/constants";
import Link from "next/link";

export default function Nav({ locationId, pathname }) {
  return (
    <div className="space-y-8 mt-12">
      {navLinks.map((eachLink) => {
        return (
          <Link
            key={eachLink?.id}
            href={`/location/${locationId}/${eachLink.link}`}
            className={`${
              eachLink.link === pathname.split("/")[3]
                ? "bg-mainBg text-black px-6 py-3 rounded-l-full linkItems"
                : "text-mainBg"
            } flex items-center justify-start gap-2 transition-all duration-300 ease-linear ml-8 text-sm `}
          >
            <span>{eachLink?.icon}</span>
            <span>{eachLink?.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
