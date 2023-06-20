import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import { Peso } from '../models/Peso';
import { Reseteable } from './Reseteable';

export class SetListaPesosAction {
    static readonly type = '[ListaPesos] Set peso seleccionado';

    constructor(public listaPesos: Peso[]) {
    }
}

@Reseteable
export class ResetListaPesosState {
    static readonly type = '[ListaPesos] Reset peso seleccionado';
}

export class ListaPesosStateModel {
    public listaPesos!: Peso[];
}

const listaPesosStateModelDefaults: ListaPesosStateModel = {
  listaPesos: [],
};

@State<ListaPesosStateModel>({
    name: 'ListaPesos',
    defaults: listaPesosStateModelDefaults
})

@Injectable()
export class ListaPesosState {

    constructor() {
    }

    @Selector()
    static getListaPesos(state: ListaPesosStateModel): Peso[] {
        return state.listaPesos;
    }

    @Action(SetListaPesosAction)
    setListaPesos(ctx: StateContext<ListaPesosStateModel>, action: SetListaPesosAction) {
        ctx.patchState({listaPesos: action.listaPesos});
    }

    @Action(ResetListaPesosState)
    resetListaPesos(ctx: StateContext<ListaPesosStateModel>) {
        ctx.patchState({listaPesos: []});
    }
}
