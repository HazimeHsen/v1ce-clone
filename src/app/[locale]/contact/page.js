"use client";
import { ContactForm } from "@/components/contact/contact-form";
import { FeaturesSlider } from "@/components/features-slider";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="py-20">
        <ContactForm />
        <FeaturesSlider/>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
