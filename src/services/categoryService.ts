import { store } from "./../store/store";
import { get } from "./fetchservice";
import { ICategory } from "@/Models/ICategory";

export const fetchCategories = async () => {
  if (store.state.token) {
    const response = await get<ICategory[]>("Category/getAll", true);
    if (response.type === "success") {
      store.setCategories(response.response as ICategory[]);
    }
    return response;
  }
};

export const fetchOneCategory = async (id: number) => {
  if (store.state.token) {
    const response = await get<ICategory>(
      "Category/get?categoryId=" + id,
      true
    );
    return response;
  }
};
