import { useXTerm } from "react-xtermjs";
import { useEffect, useRef } from "react";

const initialMessage = `\r                 _   _   _                     _              
\r _ __ ___   __ _| |_| |_| |__   _____      __ | |__  _ __ ___ 
\r| '_ \` _ \\ / _\` | __| __| '_ \\ / _ \\ \\ /\\ / / | '_ \\| '__/ _ \\
\r| | | | | | (_| | |_| |_| | | |  __/\\ V  V /  | | | | | |  __/
\r|_| |_| |_|\\__,_|\\__|\\__|_| |_|\\___| \\_/\\_/___|_| |_|_|  \\___|
\r                                         |_____|              
\r--------------------------------------------------------------------------------
\rtype "help" to see available commands.
\r--------------------------------------------------------------------------------
`;

export default function MyTerminal() {
  const { instance, ref } = useXTerm();
  const inputRef = useRef(``); // Using a ref to track input reliably
  const prompt = "$ ";

  // Initialize the terminal with the initial prompt
  const initializeTerminal = () => {
    if (instance) {
      instance.write(initialMessage + "\r" + prompt);
      instance.onData(handleInput);
    }
  };

  // Handle each key press in the terminal
  const handleInput = (data: string) => {
    if (data === "\r") {
      // Enter key: process the command
      handleCommand(inputRef.current);
      inputRef.current = ""; // Clear input after executing
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

  // Process commands like "echo" and "clear"
  const handleCommand = (cmd: string) => {
    instance?.write("\r\n"); // Move to a new line for command output
    if (cmd.startsWith("echo ")) {
      const message = cmd.slice(5);
      instance?.writeln(message);
    } else if (cmd === "clear") {
      instance?.clear();
      instance?.write(`${prompt}`); // no new line for prompt
      return;
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

  return (
    <div className="p-2 pt-8 overflow-hidden border border-foreground shadow-lg fixed bottom-4 right-4 w-screen-sm h-96 bg-background">
      <div className="h-6 bg-foreground absolute top-0 left-0 right-0 flex flex-row items-center ">
        <p className="bg-background w-max text-sm px-1 mr-[0.1rem] ml-auto">
          X
        </p>
      </div>
      <div ref={ref} />
    </div>
  );
}
