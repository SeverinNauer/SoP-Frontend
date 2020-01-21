import { ICategory } from "@/Models/ICategory";
import { IPasswordEntry } from "@/Models/IPasswordEntry";

interface IState {
  token: string;
  categories: ICategory[];
  selectedCategory: ICategory | null;
  selectedPassword: IPasswordEntry | null;
  passwordIsNew: boolean;
}
let selectedCategory: ICategory | null = null;
let selectedPassword: IPasswordEntry | null = null;
export const store = {
  state: {
    token: "",
    categories: new Array<ICategory>(),
    get selectedCategory() {
      return selectedCategory;
    },
    set selectedCategory(cat: ICategory | null) {
      selectedCategory = cat;
      this.selectedPassword = null;
    },
    get selectedPassword() {
      return selectedPassword;
    },
    set selectedPassword(pw: IPasswordEntry | null) {
      selectedPassword = pw ? { ...pw } : null;
      this.passwordIsNew = false;
    },
    passwordIsNew: false
  } as IState,
  setToken(token: string) {
    localStorage.setItem("jwt", token);
    this.state.token = token;
    this.state.categories = new Array<ICategory>();
    this.state.selectedCategory = null;
    this.state.selectedPassword = null;
  },
  setCategories(categories: ICategory[]) {
    this.state.categories = categories;
    this.state.selectedCategory = null;
  },
  setSelectedCategory(category: ICategory) {
    this.state.selectedCategory = category;
    this.state.selectedPassword = null;
  },
  setSelectedPassword(password: IPasswordEntry | null, isNew: boolean) {
    this.state.selectedPassword = password;
    this.state.passwordIsNew = isNew;
  }
};
