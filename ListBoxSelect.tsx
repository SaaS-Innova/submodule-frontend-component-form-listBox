import { Controller, useFormContext } from "react-hook-form";
import { inputValidator } from "../../../../library/utilities/helperFunction";
import { ListBox } from "primereact/listbox";
import { IListBoxOptions, IListBoxProps } from "./listBox.model";
import { IFormFieldType } from "../../../../library/utilities/constant";
import { FormFieldError } from "../formFieldError/FormFieldError";
import { Checkbox } from "primereact/checkbox";

export const ListBoxSelect = (props: IListBoxProps) => {
  const { attribute, form, fieldType, itemTemplate } = props;
  const { label, options } = form[attribute];
  const { required, disabled,multiple=true } = form[attribute].rules;
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext();

  const getClassNames = () => {
    let labelClassName = "";
    let fieldClassName = "";
    let divClassName = "";

    switch (fieldType) {
      case IFormFieldType.NO_LABEL:
        labelClassName = "";
        fieldClassName = "field p-fluid";
        divClassName = "";
        break;
      case IFormFieldType.TOP_LABEL:
        labelClassName = "col-12 mb-3 md:col-3 md:mb-0";
        fieldClassName = "field p-fluid";
        divClassName = "col-12 relative";
        break;
      default:
        labelClassName = "col-12 mb-3 md:col-3 md:mb-0";
        fieldClassName = "field grid";
        divClassName = "col-12 md:col-9 relative";
        break;
    }

    return { labelClassName, fieldClassName, divClassName };
  };
  const { labelClassName, fieldClassName, divClassName } = getClassNames();

  const labelElement = (
    <label htmlFor={attribute} className={labelClassName}>
      {label} {required && "*"}
    </label>
  );

  const checkBoxTemplate = (option: IListBoxOptions) => {
    const getValuesData = getValues(attribute);
    return (
      <div>
        <Checkbox
          name={`${attribute}.${option.id}`}
          checked={getValuesData?.includes(option.value)}
        />
        <label className="ml-2">{option.label}</label>
        {option.isSuccess && (
          <span>
            <i className="pi pi-check text-green-500"></i>
          </span>
        )}
        {option.isSuccess === false && (
          <span className="text-red-600">
            {option?.error === "" && <i className="pi pi-times" />}
            {option?.error}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={fieldClassName}>
      {fieldType !== IFormFieldType.NO_LABEL && labelElement}
      <div className={divClassName}>
        <Controller
          name={attribute}
          control={control}
          rules={{ ...inputValidator(form[attribute].rules, label) }}
          render={({ field }) => {
            return (
              <ListBox
                id={field.name}
                filter
                multiple={multiple}
                listStyle={{ maxHeight: "200px" }}
                value={field.value}
                itemTemplate={itemTemplate || checkBoxTemplate}
                options={options}
                onChange={(e) => field.onChange(e)}
                className={errors[attribute] ? "p-invalid" : ""}
                disabled={disabled}
              />
            );
          }}
        />
        <FormFieldError data={{ errors, name: attribute }} />
      </div>
    </div>
  );
};
