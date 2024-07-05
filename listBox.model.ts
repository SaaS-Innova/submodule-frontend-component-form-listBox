import { IAttribute_Object, IOptions } from "../formInterface/forms.model";



export interface IListBoxOptions {
  label: string;
  value?: string | number;
  items?: IOptions[];
  id?: string | number;
  error?: string;
  isSuccess?: boolean;
}

export interface IListBoxProps {
    attribute: string;
    itemTemplate?: any;
    disabled?: boolean;
    form: {
      [attribute: string]: IAttribute_Object;
    };
    fieldType?: string;
}