import { State } from './Slider'


export function checkSettings(state : State, showErrorModal: (message: string[]) => void, setOpenPanel: (openPanel: boolean) => void) {

    let { upperBound, lowerBound, depth, seed, token, simulator } = state;

    if (!simulator && token === '') {
        showErrorModal(["Please enter token to access IBM quantum computer"]);
        setOpenPanel(false);
        return false;
    }

    if (state.simulator === null) {
        showErrorModal(["Please select simulator or quantum computer"]);  
        setOpenPanel(false);
        return false;
    }

    if (!upperBound || !lowerBound || !depth || !seed) {
        showErrorModal(["Upper bound, lower bound, depth and seed must be numbers"]);
        setOpenPanel(false);
        return false;
    }

    let upperBoundNumber = Number(upperBound);
    let lowerBoundNumber = Number(lowerBound);
    let depthNumber = Number(depth);
    let seedNumber = Number(seed);
    if (depthNumber < 0 || seedNumber < 0) {
        showErrorModal(["Depth and seed must be positive s"]);
        setOpenPanel(false);
        return false;
    }

    if ((lowerBoundNumber > upperBoundNumber) || (lowerBoundNumber === upperBoundNumber)) {
        showErrorModal(["Lower bound must be less than upper bound"]);
        setOpenPanel(false);
        return false;
    }

    return true;
}