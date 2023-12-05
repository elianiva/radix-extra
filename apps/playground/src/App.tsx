import { Flex } from "@radix-ui/themes";
import {
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxRoot,
	ComboboxTrigger,
} from "@radix-extra/combobox";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const frameworks = [
	{
		value: "next.js",
		label: "Next.js",
	},
	{
		value: "sveltekit",
		label: "SvelteKit",
	},
	{
		value: "nuxt.js",
		label: "Nuxt.js",
	},
	{
		value: "remix",
		label: "Remix",
	},
	{
		value: "astro",
		label: "Astro",
	},
];

function App() {
	const [value, setValue] = useState<string>("Choose something...");

	return (
		<Flex height="100%" align="center" justify="center" direction="column">
			<ComboboxRoot value={value}>
				<ComboboxTrigger />
				<ComboboxContent>
					<ComboboxInput placeholder="Search framework..." />
					<ComboboxEmpty>No framework found.</ComboboxEmpty>
					<ComboboxGroup>
						{frameworks.map((framework) => (
							<ComboboxItem
								key={framework.value}
								value={framework.value}
								onSelect={(currentValue) => {
									setValue(currentValue === value ? "Choose something..." : currentValue);
								}}
							>
								<CheckIcon
									style={{
										opacity: value === framework.value ? 1 : 0,
									}}
								/>
								{framework.label}
							</ComboboxItem>
						))}
					</ComboboxGroup>
				</ComboboxContent>
			</ComboboxRoot>
		</Flex>
	);
}

export default App;
