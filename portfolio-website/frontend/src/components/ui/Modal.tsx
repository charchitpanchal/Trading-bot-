"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ open, onClose, title, children, className }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby="modal-title"
            className={cn(
              "relative z-10 w-full max-w-lg glass-card p-6 md:p-8",
              className
            )}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 id="modal-title" className="text-xl font-bold text-foreground">
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 hover:bg-white/10"
                aria-label="Close"
              >
                <IoClose className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
