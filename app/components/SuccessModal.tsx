"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Button from "./Button";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
}

export default function SuccessModal({ open, onClose, name }: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent
        showCloseButton
        className="max-w-md rounded-3xl p-10 text-center border-0 shadow-2xl"
      >
        <DialogHeader className="items-center gap-4">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <DialogTitle className="font-display text-2xl font-bold text-center">
            Thanks{name ? `, ${name}` : ""}!
          </DialogTitle>
          <DialogDescription className="text-center space-y-1">
            <span className="block text-gray-500">Your message has been sent successfully.</span>
            <span className="block text-gray-400 text-sm">We&apos;ll get back to you within 24 hours.</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Button variant="primary" fullWidth onClick={onClose}>
            Done
          </Button>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 text-gray-500 font-body text-sm font-medium hover:text-foreground transition-colors cursor-pointer"
          >
            Send another message
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
