import React from "react";
import { motion } from "framer-motion";
import { Loading } from "./loading";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  children: React.ReactNode;
  isPending: boolean;
  errorMsg: string;
  navigationProps: {
    displayNavigationBtns: boolean;
    prevPage: () => void;
    isPrevPageAvailable: boolean;
    nextPage: () => void;
    isNextPageAvailable: boolean;
    currLength: number;
    totalLength: number;
  };
}

const GenericNodesRenderer = (props: Props) => {
  const container = {
    hidden: {},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  return (
    <section className="container my-6 w-full p-0">
      {props.isPending ? (
        <Loading className="h-80 w-full" />
      ) : props.errorMsg ? (
        <div className="flex-center text-muted-foreground">{props.errorMsg}</div>
      ) : (
        <motion.section
          animate="show"
          initial="hidden"
          variants={container}
          className="grid grid-cols-1 gap-2 pb-8 md:grid-cols-2 md:gap-4 xl:grid-cols-3 3xl:grid-cols-4"
        >
          {props.children}
        </motion.section>
      )}

      {props.navigationProps.displayNavigationBtns && (
        <div className="my-4 flex w-full items-center justify-between sm:justify-around">
          <Button
            onClick={props.navigationProps.prevPage}
            disabled={!props.navigationProps.isPrevPageAvailable}
            className="flex-center shadow-lg"
          >
            <ArrowLeft className="h-6 w-6 text-white" />
          </Button>

          {props.navigationProps.currLength === 0 ? (
            <div className="font-semibold text-muted-foreground ">Nothing matched with your search query</div>
          ) : (
            <div className="font-semibold text-muted-foreground drop-shadow-md ">{`${
              props.navigationProps.totalLength && !isNaN(props.navigationProps.totalLength)
                ? props.navigationProps.totalLength
                : props.navigationProps.currLength
            } results found`}</div>
          )}

          <Button
            onClick={props.navigationProps.nextPage}
            disabled={!props.navigationProps.isNextPageAvailable}
            className="flex-center shadow-lg"
          >
            <ArrowRight className="h-6 w-6 text-white" />
          </Button>
        </div>
      )}
    </section>
  );
};

export default GenericNodesRenderer;
