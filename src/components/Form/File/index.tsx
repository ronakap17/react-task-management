import React, { useCallback, useState } from "react";
import useField from "../hooks/useField";
import classes from "./style.module.scss";
import Field, { FieldProps } from "../Field";
import { toast } from "react-toastify";
import useTranslation from "~/hooks/useTranslation";
import Preview from "./Preview";

export interface FilePayload {
  file: File;
  previewUrl: string;
}

export interface FilePropsDefault
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  ref?: React.Ref<HTMLInputElement>;
  inputClassName?: string;
  maxFiles?: number;
  preview?: boolean;
}

export type FileProps = FilePropsDefault & FieldProps;

export type FileComponent = React.ForwardRefRenderFunction<
  HTMLInputElement,
  FileProps
>;

// @ts-ignore
const File: FileComponent = (props, ref) => {
  const { t } = useTranslation("form.file");
  const {
    fieldProps,
    inputProps: {
      inputClassName,
      onChange,
      placeholder,
      maxFiles = 1,
      preview,
      ...othersInputProps
    },
  } = useField(props);
  const [files, setFiles] = useState<FilePayload[]>([]);

  let inputFileElement: HTMLInputElement | null = null;

  const triggerFileInputClick = useCallback(
    (e, inputFileElement) => {
      e.preventDefault();
      if (othersInputProps.disabled || maxFiles === files.length) {
        return false;
      }
      if (inputFileElement) {
        inputFileElement.click();
      }
      return false;
    },
    [fieldProps, othersInputProps, maxFiles, files]
  );

  const updateFiles = useCallback(
    (files) => {
      setFiles([...files]);
      if (onChange) {
        onChange({
          target: {
            name: props.name || '',
            // @ts-ignore
            value: [...files.map((value) => value.file)],
          },
        });
      }
    },
    [onChange, props.name, setFiles]
  );

  const triggerChange = useCallback(
    (e): void => {
      if (maxFiles && files.length + e.target.files.length > maxFiles) {
        toast.error(t("exceedMaxFiles", { max: maxFiles }));
        return;
      }

      let newFiles: FilePayload[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        newFiles = [
          ...newFiles,
          {
            previewUrl: URL.createObjectURL(e.target.files[i]),
            file: e.target.files[i],
          },
        ];
      }

      updateFiles([...files, ...newFiles]);
    },
    [files, maxFiles, t, updateFiles]
  );

  const removeFile = useCallback(
    (index) => {
      files.splice(index, 1);
      updateFiles([...files]);
    },
    [updateFiles, files]
  );

  return (
    <Field {...fieldProps}>
      <input
        {...othersInputProps}
        ref={ref => inputFileElement = ref}
        type="file"
        onChange={triggerChange}
        className={`${classes["input"]} ${inputClassName} ${classes["file-input"]}`}
        disabled={othersInputProps.disabled}
        multiple={maxFiles > 1 ? true : false}
      />
      {files.length > 0 &&
        preview && <Preview files={files} removeFile={removeFile} />}
      <div
        className={classes["select-file"]}
        onClick={(e) => triggerFileInputClick(e, inputFileElement)}
      >
        <i className={`bx bx-camera ${classes["icon"]}`}></i>
        <span className={classes["placeholder"]}>{placeholder}</span>
        {maxFiles > 1 && (
          <span className={classes["max-files"]}>
            {t("maxFiles", { max: maxFiles })}
          </span>
        )}
      </div>
    </Field>
  );
};

export default React.forwardRef(File);
