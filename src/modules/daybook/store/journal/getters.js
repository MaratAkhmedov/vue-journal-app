// export const myGetter = (state) => {
//
//}

export const getEntriesByTerm = ( state ) => (term = '') => {    
    if(term.length === 0){
        return state.entries
    }

    return state.entries.filter(entry => entry.text.toLowerCase().includes(term.toLowerCase()))
}

export const getEntryById = (state) => (id = '') => {
    const entry = state.entries.find(e => e.id === id)
    if(!entry){
        return
    }
    /**
     * CREATE A COPY FOR NOT MODIFY the reference of the object
     */
    return {...entry}
}