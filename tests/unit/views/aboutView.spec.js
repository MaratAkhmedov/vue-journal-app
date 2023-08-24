import AboutView from '@/views/AboutView.vue';
import { shallowMount } from '@vue/test-utils'

describe('AboutView test', () => {
  it('should match with a snapshot', () => {
    const wrapper = shallowMount(AboutView);
    expect(wrapper.html()).toMatchSnapshot()
  });
})