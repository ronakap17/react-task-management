import { createContext, useState } from "react";

interface ThemeContextProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const defaultTheme: ThemeContextProps['theme'] = 'light';

export const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
  toggleTheme: () => {},
});

type ThemeProviderProps = {
  children?: React.ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeContextProps['theme']>(defaultTheme);

  const toggleThemeHandler = () => {
    setTheme((theme) => theme === 'dark' ? 'light': 'dark');
  };
  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        toggleTheme: toggleThemeHandler,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
