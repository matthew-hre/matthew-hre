{
  mkShell,
  alejandra,
  nodejs,
  pnpm,
}:
mkShell {
  name = "matthew-hre.com";

  packages = [
    nodejs
    pnpm

    alejandra
  ];
}
