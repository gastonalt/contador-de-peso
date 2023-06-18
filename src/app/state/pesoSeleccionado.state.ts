import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import { Peso } from '../models/Peso';
import { Reseteable } from './Reseteable';

export class SetPesoSeleccionadoAction {
    static readonly type = '[Peso] Set peso seleccionado';

    constructor(public peso: Peso) {
    }
}

@Reseteable
export class ResetPesoState {
    static readonly type = '[Peso] Reset peso seleccionado';
}

export class PesosStateModel {
    public pesoSeleccionado!: Peso | null;
}

const pesosStateModelDefaults: PesosStateModel = {
  pesoSeleccionado: null,
};

@State<PesosStateModel>({
    name: 'PesosApp',
    defaults: pesosStateModelDefaults
})

@Injectable()
export class PesosState {

    constructor() {
    }

    @Selector()
    static getPesoSeleccionado(state: PesosStateModel): Peso | null {
        return state.pesoSeleccionado;
    }

    @Action(SetPesoSeleccionadoAction)
    setPesoSeleccionado(ctx: StateContext<PesosStateModel>, action: SetPesoSeleccionadoAction) {
        ctx.patchState({pesoSeleccionado: action.peso});
    }

    @Action(ResetPesoState)
    resetPesoSeleccionado(ctx: StateContext<PesosStateModel>) {
        ctx.patchState({pesoSeleccionado: null});
    }
}
