export type PromptByGroupAndType = {
  prompt: string;
  group: "its-open-mic" | "articles-redFlags-employee-cv" | "hide-hire";
  type: "header" | "article" | "faq";
};
