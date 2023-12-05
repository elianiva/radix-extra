import { PropDef, colorProp, radiusProp } from "@radix-ui/themes";

const sizes = ["1", "2", "3"] as const;
const variants = ["classic", "surface", "soft"] as const;

const comboboxRootPropDefs = {
	size: { type: "enum", values: sizes, default: "2", responsive: true },
	variant: { type: "enum", values: variants, default: "surface" },
	color: colorProp,
	radius: radiusProp,
	value: { type: "string", default: "Select Something..." },
} satisfies {
	size: PropDef<(typeof sizes)[number]>;
	variant: PropDef<(typeof variants)[number]>;
	color: typeof colorProp;
	radius: typeof radiusProp;
	value: PropDef<string>;
};

export { comboboxRootPropDefs };
