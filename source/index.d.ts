type ColorTypes =
	"BLACK" |
	"RED" |
	"GREEN" |
	"YELLOW" |
	"BLUE" |
	"CYAN" |
	"MAGENTA" |
	"WHITE" |
	"GRAY" |
	"GREY" |
	"BLACK_BRIGHT" |
	"RED_BRIGHT" |
	"GREEN_BRIGHT" |
	"YELLOW_BRIGHT" |
	"BLUE_BRIGHT" |
	"CYAN_BRIGHT" |
	"MAGENTA_BRIGHT" |
	"WHITE_BRIGHT";

type DefaultPrefixes = 'info' | 'error';

type Methods = DefaultPrefixes | string;

export type Prefixes = Record<Methods, string>;

declare function createClog<T extends Prefixes>(prefixes: T): Record<DefaultPrefixes | keyof T, Function>;
declare function createClog(): Record<DefaultPrefixes, Function>;

export const Colors: Record<ColorTypes, string>
