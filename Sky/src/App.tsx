import { ThemeProvider } from "@/components/theme-provider"

import { Hero } from "./Pages/Hero"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Hero></Hero>
    </ThemeProvider>
  )
}

export default App