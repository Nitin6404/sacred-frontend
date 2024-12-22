import { Fragment } from "react";
import { InputProps, Input } from "@/components/ui/input";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FC } from "react";
import { SwitchProps } from "@radix-ui/react-switch";
import { FormLabel, FormLabelProps } from "@/components/ui/label";
import { FormImageUploader, FormImageUploaderProps } from "@/components/ui/imageUploader";
import { SimpleSingleSelect, SimpleSingleSelectProps } from "@/components/ui/simpleSingleSelect";

export type SupportedWidgets =
  | { name: "input"; props: InputProps }
  | { name: "textAreaInput"; props: TextareaProps }
  | { name: "toggleInput"; props: SwitchProps }
  | { name: "label"; props: FormLabelProps }
  | { name: "imageInput"; props: FormImageUploaderProps }
  | { name: "singleSelect"; props: SimpleSingleSelectProps };

export type SupportedWidgetNames = SupportedWidgets["name"];

export type FormElementInstance = SupportedWidgets & {
  id: string | number;
};

export const widgetMap: Record<SupportedWidgetNames, FC<any>> = {
  input: Input,
  textAreaInput: Textarea,
  toggleInput: Switch,
  label: FormLabel,
  imageInput: FormImageUploader,
  singleSelect: SimpleSingleSelect
};

export type FormRendererProps = {
  meta: FormElementInstance[];
  defaults?: Record<string, any>;
};

export function FormRenderer(props: FormRendererProps) {
  return (
    <Fragment>
      {props.meta.map((item) => {
        const Widget = widgetMap[item.name];
        if (!Widget) return null;
        return (
          <Widget
            key={item.id}
            {...{
              ...item.props,
              ...(props.defaults && (item.props as any)?.name && props.defaults[(item.props as any).name]
                ? { defaultValue: props.defaults[(item.props as any).name] }
                : {})
            }}
          />
        );
      })}
    </Fragment>
  );
}
