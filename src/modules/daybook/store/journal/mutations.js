// export const myMutation = ( state ) => {
//
//}

export const setEntries = ( state, entries ) => {
    state.entries = [...state.entries, ...entries]    
}

export const updateEntry = ( state, entry ) => {
    const idx = state.entries.map(e => e.id).indexOf(entry.id)
    state.entries[idx] = entry
}

export const setIsLoading = ( state, isLoading ) => {    
    state.isLoading = isLoading;
}

export const addEntry = ( state, entry ) => {
    state.entries = [entry, ...state.entries]    
}

export const deleteEntry = (state, id) => {
    state.entries = state.entries.filter(e => e.id !== id)
}