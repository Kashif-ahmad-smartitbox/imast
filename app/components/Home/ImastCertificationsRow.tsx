"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const DEFAULT_BADGES = [
  { id: "gdpr", title: "GDPR", href: "/compliance#gdpr", src: "/badges/gdpr.png" },
  { id: "soc2", title: "SOC 2", href: "/compliance#soc2", src: "/badges/soc2.png" },
  { id: "iso27001", title: "ISO 27001", href: "/compliance#iso27001", src: "/badges/iso-27001.png" },
  { id: "pcidss", title: "PCI DSS", href: "/compliance#pcidss", src: "/badges/pcidss.png" },
  { id: "iso27018", title: "ISO 27018", href: "/compliance#iso27018", src: "/badges/iso-27018.png" },
  { id: "iso14001", title: "ISO 14001", href: "/compliance#iso14001", src: "/badges/iso-14001.png" },
];

export default function ImastCertificationsRow({ badges = DEFAULT_BADGES }) {
  return (
    <section className="relative w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-red-600">Certified & Compliant</h3>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
            Enterprise-Grade Security Standards
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-xl">
            Adhering to global compliance frameworks to ensure your data remains protected 
            with the highest security certifications
          </p>
        </div>

        {/* Enhanced badge container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          
          {/* Grid layout for responsiveness */}
          <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
            {badges.map((badge, index) => (
              <motion.a
                key={badge.id}
                href={badge.href ?? "#"}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -4
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative flex flex-col items-center justify-center p-4 sm:p-6 bg-white rounded-2xl shadow-xs border border-gray-200/80 hover:shadow-lg transition-all duration-300 hover:border-blue-300/50 z-10"
                title={badge.title}
                aria-label={badge.title}
              >
                {/* Enhanced background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#a94093] to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-px">
                  <div className="w-full h-full bg-white rounded-2xl" />
                </div>

                {/* Badge image with better sizing */}
                <div className="relative z-10 w-full flex justify-center">
                  <Image
                    src={badge.src}
                    alt={badge.title}
                    width={80}
                    height={32}
                    className="object-contain transition-all duration-300 group-hover:scale-105 h-20 w-auto"
                  />
                </div>

                {/* Badge title for mobile */}
                <div className="relative z-10 mt-3">
                  <span className="text-xs sm:text-sm font-medium text-gray-700 text-center group-hover:text-gray-900 transition-colors duration-300 block lg:hidden">
                    {badge.title.split(' ')[0]}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 text-center group-hover:text-gray-900 transition-colors duration-300 hidden lg:block">
                    {badge.title}
                  </span>
                </div>

                {/* Enhanced tooltip for desktop */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 shadow-lg hidden lg:block">
                  {badge.title}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Connection lines for desktop */}
          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent hidden lg:block" />
        </motion.div>
      </div>
    </section>
  );
}