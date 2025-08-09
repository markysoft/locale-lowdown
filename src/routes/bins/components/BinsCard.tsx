import { FC } from 'hono/jsx'
import { BinDay } from '../services/getNextBinDays'
import { toFriendlyDate } from '../../../lib/utils'

export const BinsCard: FC<{ nextBins: BinDay[] }> = (props: { nextBins: BinDay[] }) => {

    return (
        <div id="bins" class="card">
            <div class="card-content">
                <div class="content has-text-centered">
                        {props.nextBins.map((bin, index) => 
                        <div>
                            <p>
                                <h4>{toFriendlyDate(bin.date)}</h4>
                                <strong>{bin.type}</strong><br/>
                                {bin.description}
                                {index < props.nextBins.length - 1 && <hr />}
                            </p>
                        </div>
                        )}
                </div>
            </div>
        </div>
    )
}
