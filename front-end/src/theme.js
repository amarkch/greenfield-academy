// Shared design tokens — see original component notes for rationale.
export const C = {
  ink: "#232152",
  marigold: "#F5A623",
  mint: "#3FA796",
  coral: "#E85D4C",
  violet: "#6B5FA8",
  sky: "#2F86A6",
  paper: "#FBF8F2",
  paperCard: "#FFFFFF",
  slate: "#6B6B80",
  line: "#E9E4D8",
};
export const getRandomColor = () => {
  const randomNumber = Math.floor(Math.random() * 10);
  const arr=["ink",
  "marigold",
  "mint",
  "coral",
  "violet",
  "sky",
  "paper",
  "paperCard",
  "slate",
  "line"];
  return C[arr[randomNumber]];
}
export const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');`;

export const fontDisplay = "'Baloo 2', sans-serif";
export const fontBody = "Inter, sans-serif";
export const fontMono = "'IBM Plex Mono', monospace";
