import { shallowMount } from "@vue/test-utils";

import EntryList from "@/modules/daybook/components/EntryList.vue";
import { createStore } from "vuex";
import journalState from "../../../mock-data/test-journal-state";
import journal from "@/modules/daybook/store/journal";

const createVuewStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: structuredClone(initialState)
            },
        }
    })

describe('EntryList tests', () => {
    let wrapper
    const store = createVuewStore(journalState)
    const mockRouter = {
        push: jest.fn()
    }
    

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            },
        })
    })

    it('should call getEntriesByTerm and show 2 entry', () => {
        expect(wrapper.findAll('entry-stub').length).toBe(2)
    });

    it('should call getEntriesByTerm and filter the entries', async() => {
        const input = wrapper.find('input')
        await input.setValue('Hola mundo mock 2')
        expect(wrapper.findAll('entry-stub').length).toBe(1)

        await input.setValue('Wtfffff')
        expect(wrapper.findAll('entry-stub').length).toBe(0)
    });

    it('The new button should redirect to /new', () => {
        const btn = wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'daybook-entry', params: { id: 'new' } })
    });
});