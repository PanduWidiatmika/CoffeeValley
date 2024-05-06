import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Import your theme if created

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
