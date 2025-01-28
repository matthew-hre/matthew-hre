{
  mkShell,
  alejandra,
  nodejs_23,
  pnpm,
}:
mkShell {
  name = "matthew-hre.com";

  packages = [
    nodejs_23
    pnpm

    alejandra
  ];
}
