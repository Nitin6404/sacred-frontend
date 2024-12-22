"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title?: string;
  description?: string;
  cancelText?: string;
  okText?: string;
}

export const AlertModal: FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  description = "This action cannot be undone.",
  title = "Are you sure?",
  cancelText = "Cancel",
  okText = "Continue"
}) => {
  return (
    <Modal title={title} description={description} isOpen={isOpen} onClose={onClose}>
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          {cancelText}
        </Button>

        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          {okText}
        </Button>
      </div>
    </Modal>
  );
};
