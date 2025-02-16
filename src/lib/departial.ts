export function departial(partial: string): string {
    return `{{@include('${partial}', it)/}}`
}