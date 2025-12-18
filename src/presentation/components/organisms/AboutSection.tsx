"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heading } from "@/presentation/components/atoms/Heading";
import { Text } from "@/presentation/components/atoms/Text";
import { SocialIcon } from "@/presentation/components/atoms/SocialIcon";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";

type AboutSectionProps = {
  data: HomeViewModel["about"];
};

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="grid gap-12 py-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16"
    >
      {/* Contenido de texto a la izquierda */}
      <motion.div
        className="flex flex-col gap-8"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div>
          <Heading as={2} className="text-3xl font-bold lg:text-4xl">
            {data.title}
          </Heading>
          <Text className="mt-6 text-lg leading-relaxed text-foreground/80 lg:text-xl">
            {data.summary}
          </Text>
        </div>

        {/* Highlights sin bordes, diseño limpio */}
        <dl className="flex flex-col gap-6">
          {data.highlights.map((highlight, index) => (
            <motion.div
              key={highlight.id}
              className="flex flex-col gap-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <dt className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                {highlight.label}
              </dt>
              <dd className="text-base font-medium text-foreground lg:text-lg">
                {highlight.value}
              </dd>
            </motion.div>
          ))}
        </dl>
      </motion.div>

      {/* Imagen con decoraciones a la derecha - siempre visible */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Líneas decorativas punteadas - arcos orgánicos alrededor */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="h-full w-full max-h-[500px] max-w-[500px]"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Arcos decorativos exteriores - más orgánicos */}
            <path
              d="M 250 30 A 220 220 0 0 1 470 250"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="10 6"
              className="text-primary/35"
              fill="none"
            />
            <path
              d="M 470 250 A 220 220 0 0 1 250 470"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="10 6"
              className="text-primary/35"
              fill="none"
            />
            <path
              d="M 250 470 A 220 220 0 0 1 30 250"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="10 6"
              className="text-primary/35"
              fill="none"
            />
            <path
              d="M 30 250 A 220 220 0 0 1 250 30"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="10 6"
              className="text-primary/35"
              fill="none"
            />
            {/* Arcos intermedios */}
            <path
              d="M 250 60 A 190 190 0 0 1 440 250"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 5"
              className="text-primary/25"
              fill="none"
            />
            <path
              d="M 440 250 A 190 190 0 0 1 250 440"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 5"
              className="text-primary/25"
              fill="none"
            />
            <path
              d="M 250 440 A 190 190 0 0 1 60 250"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 5"
              className="text-primary/25"
              fill="none"
            />
            <path
              d="M 60 250 A 190 190 0 0 1 250 60"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 5"
              className="text-primary/25"
              fill="none"
            />
            {/* Arcos internos más sutiles */}
            <path
              d="M 250 100 A 150 150 0 0 1 400 250"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              className="text-primary/20"
              fill="none"
            />
            <path
              d="M 400 250 A 150 150 0 0 1 250 400"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              className="text-primary/20"
              fill="none"
            />
            <path
              d="M 250 400 A 150 150 0 0 1 100 250"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              className="text-primary/20"
              fill="none"
            />
            <path
              d="M 100 250 A 150 150 0 0 1 250 100"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              className="text-primary/20"
              fill="none"
            />
          </svg>
        </div>

        {/* Imagen del perfil con fondo circular verde o placeholder */}
        <motion.div
          className="relative z-10"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative h-72 w-72 overflow-hidden rounded-full bg-primary p-3 shadow-2xl lg:h-80 lg:w-80">
            {data.profileImageUrl ? (
              <div className="relative h-full w-full overflow-hidden rounded-full bg-background">
                <Image
                  src={data.profileImageUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 288px, 320px"
                />
              </div>
            ) : (
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-foreground/5">
                {/* Icono placeholder tipo sombra */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-24 w-24 text-foreground/20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
            )}
          </div>
        </motion.div>

        {/* Iconos sociales a la derecha */}
        {data.socialLinks.length > 0 && (
          <motion.div
            className="absolute right-0 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {data.socialLinks.map((social, index) => (
              <motion.div
                key={social.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <SocialIcon type={social.id} url={social.url} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
}


