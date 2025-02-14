import fs from 'fs'
export async function readFile(filename: string) {
    return fs.readFileSync(filename, 'utf8').toString()
}


export async function readFileStream(filename: string) {
    return fs.readFileSync(filename, 'utf8')
}