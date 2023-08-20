import firebaseApi from "@/api/firebaseApi"

// export const myAction = async({ commit }) => {
//
//}


export const loadEntries = async ({ commit }) => {
    const { data } = await firebaseApi.get('/entries.json')
    const entries = []
    if (data) {
        for (let id of Object.keys(data)) {
            entries.push({
                id,
                ...data[id]
            })
        }
    }
    commit('setEntries', entries)
    commit('setIsLoading', false)
}

export const updateEntry = async ({ commit }, entry) => {
    const { id, ...entryWithoutId } = entry;
    await firebaseApi.put(`/entries/${id}.json`, entryWithoutId)
    commit('updateEntry', { ...entry })
}

export const createEntry = async ({ commit }, entry) => {
    const { data } = await firebaseApi.post('/entries.json', entry)
    entry.id = data.name;
    commit('addEntry', { ...entry })
    return data.name
}

export const deleteEntry = async ({ commit }, id) => {
    commit('setIsLoading', true)
    await firebaseApi.delete(`/entries/${id}.json`)
    commit('setIsLoading', false)
    commit('deleteEntry', id)
}
