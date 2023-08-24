import { createStore } from "vuex";
import journal from "@/modules/daybook/store/journal";
import journalState from "../../../../mock-data/test-journal-state";
import firebaseApi from "@/api/firebaseApi";

const createVuewStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: structuredClone(initialState)
            },
        }
    })


describe('Vuex - test journal modules', () => {
    // INITIAL STATE =======================
    it('Should have correct initial state', () => {
        const store = createVuewStore(journalState)
        const { isLoading, entries } = store.state.journal

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    });


    // MUTATIONS =======================
    it('Mutations: setEntries', () => {
        const store = createVuewStore({ isLoading: true, entries: [] })
        store.commit('journal/setEntries', journalState.entries)

        expect(store.state.journal.isLoading).toBeTruthy()
        expect(store.state.journal.entries).toEqual(journalState.entries)
        expect(store.state.journal.entries.length).toBe(2)

        store.commit('journal/setEntries', journalState.entries)
        expect(store.state.journal.entries.length).toBe(4)
    });

    it('Mutations: updateEntry', () => {
        const store = createVuewStore(journalState)
        const updatedEntry = {
            id: "id1",
            date: "Sun Aug 11 2021",
            text: "Updated text"
        }

        store.commit('journal/updateEntry', updatedEntry)

        const storeEntries = store.state.journal.entries;

        expect(storeEntries
            .find(e => e.id === updatedEntry.id)).toEqual(updatedEntry)

        expect(storeEntries.length).toBe(2)
    });

    it('Mutations: addEntry', () => {
        const store = createVuewStore(journalState)
        const newEntry = {
            id: "id3",
            date: "Sun Aug 11 2020",
            text: "new text data"
        }

        store.commit('journal/addEntry', newEntry)
        const storeEntries = store.state.journal.entries;
        expect(storeEntries
            .find(e => e.id === newEntry.id)).toEqual(newEntry)

        expect(storeEntries.length).toBe(3)
    });

    it('Mutations: deleteEntry', () => {
        const store = createVuewStore(journalState)

        store.commit('journal/deleteEntry', 'id1')
        const storeEntries = store.state.journal.entries;
        expect(storeEntries
            .find(e => e.id === 'id1')).toBeUndefined()

        expect(storeEntries.length).toBe(1)
    });


    // GETTERS =======================
    it('Getters: getEntriesByTerm', () => {
        const store = createVuewStore(journalState)
        const recoveredEntry = store.getters['journal/getEntriesByTerm']('Hola mundo mock 1')

        const [entry1, entry2] = store.state.journal.entries

        expect(recoveredEntry).toEqual([entry1])
    });

    it('Getters: getEntryById', () => {
        const store = createVuewStore(journalState)
        const recoveredEntry = store.getters['journal/getEntryById']('id2')
        const [entry1, entry2] = store.state.journal.entries
        expect(recoveredEntry).toEqual(entry2)


    });


    // Actions =======================
    it('Actions: loadEntries', async () => {
        const store = createVuewStore({ isLoading: true, entries: [] })
        const firebaseApiMock = jest.spyOn(firebaseApi, 'get');  // spy on post
        const firebaseAxiosResponse = {
            data: {
                'ID': {
                    date: 'Sun Aug 20 2021',
                    picture: 'https://my_image_url.jpg',
                    text: 'it works?'
                }
            }
        };
        firebaseApiMock.mockImplementation(() => (firebaseAxiosResponse));


        await store.dispatch('journal/loadEntries')
        expect(store.state.journal.entries.length).toBe(1)
        expect(store.state.journal.entries).toEqual([{
            id: 'ID',
            date: 'Sun Aug 20 2021',
            picture: 'https://my_image_url.jpg',
            text: 'it works?'
        }])
    });

    it('Actions: updateEntry', async () => {
        const store = createVuewStore(journalState)
        const firebaseApiMock = jest.spyOn(firebaseApi, 'put');  // spy on post

        const updateEntry = {
            id: journalState.entries[0].id,
            date: "Sun Aug 11 2021",
            text: "Updated text"
        }
        firebaseApiMock.mockImplementation(() => ({data: {...updateEntry}}));
        await store.dispatch('journal/updateEntry', updateEntry)
        expect(store.state.journal.entries.length).toBe(2)

        const { id, ...withoutId } = updateEntry

        expect(firebaseApiMock).toHaveBeenCalledWith(`/entries/${id}.json`, withoutId)
    });

    it('Actions: createEntry', async () => {
        const store = createVuewStore(journalState)
        const firebaseApiMock = jest.spyOn(firebaseApi, 'post');  // spy on post
        firebaseApiMock.mockImplementation(() => ({data: {name: "id3"}}));

        const createEntry = {
            id: "id3",
            date: "Sun Aug 12 2022",
            text: "Created text"
        }

        await store.dispatch('journal/createEntry', createEntry)
        expect(store.state.journal.entries.length).toBe(3)

        const { id, ...withoutId } = createEntry

        expect(firebaseApiMock).toHaveBeenCalledWith(`/entries.json`, createEntry)
    });

    it('Actions: deleteEntry', async () => {
        const store = createVuewStore(journalState)
        const firebaseApiMock = jest.spyOn(firebaseApi, 'delete');  // spy on post
        firebaseApiMock.mockImplementation(() => ({data: {}}));

        const numEntriesBeforeDelete = store.state.journal.entries.length
        const firstMockEntryId = journalState.entries[0].id
        await store.dispatch('journal/deleteEntry', firstMockEntryId)
        expect(store.state.journal.entries.length).toBe(numEntriesBeforeDelete - 1)
        expect(firebaseApiMock).toHaveBeenCalledWith(`/entries/${firstMockEntryId}.json`)
    });
});