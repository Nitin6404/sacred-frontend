"use client";

import DndUploader from "@/app/_components/dnd-uploader";
import { useUserStore } from "@/app/context/user-context";
import UplodedImages from "../profile/album-wrapper/uploaded-images";

export function PortfolioList() {
  const { vendor } = useUserStore();

  if (!vendor) {
    return (
      <div className="my-56 flex cursor-pointer flex-col items-center justify-center hover:text-rose-600">
        <h1 className="text-2xl font-bold">No portfolio list found</h1>
      </div>
    );
  }

  return (
    <div className="w-full">
      <DndUploader />
      <h3 className="mb-2 mt-4 text-lg font-semibold">Uploaded</h3>
      <section className="">
        <UplodedImages />
      </section>
    </div>
  );
}
