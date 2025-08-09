
import { toFriendlyDate } from '@/lib/utils'
import { BinDay } from '../schemas/BinDay'

export function BinsCard({ nextBins }: { nextBins: BinDay[] }) {

    return (
        <div id="bins" class="card">
            <div class="card-content">
                <div class="content has-text-centered">
                        {nextBins.map((bin, index) => 
                        <div>
                            <p>
                                <h4>{toFriendlyDate(bin.date)}</h4>
                                <strong>{bin.type}</strong><br/>
                                {bin.description}
                                {index < nextBins.length - 1 && <hr />}
                            </p>
                        </div>
                        )}
                </div>
            </div>
        </div>
    )
}
