const PRODUCES = ["text/html", "text/markdown"] as const;

type AcceptEntry = {
  type: string;
  q: number;
  specificity: number;
  position: number;
};

function parseAccept(header: string): AcceptEntry[] {
  return header.split(",").flatMap((raw, position) => {
    const [rawType, ...parameters] = raw.trim().split(";");
    const type = rawType.trim().toLowerCase();
    if (!type) return [];

    let q = 1;
    for (const parameter of parameters) {
      const [rawName, rawValue] = parameter.split("=");
      if (rawName?.trim().toLowerCase() !== "q") continue;
      const parsed = Number(rawValue?.trim());
      q = Number.isFinite(parsed) ? Math.max(0, Math.min(1, parsed)) : 0;
    }

    return [{
      type,
      q,
      specificity: type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2,
      position,
    }];
  });
}

function matches(entry: AcceptEntry, candidate: string) {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) {
    return candidate.startsWith(entry.type.slice(0, -1));
  }
  return entry.type === candidate;
}

export function preferredContentType(header: string | null) {
  if (!header) return PRODUCES[0];

  const entries = parseAccept(header);
  if (entries.length === 0) return null;

  let bestType: (typeof PRODUCES)[number] | null = null;
  let bestQ = -1;
  let bestPosition = Number.POSITIVE_INFINITY;

  for (const candidate of PRODUCES) {
    let match: AcceptEntry | null = null;

    for (const entry of entries) {
      if (!matches(entry, candidate)) continue;
      if (
        match === null ||
        entry.specificity > match.specificity ||
        (entry.specificity === match.specificity && entry.position < match.position)
      ) {
        match = entry;
      }
    }

    if (!match || match.q <= 0) continue;
    if (
      match.q > bestQ ||
      (match.q === bestQ && match.position < bestPosition)
    ) {
      bestType = candidate;
      bestQ = match.q;
      bestPosition = match.position;
    }
  }

  return bestType;
}

export function appendVary(headers: Headers, value: string) {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", value);
    return;
  }

  const values = existing.split(",").map((item) => item.trim().toLowerCase());
  if (!values.includes(value.toLowerCase())) {
    headers.set("Vary", `${existing}, ${value}`);
  }
}
