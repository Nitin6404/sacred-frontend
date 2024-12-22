"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";

export type CellActionProps<T> = {
  data: T;
} & ({ editable: true; onEditClick: () => void } | { editable: false }) &
  ({ deleteable: true; handleDelete: () => void } | { deleteable: false });

function CellAction<T = Record<string, any> & { id: number }>(props: CellActionProps<T>) {
  const [open, setOpen] = useState(false);

  const onDeleteClick = () => {
    if (props.deleteable) setOpen(true);
  };

  const onConfirmDelete = () => {
    if (props.deleteable) props.handleDelete();
    setOpen(false);
  };

  return (
    <>
      {props.deleteable ? (
        <AlertModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={onConfirmDelete}
          loading={false}
          okText="Delete"
          title="Are you sure you want to delete this ?"
        />
      ) : null}

      <div className="flex items-center gap-4">
        {props.editable ? (
          <div className="flex cursor-pointer items-center hover:text-primary" onClick={props.onEditClick}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </div>
        ) : null}

        {props.deleteable ? (
          <div className="flex cursor-pointer items-center hover:text-primary" onClick={onDeleteClick}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </div>
        ) : null}
      </div>
    </>
  );
}

export default CellAction;
