"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "@/hooks/use-translations";

const countries = [
  "United Kingdom",
  "United States",
  "Canada",
  "United Arab Emirates",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia & Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Côte d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Barthélemy",
  "Saint Helena",
  "Saint Kitts & Nevis",
  "Saint Lucia",
  "Saint Martin",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

// Company sizes will be created inside the component to use translations

export function ContactForm() {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    companyName: "",
    companySize: "",
    message: "",
  });

  const companySizes = [
    { value: "1-99", label: t("contact.form.companySizes.1-99") },
    { value: "100-299", label: t("contact.form.companySizes.100-299") },
    { value: "300-1999", label: t("contact.form.companySizes.300-1999") },
    { value: "2000+", label: t("contact.form.companySizes.2000+") },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="center-narrow mb-16 mt-14 flex flex-col gap-16">
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <div className="flex basis-1/2 flex-col gap-2">
          <h1 className="max-w-[440px] text-4xl font-bold md:text-6xl">
            {t("contact.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("contact.description")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="z-10 flex w-full basis-1/2 flex-col gap-4"
        >
          <div className="flex w-full gap-4">
            <div className="w-full space-y-2">
              <Label htmlFor="firstName">{t("contact.form.firstName")} *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="lastName">{t("contact.form.lastName")} *</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="w-full space-y-2">
            <Label htmlFor="email">{t("contact.form.email")} *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div className="w-full space-y-2">
            <Label htmlFor="country">{t("contact.form.country")} *</Label>
            <Select
              value={formData.country}
              onValueChange={(value) => handleInputChange("country", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("contact.form.placeholders.country")} />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] ">
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="w-flex-1 space-y-2">
              <Label htmlFor="companyName">{t("contact.form.companyName")} *</Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder={t("contact.form.placeholders.companyName")}
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                required
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="companySize">{t("contact.form.companySize")} *</Label>
              <Select
                value={formData.companySize}
                onValueChange={(value) =>
                  handleInputChange("companySize", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("contact.form.placeholders.companySize")}/>
                </SelectTrigger>
                <SelectContent>
                  {companySizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-full space-y-2">
            <Label htmlFor="message">{t("contact.form.message")} *</Label>
            <Textarea
              id="message"
              name="message"
              placeholder={t("contact.form.placeholders.message")}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {t("contact.form.send")}
          </Button>
        </form>
      </div>
    </div>
  );
}
