import { FC } from 'hono/jsx'

export const ErrorArticle: FC<{ message: string }> = (props: { message: string }) => {

    return (
        <article class="message is-danger">
            <div class="message-header">
                <p>Error</p>
            </div>
            <div class="message-body">
                { props.message }
            </div>
        </article>
    )
}
