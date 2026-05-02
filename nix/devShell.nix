{
  mkShell,
  alejandra,
  wrangler,
  nodejs,
  bun,
  patchelf,
}:
mkShell {
  name = "matthew-hre.com";

  packages = [
    nodejs
    bun

    wrangler
    patchelf

    alejandra
  ];
}
