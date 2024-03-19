export interface Article {
  slug: string;
  url: string;
  title: string;
  description?: string;
  date?: Date;
  categories: Category[];
}

export enum Category {
  Blog = "blog",
  Project = "project",
  Learning = "learning",
  Game = "game",
}

export const articles: Article[] = [
  {
    slug: "prog-iii",
    url: "https://github.com/matthew-hre/matthew-hre/blob/main/src/pages/prog/preface.md",
    title: "Prog III",
    description: "A collection of Data Structures resoruces for MRU students",
    categories: [Category.Learning],
  },
  {
    slug: "fopp",
    url: "localhost:3000",
    title: "FOPP Functions First",
    description: "The official Intro to Programming textbook for MRU",
    categories: [Category.Learning],
  },
  {
    slug: "vscode-java",
    url: "https://github.com/matthew-hre/matthew-hre/blob/main/src/pages/learning/vscode-java.md",
    title: "VSCode + Java",
    description: "A guide for setting up VSCode for Java development",
    categories: [Category.Learning],
  },
  {
    slug: "hunchifier",
    url: "localhost:3000",
    title: "Hunchifier",
    description: "A custom ideation tool developed for Mount Royal University",
    categories: [Category.Project, Category.Blog],
    date: new Date("2024-02-27"),
  },
  {
    slug: "mruhacks",
    url: "localhost:3000",
    title: "MRUHacks",
    description: "The homepage for the very first MRUHacks hackathon",
    categories: [Category.Project],
  },
  {
    slug: "roomwise",
    url: "localhost:3000",
    title: "RoomWise",
    description: "A web app for finding the best study spots on campus",
    categories: [Category.Project],
  },
  {
    slug: "bait-switch",
    url: "localhost:3000",
    title: "Bait & Switch",
    description: "A game about using bugs as a form of ammunition",
    categories: [Category.Game, Category.Blog],
    date: new Date("2023-01-30"),
  },
  {
    slug: "sender-not-found",
    url: "localhost:3000",
    title: "Sender Not Found",
    description: "An interactive visual novel about decrypting lost emails",
    categories: [Category.Game],
  },
  {
    slug: "depopulator",
    url: "localhost:3000",
    title: "Depopulator",
    description: "An innocent civilian alien abduction simulator",
    categories: [Category.Game],
  },
  {
    slug: "the-coin-problem",
    url: "localhost:3000",
    title: "The Coin Problem - A fouiller into neural networks",
    date: new Date("2022-12-31"),
    categories: [Category.Blog],
  },
  {
    slug: "how-to-game-jam",
    url: "localhost:3000",
    title: "How to Game Jam",
    date: new Date("2022-11-24"),
    categories: [Category.Blog],
  },
];
