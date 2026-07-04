import { beforeEach, describe, expect, test, vi } from "vitest";

import {
  detectBrowserLang,
  getLang,
  getLangFromUrl,
  setLang,
  withLangInUrl,
} from "./i18n.js";

describe("i18n", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    const storage = new Map();
    vi.stubGlobal("localStorage", {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, String(value)),
      clear: () => storage.clear(),
    });
    localStorage.clear();
  });

  test("uses saved language when available", () => {
    setLang("en");

    expect(getLang()).toBe("en");
  });

  test("uses language from url before saved preference", () => {
    setLang("es");
    vi.stubGlobal("window", {
      location: {
        search: "?lang=en",
      },
    });

    expect(getLang()).toBe("en");
  });

  test("ignores unsupported language from url", () => {
    vi.stubGlobal("window", {
      location: {
        search: "?lang=fr",
      },
    });

    expect(getLangFromUrl()).toBe(null);
  });

  test("uses browser language on first load", () => {
    vi.stubGlobal("navigator", {
      language: "en-US",
      languages: ["en-US", "es-AR"],
    });

    expect(getLang()).toBe("en");
  });

  test("falls back to first supported browser language", () => {
    vi.stubGlobal("navigator", {
      language: "fr-FR",
      languages: ["fr-FR", "es-AR"],
    });

    expect(detectBrowserLang()).toBe("es");
  });

  test("falls back to spanish when browser language is unsupported", () => {
    vi.stubGlobal("navigator", {
      language: "pt-BR",
      languages: ["pt-BR"],
    });

    expect(getLang()).toBe("es");
  });

  test("adds current language to navigation urls", () => {
    vi.stubGlobal("window", {
      location: {
        href: "https://example.com/index.html?lang=en",
      },
    });

    expect(withLangInUrl("./exercise.html?ex=3", "en")).toBe(
      "/exercise.html?ex=3&lang=en",
    );
  });
});
