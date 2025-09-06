"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en", name: "English", flag: "/assets/locales/en.svg" },
  { code: "hy", name: "Հայերեն", flag: "/assets/locales/hy.svg" },
];

export default function LanguageSwitcher({ currentLocale = "en" }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (locale) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
    const newPath = `/${locale}${pathWithoutLocale}`;
    
    console.log('Current pathname:', pathname);
    console.log('Path without locale:', pathWithoutLocale);
    console.log('New path:', newPath);
    
    router.push(newPath);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 rounded-full p-0 hover:bg-accent hover:text-accent-foreground flex items-center justify-center"
        >
          <Image
            src={currentLanguage.flag}
            alt={`${currentLanguage.name} flag`}
            width={24}
            height={24}
            className="w-6 h-6 rounded-full object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex items-center w-fit min-w-fit gap-1">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center gap-3 cursor-pointer outline-none ${
              currentLocale === language.code ? "bg-accent" : ""
            }`}
          >
            <Image
              src={language.flag}
              alt={`${language.name} flag`}
              width={20}
              height={20}
              className="w-5 h-5 rounded-full object-cover"
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
