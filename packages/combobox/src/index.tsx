import React, { PropsWithChildren } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { forwardRef } from "react";
import {
	Box,
	GetPropDefTypes,
	MarginProps,
	PopoverContent,
	PopoverRoot,
	PopoverTrigger,
	PropsWithoutRefOrColor,
	ScrollArea,
	Separator,
	Text,
	TextField,
	TextFieldInput,
	extractMarginProps,
	selectContentPropDefs,
	selectRootPropDefs,
	selectTriggerPropDefs,
	textFieldPropDefs,
	useThemeContext,
	withBreakpoints,
	withMarginProps,
} from "@radix-ui/themes";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { CheckIcon, ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { comboboxRootPropDefs } from "./index.props";

type ComboboxRootOwnProps = GetPropDefTypes<typeof comboboxRootPropDefs> & {
	onSelect?: (value: string) => void;
};

type ComboboxContextValue = ComboboxRootOwnProps;
const ComboboxContext = React.createContext<ComboboxContextValue>({});

const ComboboxRoot = (props: PropsWithChildren<ComboboxRootOwnProps>) => {
	const {
		children,
		size = selectRootPropDefs.size.default,
		value = comboboxRootPropDefs.value.default,
		onSelect,
		...rootProps
	} = props;
	return (
		<ComboboxContext.Provider value={React.useMemo(() => ({ size, value, onSelect }), [size, value, onSelect])}>
			<PopoverRoot {...rootProps}>{children}</PopoverRoot>
		</ComboboxContext.Provider>
	);
};
ComboboxRoot.displayName = PopoverRoot.displayName;

type ComboboxContentElement = React.ElementRef<typeof PopoverPrimitive.Content>;
type ComboboxContentOwnProps = GetPropDefTypes<typeof selectContentPropDefs>;
interface ComboboxContentProps
	extends PropsWithoutRefOrColor<typeof PopoverPrimitive.Content>,
		ComboboxContentOwnProps {
	container?: React.ComponentProps<typeof PopoverPrimitive.Portal>["container"];
}
const ComboboxContent = forwardRef<ComboboxContentElement, ComboboxContentProps>((props, ref) => {
	const {
		className,
		children,
		variant = selectContentPropDefs.variant.default,
		highContrast = selectContentPropDefs.highContrast.default,
		color = selectContentPropDefs.color.default,
		container,
		...contentProps
	} = props;
	const { size } = React.useContext(ComboboxContext);
	const themeContext = useThemeContext();
	const resolvedColor = color ?? themeContext.accentColor;
	return (
		<PopoverContent
			data-accent-color={resolvedColor}
			sideOffset={4}
			ref={ref}
			{...contentProps}
			className={classNames(
				"rt-ComboboxContent",
				className,
				withBreakpoints(size, "rt-r-size"),
				`rt-variant-${variant}`,
				{ "rt-high-contrast": highContrast },
			)}
		>
			<CommandPrimitive ref={ref} className={className} {...props} />
		</PopoverContent>
	);
});
ComboboxContent.displayName = CommandPrimitive.displayName;

type ComboboxTriggerElement = React.ElementRef<typeof SelectPrimitive.Trigger>;
type ComboboxTriggerOwnProps = GetPropDefTypes<typeof selectTriggerPropDefs>;
interface ComboboxTriggerProps
	extends Omit<PropsWithoutRefOrColor<typeof SelectPrimitive.Trigger>, "asChild">,
		MarginProps,
		ComboboxTriggerOwnProps {}
const ComboboxTrigger = forwardRef<ComboboxTriggerElement, ComboboxTriggerProps>((props, ref) => {
	const { rest: marginRest, ...marginProps } = extractMarginProps(props);
	const {
		className,
		variant = selectTriggerPropDefs.variant.default,
		color = selectTriggerPropDefs.color.default,
		radius = selectTriggerPropDefs.radius.default,
		placeholder,
		...triggerProps
	} = marginRest;
	const { size, value } = React.useContext(ComboboxContext);
	return (
		<PopoverTrigger>
			<button
				data-accent-color={color}
				data-radius={radius}
				{...triggerProps}
				className={classNames(
					"rt-reset",
					"rt-ComboboxTrigger",
					withBreakpoints(size, "rt-r-size"),
					`rt-variant-${variant}`,
					withMarginProps(marginProps),
				)}
			>
				<span className="rt-ComboboxTriggerInner">
					<Text>{value ?? placeholder}</Text>
				</span>
				<ChevronDownIcon className="rt-ComboboxIcon" />
			</button>
		</PopoverTrigger>
	);
});

const ComboboxInput = forwardRef<
	React.ElementRef<typeof CommandPrimitive.Input>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> &
		React.ComponentPropsWithoutRef<typeof TextFieldInput>
>((props, ref) => {
	const { rest: marginRest, ...marginProps } = extractMarginProps(props);
	const context = React.useContext(ComboboxContext);
	const {
		className,
		size = context?.size ?? textFieldPropDefs.size.default,
		variant = context?.variant ?? textFieldPropDefs.variant.default,
		color = context?.color ?? textFieldPropDefs.color.default,
		radius = context?.radius ?? textFieldPropDefs.radius.default,
		...inputProps
	} = marginRest;
	return (
		<div className="rt-ComboboxInput" cmdk-input-wrapper="" {...marginProps}>
			<TextField.Root>
				<TextField.Slot>
					<MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
				</TextField.Slot>
				<CommandPrimitive.Input
					ref={ref}
					data-accent-color={color}
					spellCheck="false"
					{...inputProps}
					className={classNames(
						"rt-TextFieldInput",
						className,
						withBreakpoints(size, "rt-r-size"),
						`rt-variant-${variant}`,
					)}
				/>
				<div data-accent-color={color} data-radius={radius} className="rt-TextFieldChrome" />
			</TextField.Root>
		</div>
	);
});
ComboboxInput.displayName = CommandPrimitive.Input.displayName;

const ComboboxList = forwardRef<
	React.ElementRef<typeof CommandPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
	<ScrollAreaPrimitive.Root type="auto" className="rt-ScrollAreaRoot">
		<ScrollAreaPrimitive.Viewport className="rt-ScrollAreaViewport" style={{ overflowY: undefined }}>
			<CommandPrimitive.List ref={ref} className={classNames(className)} {...props} />
		</ScrollAreaPrimitive.Viewport>
		<ScrollAreaPrimitive.Scrollbar className="rt-ScrollAreaScrollbar rt-r-size-1" orientation="vertical">
			<ScrollAreaPrimitive.Thumb className="rt-ScrollAreaThumb" />
		</ScrollAreaPrimitive.Scrollbar>
	</ScrollAreaPrimitive.Root>
));
ComboboxList.displayName = CommandPrimitive.List.displayName;

const ComboboxEmpty = forwardRef<
	React.ElementRef<typeof CommandPrimitive.Empty>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
	<Text asChild align="center" size="1">
		<CommandPrimitive.Empty ref={ref} {...props} />
	</Text>
));
ComboboxEmpty.displayName = CommandPrimitive.Empty.displayName;

const ComboboxGroup = forwardRef<
	React.ElementRef<typeof CommandPrimitive.Group>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>((props, ref) => <CommandPrimitive.Group ref={ref} {...props} />);
ComboboxGroup.displayName = CommandPrimitive.Group.displayName;

const ComboboxSeparator = forwardRef<
	React.ElementRef<typeof CommandPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<Separator asChild size="1" className={className}>
		<CommandPrimitive.Separator ref={ref} {...props} />
	</Separator>
));
ComboboxSeparator.displayName = CommandPrimitive.Separator.displayName;

const ComboboxItem = forwardRef<
	React.ElementRef<typeof CommandPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>((props, ref) => {
	const { className, ...itemProps } = props;
	const { value, onSelect } = React.useContext(ComboboxContext);
	return (
		<CommandPrimitive.Item
			ref={ref}
			className={classNames("rt-ComboboxItem", className)}
			onSelect={onSelect}
			{...itemProps}
		>
			<CheckIcon
				style={{
					opacity: value === itemProps.value ? 1 : 0,
				}}
			/>
			{props.children}
		</CommandPrimitive.Item>
	);
});
ComboboxItem.displayName = CommandPrimitive.Item.displayName;

export {
	ComboboxRoot,
	ComboboxTrigger,
	ComboboxContent,
	ComboboxInput,
	ComboboxList,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxSeparator,
	ComboboxItem,
};
