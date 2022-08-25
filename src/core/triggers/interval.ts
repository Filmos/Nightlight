import { Chain } from "../logic"
import { Context, FrozenContext } from "../context"
import { EnvironmentContext } from "../module"

type Params = {
    time: number
}
type ContextAdditions = {
    intervalTime: number,
    intervalRepetition: number
}

export default class IntervalTrigger<EnvContext extends EnvironmentContext> extends Chain<Params, ContextAdditions, EnvContext> {
    protected async run(parameters: Params, context: FrozenContext<EnvContext["init"]>, callback: (context: Context<EnvContext["init"] & ContextAdditions>) => void): Promise<void> {
        let newContext = context.add({intervalTime: parameters.time});

        let counter = 0;
        setInterval(() => {
            counter += 1;
            let newerContext = newContext.add({intervalRepetition: counter});
            callback(newerContext)
        }, parameters.time)
    }
}