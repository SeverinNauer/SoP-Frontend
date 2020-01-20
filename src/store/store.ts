export const store = {
  state: {
    token: ""
  },
  setToken(token: string) {
    localStorage.setItem("jwt", token);
    this.state.token = token;
  }
};
