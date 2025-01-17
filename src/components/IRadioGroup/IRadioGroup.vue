<script lang="ts">
import { computed, defineComponent, inject, PropType, provide, toRef } from 'vue';
import { uid } from '@grozav/utils';
import {
    useComponentColor,
    useComponentSize,
    useFormValidationError,
    useValidation
} from '@inkline/inkline/composables';
import { FormKey, FormGroupKey, RadioGroupKey } from '@inkline/inkline/constants';

const componentName = 'IRadioGroup';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the radio group
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the radio group
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The error state of the radio, computed based on schema by default.
         * @type Boolean | Array
         * @default ['touched', 'dirty', 'invalid']
         * @TODO use propDefaultValue to set default value
         * @name error
         */
        error: {
            type: [Array, Boolean] as PropType<boolean | string[]>,
            default: () => ['touched', 'dirty', 'invalid']
        },
        /**
         * Display the radio group as inline
         * @type Boolean
         * @default false
         * @name inline
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * The indeterminate state of the radio group
         * @type Boolean
         * @default false
         * @name indeterminate
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * Used to set the radio group value
         * @default
         * @name modelValue
         */
        modelValue: {
            default: undefined
        },
        /**
         * The unique identifier of the radio group
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default: () => {
                return uid('radio-group');
            }
        },
        /**
         * The readonly state of the radio group
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the radio group
         * @type sm | md | lg
         * @default
         * @name size
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Enable radio group validation using schema
         * @type Boolean
         * @default true
         * @name validate
         */
        validate: {
            type: Boolean,
            default: true
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ],
    setup(props, { emit }) {
        const form = inject(FormKey, null);
        const formGroup = inject(FormGroupKey, null);

        const currentColor = computed(
            () => props.color || formGroup?.color.value || form?.color.value
        );
        const currentSize = computed(() => props.size || formGroup?.size.value || form?.size.value);

        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

        const disabled = computed(
            () => !!(props.disabled || formGroup?.disabled.value || form?.disabled.value)
        );
        const readonly = computed(
            () => !!(props.readonly || formGroup?.readonly.value || form?.readonly.value)
        );

        const name = toRef(props, 'name');
        const validate = toRef(props, 'validate');
        const {
            schema,
            onInput: schemaOnInput,
            onBlur: schemaOnBlur
        } = useValidation({
            name,
            validate
        });
        const error = toRef(props, 'error');
        const { hasError } = useFormValidationError({
            schema,
            error
        });

        const value = computed(() => {
            if (schema.value && validate.value) {
                return schema.value.value;
            }

            return props.modelValue;
        });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-disabled': disabled.value,
            '-readonly': readonly.value,
            '-inline': props.inline,
            '-error': hasError.value
        }));

        function onChange(value: string) {
            schemaOnInput(name, value);
            emit('update:modelValue', value);
        }

        function onBlur(event: FocusEvent) {
            schemaOnBlur(name, event);
        }

        provide(RadioGroupKey, {
            name,
            value,
            disabled,
            readonly,
            color,
            size,
            onChange,
            onBlur
        });

        return {
            classes
        };
    }
});
</script>

<template>
    <div
        v-bind="$attrs"
        class="form-group radio-group"
        :class="classes"
        :name="name"
        role="radiogroup"
    >
        <!-- @slot default Slot for default radio group options -->
        <slot />
    </div>
</template>
