{
  mkShell,
  alejandra,
  nodejs,
  bun,
}:
mkShell {
  name = "matthew-hre.com";

  packages = [
    nodejs
    bun

    alejandra
  ];
}
