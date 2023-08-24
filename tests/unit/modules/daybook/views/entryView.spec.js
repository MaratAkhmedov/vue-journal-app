import { shallowMount } from "@vue/test-utils";

import { createStore } from "vuex";
import journalState from "../../../mock-data/test-journal-state";
import journal from "@/modules/daybook/store/journal";
import EntryView from "@/modules/daybook/views/EntryView.vue";
import Swal from "sweetalert2";

const createVuewStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: structuredClone(initialState)
            },
        }
    })

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe('EntryView tests', () => {
    let wrapper

    const store = createVuewStore(journalState)
    store.dispatch = jest.fn()
    // store.mutations = jest.fn()

    const mockRouter = {
        push: jest.fn()
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should redirect user if the component does not receive an id', () => {
        shallowMount(EntryView, {
            props: {
                id: 'idWhatDoesNotExist',
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            },
        })
        expect(mockRouter.push).toBeCalledWith({ name: 'daybook-no-entry' })
    });

    it('should show the correct entry', async () => {
        wrapper = shallowMount(EntryView, {
            props: {
                id: 'id2',
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            },
        })
        expect(mockRouter.push).not.toBeCalledWith({ name: 'daybook-no-entry' })
        expect(wrapper.vm.entry.id).toBe("id2")

        const textarea = wrapper.find('textarea')
        await textarea.setValue("abc")
        expect(wrapper.vm.entry.text).toBe("abc")
    });


    it('should call deleteEntry', (done) => {
        Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }))

        wrapper.find('.btn-danger').trigger('click')
        expect(Swal.fire).toHaveBeenCalledWith({
            title: '¿Está seguro?',
            text: 'Una vez borrado, no se puede recuperar',
            showDenyButton: true,
            confirmButtonText: 'Si, estoy seguro'
        })

        setTimeout(() => {
            expect(mockRouter.push).toHaveBeenCalled()
            expect(store.dispatch).toHaveBeenCalledWith("journal/deleteEntry", "id2")
            done()
        }, 1)

    });
});