import * as Sqrl from 'squirrelly'
import { readFile } from './readFile'

export async function addPartial(name: string) : Promise<void> {
    const bankHolidayTemplate = await readFile(`./templates/${name}.sqrl`)
    Sqrl.templates.define(name, Sqrl.compile(bankHolidayTemplate))
}
