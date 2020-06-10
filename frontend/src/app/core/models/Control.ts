export class Control {
    controlType: string;
    key: string;
    value: string;
    label: string;
    placeholder?: string;
    type: string;
    required: boolean;
    disabled: boolean;
    options: any

    constructor(options: {
        controlType?: string;
        key?: string;
        value?: string;
        label?: string;
        placeholder?: string;
        type?: string;
        required?: boolean;
        disabled?: boolean;
        options?: any
    }) {
        this.controlType = options.controlType;
        this.key = options.key
        this.value = options.value
        this.label = options.label
        this.placeholder = options.placeholder
        this.type = options.type
        this.required = options.required
        this.disabled = options.disabled
        this.options = options.options
    }
}