import { ICategory } from "@/Models/ICategory";
import { IPasswordEntry } from "@/Models/IPasswordEntry";
import { fetchOneCategory } from "@/services/categoryService";

interface IState {
  token: string;
  categories: ICategory[];
  selectedCategory: ICategory | null;
  selectedPassword: IPasswordEntry | null;
  readonly passwordIsNew: boolean;
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
    },
    get passwordIsNew() {
      if (this.selectedPassword) {
        return !this.selectedPassword.id;
      }
      return true;
    }
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
  setSelectedPassword(password: IPasswordEntry | null) {
    this.state.selectedPassword = password;
  },
  async updateCategory(id: number, setPw: boolean = true) {
    const resp = await fetchOneCategory(id);
    if (resp) {
      if (resp.type === "success") {
        const cat = resp.response as ICategory;
        const oldIndex = this.state.categories.findIndex(
          listCat => listCat.id === cat.id
        );
        if (oldIndex > -1) {
          this.state.categories[oldIndex] = cat;
          this.state.selectedCategory = cat;
          if (cat.passwords.length > -1 && setPw) {
            this.state.selectedPassword =
              cat.passwords[cat.passwords.length - 1];
          } else {
            this.state.selectedPassword = null;
          }
        }
      }
      return resp;
    }
  }
};
