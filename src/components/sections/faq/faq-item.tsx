"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useId } from "react";
import { easing } from "@/animations/transitions";
import { cn } from "@/utils/cn";

export interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * Premium FAQ accordion — fluid height animation, refined icon.
 */
export function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  const panelId = useId();

  return (
    <div className="border-border/60 border-b">
      <h3>
        <button
          type="button"
          id={`${panelId}-trigger`}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group text-body-lg ease-luxury flex w-full items-center justify-between gap-8 py-8 text-start text-neutral-950 transition-colors duration-500 hover:text-gold-700"
        >
          <span className="font-medium leading-snug pe-4">{question}</span>
          <span
            aria-hidden="true"
            className={cn(
              "border-gold-600/25 text-gold-700 ease-luxury relative flex size-10 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color,box-shadow] duration-500",
              isOpen && "bg-gold-600/8 border-gold-600/45 shadow-sm",
            )}
          >
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.5, ease: easing.luxury }}
              className="text-xl leading-none"
            >
              +
            </motion.span>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={`${panelId}-trigger`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: easing.luxury }}
            className="overflow-hidden"
          >
            <p className="text-body-md text-foreground-muted max-w-[56ch] pb-8 leading-[1.75]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
