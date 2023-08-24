import { shallowMount } from "@vue/test-utils";

import Entry from "@/modules/daybook/components/Entry.vue";
import journalState from "../../../mock-data/test-journal-state";

describe('Entry component tests', () => {
    let wrapper, mockRouter, defaultMockEntry

    beforeEach(() => {
        mockRouter = {
            push: jest.fn()
        }
        defaultMockEntry = journalState.entries[0]
        
        wrapper = shallowMount(Entry, {
            props: {
                entry: defaultMockEntry
            },
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })
    })

    it('should match with a snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    });

    it('should redirect on click on .entry-container', () => {
        wrapper.find('.entry-container').trigger('click')
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'daybook-entry', params: {id: defaultMockEntry.id}})
    });

    it('check shortText computed property', async() => {
        const vm = wrapper.vm
        //show full text when it is short
        expect(vm.shortText.length).toBe(defaultMockEntry.text.length)

        const mockWithLargeText = {...defaultMockEntry}
        mockWithLargeText.text = "Reprehenderit elit elit proident tempor laboris in officia irure dolore nostrud. Consequat sunt dolor aute eu non in minim non ut cupidatat. Do fugiat cupidatat laborum consectetur laborum qui amet.Quis eu aute incididunt elit sit tempor. Do qui id in elit aliquip irure cillum dolor eiusmod officia cupidatat proident cillum magna. Cupidatat eu tempor elit magna est non pariatur occaecat minim sit.Magna eu amet elit ipsum sit aliquip et laborum sunt duis amet. In quis sit dolor sit Lorem fugiat id eiusmod officia consectetur. Veniam cupidatat cillum sit aliqua officia ea excepteur fugiat nisi ullamco minim fugiat. Ad voluptate nulla laboris ut excepteur aliqua. Aute fugiat incididunt incididunt eu laborum pariatur deserunt dolore consequat velit ut dolore officia."
        await wrapper.setProps({entry: mockWithLargeText})

        expect(vm.shortText.slice(0, -3).length).toBe(150)
    });
});