import { applyBritishSummerTime, toHourMinuteString } from "@/lib/utils";
import { date } from "zod";

export function NextBusCard({ nextBusTo, nextBusFrom }: { nextBusTo: string, nextBusFrom: string, }) {
    return (
        <div id='travel-bus'>
            <h2 class="title has-text-primary-15">Bus Departures</h2>
            <div class="card">
                <div class="card-content">
                    <p class="content">
                        Last updated: <strong>{toHourMinuteString(applyBritishSummerTime(new Date()))}</strong>
                        <span id="train-spinner" data-show="$_fetchTrains">&nbsp;<i class="fa fa-sync fa-spin"></i></span>
                    </p>
                    <div class="content has-text-centered">
                        <p>
                            Next Bus to Malton is <strong>{nextBusTo}</strong> <br />
                            Next Bus from Malton is <strong>{nextBusFrom}</strong>
                        </p>
                        <p>Check the <a href="https://getdown.org.uk/bus/bus/194.shtml" target="_blank">schedule</a> for more
                            details</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
