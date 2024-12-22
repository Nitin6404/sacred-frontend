"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteModalProps {
  deleteImg: (id: number) => void;
  id: number;
  delModalOpen: boolean;
  setDelModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal = (props: DeleteModalProps) => {
  return (
    <Dialog open={props.delModalOpen} onOpenChange={props.setDelModalOpen} modal>
      <DialogTrigger
        className="absolute right-2 top-2 h-fit rounded-full bg-white p-3
    opacity-50 shadow-md transition group-hover:opacity-100"
        type="button"
      >
        <Trash className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => props.setDelModalOpen(false)}>
            No, keep it
          </Button>
          <Button onClick={() => props.deleteImg(props.id)} type="submit">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
