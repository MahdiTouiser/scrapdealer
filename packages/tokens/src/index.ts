export const colors = {
  primary: { main: '#0066cc', contrastText: '#ffffff' },
  secondary: { main: '#00b894', contrastText: '#ffffff' },
  gray: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 900: '#111827' },
};

export const radii = { sm: 6, md: 12, xl: 16 };
export const spacing = (n: number) => n * 8;

export const typography = {
  fontFamily: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  h1: { size: 36, weight: 700 },
  body: { size: 16, weight: 400 },
};
