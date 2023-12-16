const intervalMethod = (a: Window | null) => {
  if (a.closed) {
    window.location.reload();
  }

  if (a?.location?.href?.includes("auth-callback")) {
    a?.close();
    window.location.reload();
  }
};

export const authAction = async () => {
  const a = window.open("/auth/signin", "name", "width=600,height=400");
  setInterval(() => {
    intervalMethod(a);
  }, 300);
};

export const logoutAction = async () => {
  const a = window.open("/auth/signout", "name", "width=600,height=400");
  setInterval(() => {
    intervalMethod(a);
  }, 300);
};
