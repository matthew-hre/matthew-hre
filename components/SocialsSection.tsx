import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export function SocialsSection() {
  return (
    <div className="flex flex-row space-x-6 w-1/2 mx-auto md:mx-0 md:px-0 justify-around md:justify-start pt-2">
      <Link
        href="https://instagram.com/matthew_hre"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramLogoIcon className="text-foreground hover:text-muted-foreground transition-all w-6 h-6" />
      </Link>
      <Link
        href="https://linkedin.com/in/matthew-hre"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedInLogoIcon className="text-foreground hover:text-muted-foreground transition-all w-6 h-6" />
      </Link>
      <Link
        href="mailto:mhreh594@mtroyal.ca"
        target="_blank"
        rel="noopener noreferrer"
      >
        <EnvelopeClosedIcon className="text-foreground hover:text-muted-foreground transition-all w-6 h-6" />
      </Link>
      <Link
        href="https://github.com/matthew-hre"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubLogoIcon className="text-foreground hover:text-muted-foreground transition-all w-6 h-6" />
      </Link>
    </div>
  );
}
