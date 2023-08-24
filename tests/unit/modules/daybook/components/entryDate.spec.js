import { shallowMount } from "@vue/test-utils";

import testJournalState from "../../../mock-data/test-journal-state";
import EntryDate from "@/modules/daybook/components/EntryDate.vue";


describe('EntryDate tests', () => {
    let wrapper, defaultMockEntryDate, vm

    beforeEach(() => {
        defaultMockEntryDate = new Date(testJournalState.entries[0].date)
        
        wrapper = shallowMount(EntryDate, {
            props: {
                dateString: defaultMockEntryDate
            }
        })

        vm = wrapper.vm
    })

    it('Check computed day', () => {
        expect(vm.day).toBe(defaultMockEntryDate.getDate())
    });

    it('Check computed month', () => {
        expect(vm.month).toBe('Agosto')
    });

    it('Check computed yearDay', () => {         
        expect(vm.yearDay).toBe(`2023, Domingo`)
    });
});