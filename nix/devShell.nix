{
  mkShell,
  alejandra,
  wrangler,
  nodejs,
  bun,
}:
mkShell {
  name = "matthew-hre.com";

  packages = [
    nodejs
    bun

    wrangler

    alejandra
  ];
}
