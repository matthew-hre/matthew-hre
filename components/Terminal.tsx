"use client";

import React, { useRef, useEffect, useState, useMemo, use } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import CRTTheme from "./CRTTheme";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const initialMessage = `\r                 _   _   _                     _
\r _ __ ___   __ _| |_| |_| |__   _____      __ | |__  _ __ ___
\r| '_ \` _ \\ / _\` | __| __| '_ \\ / _ \\ \\ /\\ / / | '_ \\| '__/ _ \\
\r| | | | | | (_| | |_| |_| | | |  __/\\ V  V /  | | | | | |  __/
\r|_| |_| |_|\\__,_|\\__|\\__|_| |_|\\___| \\_/\\_/___|_| |_|_|  \\___|
\r                                         |_____|
\r-------------------------------------------------------------------
\rtype "help" to see available commands.
\r-------------------------------------------------------------------
`;

const MyTerminal = () => {
  const { theme, setTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef("");

  const pathname = usePathname();

  const terminalRef = useRef<HTMLDivElement | null>(null);
  const [term, setTerm] = useState<Terminal | null>(null);
  const prompt = "$ ";

  useEffect(() => {
    const terminal = new Terminal({
      cursorStyle: "block",
      cursorBlink: true,
      theme: {
        background: theme === "light" ? "#fff" : "#131313",
        foreground: theme === "light" ? "#131313" : "#fff",
        cursor: theme === "light" ? "#131313" : "#fff",
      },
    });
    setTerm(terminal);

    return () => {
      if (terminal) {
        terminal.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (term) {
      term.options.theme = {
        background: theme === "light" ? "#fff" : "#131313",
        foreground: theme === "light" ? "#131313" : "#fff",
        cursor: theme === "light" ? "#131313" : "#fff",
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    if (term) {
      if (terminalRef.current) {
        term.open(terminalRef.current);
        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        fitAddon.fit();
        setTerm(term);
        term.write(initialMessage + "\r" + prompt);
      }
      const disposable = term.onData(handleInput);

      return () => {
        disposable.dispose();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (pathname.includes("keystatic")) {
        return;
        // this was driving me NUTS when writing blog articles
      }

      if (e.key === "c") {
        setVisible((visible) => !visible);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleInput = (data: string) => {
    if (data === "\r") {
      handleCommand(inputRef.current);
      setInput("");
      inputRef.current = "";
      term?.write("\r\n" + prompt);
      term?.scrollToBottom();
    } else if (data === "\u007F") {
      if (inputRef.current.length > 0) {
        setInput(inputRef.current.slice(0, -1));
        inputRef.current = inputRef.current.slice(0, -1);
        term?.write("\b \b");
      }
    } else if (
      data === "\u001b[A" ||
      data === "\u001b[B" ||
      data === "\u001b[C" ||
      data === "\u001b[D"
    ) {
      // do nothing
    } else {
      setInput(inputRef.current + data);
      inputRef.current += data;
      term?.write(data);
    }
  };

  const commands: {
    [key: string]: { description: string; action: (args: string[]) => void };
  } = {
    echo: {
      description: "Echoes the input arguments",
      action: (args: string[]) => {
        term?.writeln(args.join(" "));
      },
    },
    clear: {
      description: "Clears the terminal screen",
      action: () => {
        term?.clear();
      },
    },
    help: {
      description: "Displays the list of available commands",
      action: () => {
        const commandList = Object.keys(commands)
          .map((cmd) => `    ${cmd}:\t ${commands[cmd].description}`)
          .join("\r\n");
        term?.writeln(commandList);
      },
    },
    theme: {
      description: "Changes the theme of the site",
      action: (args: string[]) => {
        if (args.length < 1) {
          term?.writeln("Usage: theme <subcommand>\n");
          term?.writeln("Subcommands:");
          term?.writeln("list: list available themes");
          term?.writeln("set <theme>: set the theme");
        } else {
          switch (args[0]) {
            case "list":
              term?.writeln(
                "Available themes: light, dark, crt-amber, crt-green",
              );
              break;
            case "set":
              if (args.length < 2) {
                term?.writeln("Usage: theme set <theme>");
              } else {
                if (
                  ["light", "dark", "crt-amber", "crt-green"].includes(args[1])
                ) {
                  setTheme(args[1]);
                } else {
                  term?.writeln(`Unknown theme: ${args[1]}`);
                }
              }
              break;
            case "help":
              term?.writeln("Usage: theme <subcommand>");
              term?.writeln("Subcommands:");
              term?.writeln("list: list available themes");
              term?.writeln("set <theme>: set the theme");
              break;
            default:
              term?.writeln(`Unknown subcommand: ${args[0]}`);
              break;
          }
        }
      },
    },
    date: {
      description: "Displays the current date and time",
      action: () => {
        term?.writeln(new Date().toString());
      },
    },
    exit: {
      description: "Exits the terminal",
      action: () => {
        term?.clear();
        term?.blur();
        setVisible(false);
      },
    },
  };

  const handleCommand = (cmd: string) => {
    term?.write("\r\n");
    const [command, ...args] = cmd.split(" ");
    if (commands[command]) {
      commands[command].action(args);
    } else {
      term?.writeln(`Command not found: ${cmd}`);
    }
  };

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
        <div
          ref={terminalRef}
          className="h-full w-full bg-background [&_*]:font-mono"
        />
      </div>
    </>
  );
};

export default MyTerminal;
