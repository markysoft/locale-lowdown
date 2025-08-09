export function ErrorArticle({ message }: { message: string }) {

    return (
        <article class="message is-danger">
            <div class="message-header">
                <p>Error</p>
            </div>
            <div class="message-body">
                { message }
            </div>
        </article>
    )
}
