export type NewMessage = {
  projectId: string;
  userId: string;
  message: {
    type: "text";
    text: string;
  };
};
