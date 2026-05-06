"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
  y?: number;
  amount?: "some" | "all" | number;
}

export default function FadeUp({
  children,
  delay = 0,
  className = "",
  duration = 0.6,
  y = 40,
  amount = "some",
}: Readonly<FadeUpProps>) {
  return (
    <div
      className={className}
    >
      {children}
    </div>
  );
}
