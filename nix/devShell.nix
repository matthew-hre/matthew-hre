{
  mkShell,
  alejandra,
  nodejs_22,
  pnpm,
}:
mkShell {
  name = "matthew-hre.com";

  packages = [
    nodejs_22
    pnpm
    alejandra
  ];
}
