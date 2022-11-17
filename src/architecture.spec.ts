// imports and applies the jest extensions
import 'tsarch/dist/jest';

// imports the files entrypoint
import {FileConditionBuilder, filesOfProject} from 'tsarch';

describe('architecture test', () => {
    let files: FileConditionBuilder

    beforeAll(() => {
        files = filesOfProject("tsconfig.app.json")
    })

    // architecture tests can take a while to finish
    jest.setTimeout(60000);

    it('business logic should not depend on the ui', async () => {
        const violations = await filesOfProject()
            .inFolder('business-layer')
            .shouldNot()
            .dependOnFiles()
            .inFolder('ui-layer')
            .check();

        expect(violations).toEqual([]);
    });
});
