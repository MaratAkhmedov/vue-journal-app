import daybookRouter from "@/modules/daybook/router";

describe('Test Daybook router', () => {

    it('should match an object', () => {
        expect(daybookRouter).toMatchObject({
            name: 'daybook',
            component: expect.any(Function),
            children: [
                {
                    path: '',
                    name: 'daybook-no-entry',
                    component: expect.any(Function),
                },
                {
                    path: ':id',
                    name: 'daybook-entry',
                    component: expect.any(Function),
                    props: expect.any(Function)
                },
            ]
        })
    });

    it('Router should call the correct router names names', async () => {
        expect((await daybookRouter.children[0].component()).default.name).toBe("NoEntrySelected")
        expect((await daybookRouter.children[1].component()).default.name).toBe("EntryView")

        const promiseRoutes = []

        daybookRouter.children.forEach(child => promiseRoutes.push(child.component()))
        const routes = (await Promise.all(promiseRoutes)).map(r => r.default.name)
        expect(routes).toContain("NoEntrySelected", "EntryView")
    });

    it('Daybook-entry should return the id of the path', () => {
        const route = {
            params: {
                id: 'ABC-123'
            }
        }
        const entryRoute = daybookRouter.children.find(route => route.name === 'daybook-entry')
        expect(entryRoute.props(route)).toEqual({ id: 'ABC-123' })
    });

});