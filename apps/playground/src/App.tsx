import { Flex } from "@radix-ui/themes";
import {
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	ComboboxRoot,
	ComboboxTrigger,
} from "@radix-extra/combobox";
import { useState } from "react";

function App() {
	const [value, setValue] = useState<string>();

	return (
		<Flex height="100%" align="center" direction="column">
			<ComboboxRoot
				value={value}
				variant="soft"
				onSelect={(currentValue) => {
					setValue(currentValue === value ? "Choose something..." : currentValue);
				}}
			>
				<ComboboxTrigger placeholder="Choose Something..." />
				<ComboboxContent>
					<ComboboxInput placeholder="Search framework..." />
					<ComboboxList style={{ height: "200px" }}>
						<ComboboxEmpty>No framework found.</ComboboxEmpty>
						<ComboboxGroup>
							{Array(100)
								.fill(0)
								.map((_, i) => ({
									value: `framework-${i}`,
									label: `Framework ${i}`,
								}))
								.map((framework) => (
									<ComboboxItem key={framework.value} value={framework.value}>
										{framework.label}
									</ComboboxItem>
								))}
						</ComboboxGroup>
					</ComboboxList>
				</ComboboxContent>
			</ComboboxRoot>
		</Flex>
	);
}

export default App;
