import IRadio from '../index.vue';
import {
    IRadioBasicExample,
    IRadioColorVariantsExample,
    IRadioDisabledExample,
    IRadioGroupDisabledExample,
    IRadioGroupSizeVariantsExample,
    IRadioNativeExample,
    IRadioReadonlyExample,
    IRadioSizeVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: IRadio,
    title: 'Components/Radio',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-radio v-bind="args">
        Radio
    </i-radio>`,
});

export const Component = Template.bind({});

export const Basic = () => IRadioBasicExample;
export const ColorVariants = () => IRadioColorVariantsExample;
export const Disabled = () => IRadioDisabledExample;
export const GroupDisabled = () => IRadioGroupDisabledExample;
export const GroupSizeVariants = () => IRadioGroupSizeVariantsExample;
export const Native = () => IRadioNativeExample;
export const Readonly = () => IRadioReadonlyExample;
export const SizeVariants = () => IRadioSizeVariantsExample;
            