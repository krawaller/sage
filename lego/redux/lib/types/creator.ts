import { Action, ActionPayload, ActionType, ActionState } from './action'
import { Reducer } from './reducer'

export interface ActionCreator<
  A extends Action<string, any, any, any>,
  Sig extends Array<any> & { 0: any } = [ActionPayload<A>]
> {
  actionType?: ActionType<A>
  (...args: ActionPayload<A> extends undefined ? void[] : Sig): {
    type: ActionType<A>
    payload: ActionPayload<A>
    reducer: Reducer<ActionState<A>, ActionPayload<A>>
  }
}
