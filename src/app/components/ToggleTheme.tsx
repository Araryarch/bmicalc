import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ToggleTheme = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-5 right-5 p-3 rounded-full bg-background text-primary shadow-md focus:outline-none transition-colors duration-300`}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ToggleTheme;
