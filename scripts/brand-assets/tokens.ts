export const colors = {
  dark: {
    accent: "#E8944A",
    bg: "#0A0A0C",
    body: "#C9C9CD",
    border: "#26272C",
    dim: "#5A5B60",
    muted: "#9B9BA3",
    surface: "#131316",
    text: "#F5F5F4",
  },
  light: {
    accent: "#B85C1E",
    bg: "#FBFBFA",
    body: "#3F4046",
    border: "#E4E4E0",
    dim: "#8A8B92",
    muted: "#5B5C63",
    surface: "#FFFFFF",
    text: "#17181B",
  },
} as const;

export type Theme = keyof typeof colors;
