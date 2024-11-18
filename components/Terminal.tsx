"use client";

import { FitAddon } from "@xterm/addon-fit";
import { useXTerm } from "react-xtermjs";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import CRTTheme from "./CRTTheme";

const initialMessage = `\r                 _   _   _                     _              
\r _ __ ___   __ _| |_| |_| |__   _____      __ | |__  _ __ ___ 
\r| '_ \` _ \\ / _\` | __| __| '_ \\ / _ \\ \\ /\\ / / | '_ \\| '__/ _ \\
\r| | | | | | (_| | |_| |_| | | |  __/\\ V  V /  | | | | | |  __/
\r|_| |_| |_|\\__,_|\\__|\\__|_| |_|\\___| \\_/\\_/___|_| |_|_|  \\___|
\r                                         |_____|              
\r------------------------------------------------------------------------
\rtype "help" to see available commands.
\r------------------------------------------------------------------------
`;

export default function MyTerminal() {
  const { theme, setTheme } = useTheme();
  const [visible, setVisible] = useState(false);

  const { instance, ref } = useXTerm();
  const fitAddon = new FitAddon();
  const inputRef = useRef(``); // Using a ref to track input reliably
  const prompt = "$ ";

  // Initialize the terminal with the initial prompt
  const initializeTerminal = () => {
    if (instance) {
      instance.loadAddon(fitAddon);

      const handleResize = () => fitAddon.fit();
      instance.write(initialMessage + "\r" + prompt);
      instance.onData(handleInput);

      instance.options = {
        cursorStyle: "block",
        cursorBlink: true,
        theme: {
          background: theme === "light" ? "#fff" : "#131313",
          foreground: theme === "light" ? "#131313" : "#fff",
        },
      };

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  };

  // Handle each key press in the terminal
  const handleInput = (data: string) => {
    if (data === "\r") {
      // Enter key: process the command
      handleCommand(inputRef.current);
      inputRef.current = ""; // Clear input after executing
      instance?.scrollToBottom();
    } else if (data === "\u007F") {
      // Backspace key: remove the last character
      if (inputRef.current.length > 0) {
        inputRef.current = inputRef.current.slice(0, -1);
        instance?.write("\b \b"); // Move back, erase character, move back again
      }
    } else {
      // Append character to inputRef and display it
      inputRef.current += data;
      instance?.write(data);
    }
  };

  const commands: {
    [key: string]: { description: string; action: (args: string[]) => void };
  } = {
    echo: {
      description: "Echoes the input arguments",
      action: (args: string[]) => {
        instance?.writeln(args.join(" "));
      },
    },
    clear: {
      description: "Clears the terminal screen",
      action: () => {
        instance?.clear();
      },
    },
    help: {
      description: "Displays the list of available commands",
      action: () => {
        const commandList = Object.keys(commands)
          .map((cmd) => `    ${cmd}:\t ${commands[cmd].description}`)
          .join("\r\n");
        instance?.writeln(commandList);
      },
    },
    theme: {
      description: "Changes the theme of the site",
      action: (args: string[]) => {
        if (args.length < 1) {
          instance?.writeln("Usage: theme <subcommand>\n");
          instance?.writeln("Subcommands:");
          instance?.writeln("list: list available themes");
          instance?.writeln("set <theme>: set the theme");
        } else {
          switch (args[0]) {
            case "list":
              instance?.writeln("Available themes: light, dark, crt-amber");
              break;
            case "set":
              if (args.length < 2) {
                instance?.writeln("Usage: theme set <theme>");
              } else {
                if (["light", "dark", "crt-amber"].includes(args[1])) {
                  setTheme(args[1]);
                } else {
                  instance?.writeln(`Unknown theme: ${args[1]}`);
                }
              }
              break;
            default:
              instance?.writeln(`Unknown subcommand: ${args[0]}`);
              break;
          }
        }
      },
    },
    date: {
      description: "Displays the current date and time",
      action: () => {
        instance?.writeln(new Date().toString());
      },
    },
    exit: {
      description: "Exits the terminal",
      action: () => {
        instance?.clear();
        instance?.blur();
        setVisible(false);
      },
    },
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "c") {
        setVisible((visible) => !visible);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Process commands
  const handleCommand = (cmd: string) => {
    instance?.write("\r\n"); // Move to a new line for command output
    const [command, ...args] = cmd.split(" ");
    if (commands[command]) {
      commands[command].action(args);
    } else {
      instance?.writeln(`Command not found: ${cmd}`);
    }
    instance?.write(`\r\n${prompt}`); // New prompt on a new line
  };

  // Initialize the terminal on first render
  useEffect(() => {
    if (instance) {
      initializeTerminal();
    }
  }, [instance]);

  useEffect(() => {
    if (instance) {
      instance.options = {
        theme: {
          background: theme === "light" ? "#fff" : "#131313",
          foreground: theme === "light" ? "#131313" : "#fff",
          cursor: theme === "light" ? "#131313" : "#fff",
        },
      };
    }
  }, [instance, theme]);

  return (
    <>
      <CRTTheme />
      <div
        className={`terminal-container p-2 pt-8 overflow-hidden border border-foreground shadow-lg fixed bottom-4 left-4 min-w-[640px] w-[640px] h-96 bg-background z-50 transform transition-transform duration-500 ${
          visible ? "translate-x-0" : "-translate-x-[800px]"
        }`}
      >
        <div className="h-6 bg-foreground absolute top-0 left-0 right-0 flex flex-row items-center w-full">
          <p
            className="bg-background w-max text-sm px-1 mr-[0.1rem] ml-auto hover:cursor-pointer"
            onClick={() => setVisible(!visible)}
          >
            X
          </p>
        </div>
        <div ref={ref} className="h-full w-full bg-background" />
      </div>
    </>
  );
}
