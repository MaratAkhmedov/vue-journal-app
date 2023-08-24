import HomeView from "@/views/HomeView.vue";
import { shallowMount } from '@vue/test-utils'

describe('AboutView test', () => {
    it('should match with a snapshot', () => {
        const wrapper = shallowMount(HomeView);
        expect(wrapper.html()).toMatchSnapshot()
    });

    test('Make click should make redirect to daybook-no-entry', () => {
        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = shallowMount(HomeView, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })

        wrapper.find('button').trigger('click')

        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'daybook-no-entry' })
    });
})