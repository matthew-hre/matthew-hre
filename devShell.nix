{
  mkShell,
  alejandra,
  nodejs_22,
}:
mkShell {
  name = "matthew-hre.com";

  packages = [
    nodejs_22
    alejandra
  ];
}
