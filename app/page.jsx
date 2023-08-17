"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState(localStorage?.theme);
  const [useSystemTheme, setUseSystemTheme] = useState(
    !("useSystemTheme" in localStorage)
      ? true
      : localStorage.useSystemTheme === "true"
      ? true
      : false
  );

  const themeHandler = (themeMode) => {
    setTheme(themeMode);
    localStorage.theme = themeMode;
  };

  const handleOSThemeToggle = () => {
    useSystemTheme ? (localStorage.useSystemTheme = "") : (localStorage.useSystemTheme = "true");

    setUseSystemTheme((prevState) => !prevState);
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark"); //enables the dark mode
    } else {
      document.documentElement.classList.remove("dark"); //disbales the dark mode
    }
  }, [theme, useSystemTheme]);

  useEffect(() => {
    if (useSystemTheme)
      themeHandler(matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "");

    const handlerOSThemeChange = (e) => {
      if (e.matches) themeHandler("dark");
      else themeHandler("");
    };

    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handlerOSThemeChange);

    return () =>
      matchMedia("(prefers-color-scheme: dark)").removeEventListener(
        "change",
        handlerOSThemeChange
      );
  }, [useSystemTheme]);

  return (
    <div className="relative flex h-screen w-full items-center justify-center dark:bg-[rgb(0,0,0)] dark:text-[rgb(239,231,235)]">
      <div className="absolute right-5 top-5 flex gap-5 items-center justify-center transition-all ease-linear duration-200">
        {!useSystemTheme &&
          (theme !== "dark" ? (
            <div className="h-5 w-5 cursor-pointer" onClick={() => themeHandler("dark")}>
              <DarkSVG />
            </div>
          ) : (
            <div className="h-5 w-5 cursor-pointer" onClick={() => themeHandler("")}>
              <LightSVG />
            </div>
          ))}

        <div className="flex items-center justify-center gap-1">
          <label htmlFor="useSytem" className="text-xs cursor-pointer">
            Use system theme?
          </label>
          <input
            checked={useSystemTheme}
            onChange={handleOSThemeToggle}
            type="checkbox"
            id="useSytem"
            className="rounded-full appearance-none border border-lime-600 p-1.5 checked:bg-lime-500 cursor-pointer hover:opacity-90 transition-all ease-linear"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex-1">
        <div className="w-2/5 mx-auto">
          <div className="w-full flex-1 rounded-2xl border border-gray-200 p-5">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-xl font-medium pb-3">Welcome back</p>
              <p className="text-xs w-9/12 mx-auto">
                Please provide your username and password to unlock your access to freedom
              </p>
            </div>

            <div className="flex flex-col gap-5 pt-5 px-2 py-4">
              <div className="flex w-full flex-col gap-1.5">
                <label htmlFor="username" className="text-sm">
                  username
                </label>
                <input
                  type="text"
                  id="username"
                  className="rounded px-2 py-1 text-gray-800 outline-none ring-gray-200 ring-1 focus:ring-lime-600/90 dark:bg-inherit dark:text-inherit"
                  placeholder="johndoe"
                />
              </div>

              <div className="flex w-full flex-col gap-1.5">
                <label htmlFor="password" className="text-sm">
                  password
                </label>
                <input
                  type="password"
                  id="password"
                  className="rounded px-2 py-1 text-gray-800 outline-none ring-gray-200 ring-1 focus:ring-lime-600/90 dark:bg-inherit dark:text-inherit"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="bg-lime-600/95 hover:opacity-90 p-2 rounded-full transition-all duration-200 text-white dark:text-inherit mt-3 font-medium text-lg outline-none"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DarkSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
    />
  </svg>
);

const LightSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
    />
  </svg>
);
