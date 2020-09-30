export interface Elements {
    container: HTMLElement;
    input: HTMLInputElement | null;
    wrapper: HTMLElement | null;
}
export interface EmailHandlers {
    handleRemoveClick: (event: MouseEvent) => void;
}
export interface InputHandlers {
    handleInputBlur: () => void;
    handleInputChange: (event: KeyboardEvent) => void;
    handleInputPaste: (event: ClipboardEvent) => void;
}
export declare type Handlers = EmailHandlers & InputHandlers;
//# sourceMappingURL=types.d.ts.map