import { State } from './Slider'


export function checkSettings(state : State, showErrorModal: (message: string[]) => void) {

    let { upperBound, lowerBound, depth, seed, token } = state;

    if (token === '') {
        showErrorModal(["Please enter token to access IBM quantum computer"]);
        return false;
    }

    if (state.simulator === null) {
        showErrorModal(["Please select simulator or quantum computer"]);  
        return false;
    }

    if (!upperBound || !lowerBound || !depth || !seed) {
        showErrorModal(["Upper bound, lower bound, depth and seed must be numbers"]);
        return false;
    }

    let upperBoundNumber = Number(upperBound);
    let lowerBoundNumber = Number(lowerBound);
    let depthNumber = Number(depth);
    let seedNumber = Number(seed);
    if (depthNumber < 0 || seedNumber < 0) {
        showErrorModal(["Depth and seed must be positive s"]);
        return false;
    }

    if (lowerBoundNumber > upperBoundNumber) {
        showErrorModal(["Lower bound must be less than upper bound"]);
        return false;
    }

    if (lowerBoundNumber == 0 && upperBoundNumber == 0) {
        showErrorModal(["Lower bound and upper bound cannot be both 0"]);
        return false;
    }
    

    return true;
}