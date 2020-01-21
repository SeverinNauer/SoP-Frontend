import { IPasswordEntry } from "./IPasswordEntry";

export interface ICategory {
  id: number;
  title: string;
  description: string;
  passwords: IPasswordEntry[];
}
