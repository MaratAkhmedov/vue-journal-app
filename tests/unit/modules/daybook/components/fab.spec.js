import Fab from '@/modules/daybook/components/Fab.vue';
import { shallowMount } from '@vue/test-utils'


describe('Test Fab component', () => {
    it('should show the default icon', () => {
        const wrapper = shallowMount(Fab);
        const icon = wrapper.find('i')
        
        expect(icon.classes('fa-plus')).toBeTruthy()
    });

    it('should show the icon passed as prop: fa-circle', () => {
        const wrapper = shallowMount(Fab, {
            props: {
                icon: 'fa-circle'
            }
        });
        const icon = wrapper.find('i')
        
        expect(icon.classes('fa-circle')).toBeTruthy()
    });

    it('should emit event "on:click" on click', () => {
        const wrapper = shallowMount(Fab);
        const button = wrapper.find('button')
        button.trigger('click')        
        expect(wrapper.emitted('on:click')).toHaveLength(1)
        
    });
});