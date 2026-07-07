import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="font-display text-4xl" {...props} />,
    h2: (props) => <h2 className="font-display text-2xl mt-10" {...props} />,
    p: (props) => <p className="text-ink/80 leading-relaxed" {...props} />,
    code: (props) => (
      <code className="font-mono bg-ink/5 rounded px-1 py-0.5" {...props} />
    ),
    ...components,
  };
}
