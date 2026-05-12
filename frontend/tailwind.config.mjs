/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        foreground: "#F8FAFC",
        "accent-blue": "#3B82F6",
        "accent-purple": "#8B5CF6",
        "card-bg": "#1E293B",
        "text-muted": "#94A3B8",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        exo2: ["var(--font-exo2)", "sans-serif"],
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-subtle": "float 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        "premium": "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.2)",
      },
    },
  },
  plugins: [],
};
