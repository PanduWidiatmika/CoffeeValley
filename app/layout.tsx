import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <html>
        <head />
        <body>{children}</body>
      </html>
    </ThemeProvider>
  );
}

export default RootLayout;
