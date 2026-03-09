// Dropdown options (first option is a placeholder to match the wireframe).
const LANGUAGES = [
  { label: "Select a Language", value: "" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "Python", value: "Python" },
  { label: "Java", value: "Java" },
  { label: "C#", value: "C#" },
  { label: "C++", value: "C++" },
  { label: "Go", value: "Go" },
  { label: "Rust", value: "Rust" },
  { label: "Ruby", value: "Ruby" },
  { label: "PHP", value: "PHP" },
  { label: "Swift", value: "Swift" },
  { label: "Kotlin", value: "Kotlin" },
  { label: "Dart", value: "Dart" },
];

// Simple language color map for the footer dot (approximate GitHub tones)
const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C#": "#178600",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
};

(function populate() {
  const sel = document.getElementById("languageSelect");
  sel.innerHTML = ""; // reset

  for (const opt of LANGUAGES) {
    const el = document.createElement("option");
    el.value = opt.value;
    el.textContent = opt.label;
    if (!opt.value) {
      el.disabled = false;         // allow re-selecting placeholder
      el.selected = true;
    }
    sel.appendChild(el);
  }
})();