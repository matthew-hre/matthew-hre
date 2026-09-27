#!/usr/bin/env bash
# Patch npm-installed workerd binaries so they run on NixOS.
# The npm `workerd` ships a glibc-linked ELF with interpreter `/lib64/ld-linux-x86-64.so.2`,
# which does not exist on NixOS. We patch it to use the same interpreter and rpath as the
# workerd binary bundled with the nix-provided `wrangler` from the dev shell.
set -euo pipefail

if [[ -z "${IN_NIX_SHELL:-}" ]]; then
  exit 0
fi

# Prefer the nix-provided Wrangler over the local npm shim in the dev shell.
rm -f node_modules/.bin/wrangler node_modules/.bin/wrangler2

if [[ "$(uname -s)" != "Linux" ]]; then
  exit 0
fi

if ! command -v patchelf >/dev/null 2>&1; then
  echo "patch-workerd: patchelf not found on PATH; skipping" >&2
  exit 0
fi

if ! command -v wrangler >/dev/null 2>&1; then
  echo "patch-workerd: wrangler not found on PATH; skipping" >&2
  exit 0
fi

# Resolve the nix wrangler store path and locate a patched workerd inside it.
wrangler_real=$(readlink -f "$(command -v wrangler)")
wrangler_root=${wrangler_real%/bin/*}
nix_workerd=""
while IFS= read -r candidate; do
  if file "$candidate" 2>/dev/null | grep -q "ELF .* executable"; then
    nix_workerd=$candidate
    break
  fi
done < <(find "$wrangler_root" -type f -name workerd 2>/dev/null)

if [[ -z "${nix_workerd:-}" ]]; then
  echo "patch-workerd: could not locate workerd inside nix wrangler ($wrangler_root); skipping" >&2
  exit 0
fi

interpreter=$(patchelf --print-interpreter "$nix_workerd")
rpath=$(patchelf --print-rpath "$nix_workerd" || true)

mapfile -t targets < <(find node_modules -type f -name workerd -executable 2>/dev/null || true)

for bin in "${targets[@]}"; do
  if ! file "$bin" 2>/dev/null | grep -q ELF; then
    continue
  fi
  current=$(patchelf --print-interpreter "$bin" 2>/dev/null || echo "")
  if [[ "$current" == "$interpreter" ]]; then
    continue
  fi
  echo "patch-workerd: patching $bin"
  patchelf --set-interpreter "$interpreter" "$bin"
  if [[ -n "$rpath" ]]; then
    patchelf --set-rpath "$rpath" "$bin"
  fi
done
