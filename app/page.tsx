import TyperText from "./TyperText";

export default function Page() {
  return (
    <div className="p-4 flex flex-col items-center justify-center w-full min-h-screen space-y-4">
      <div className="max-w-screen-sm w-full space-y-4">
        <TyperText
          delay={-200}
          text="Hello, I'm Matthew Hrehirchuk."
          className="text-lg"
        />
        <div className="relative flex flex-row items-start">
          <TyperText
            delay={1500}
            duration={500}
            className="text-sm absolute -left-16 text-muted-foreground/50 leading-relaxed w-min"
            text="INFO."
          />
          <TyperText
            delay={1000}
            text="I'm a web developer, a graphic designer, and a student at Mount Royal University in Calgary, Alberta. I make plenty of games, a few helpful tools, and – at the moment – lots of studying resources for students like myself."
            className="text-sm leading-relaxed"
          />
        </div>
        <div className="relative flex flex-row items-start">
          <TyperText
            delay={1500}
            text="I'm currently a Senior Data Quality Specialist at Cohere, where I spend my days ranking and auditing data to improve our LLMs. When I'm not wired in, I'm spending my time playing board games, listening to music, and fleshing out my record collection."
            className="text-sm leading-relaxed"
          />
        </div>
        <div className="relative flex flex-row items-start">
          <TyperText
            delay={2500}
            duration={500}
            className="text-sm absolute -left-24 text-muted-foreground/50 leading-relaxed w-min"
            text="PROJECTS."
          />
          <TyperText
            delay={2000}
            text="001. Strapi CMS"
            className="text-sm leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
