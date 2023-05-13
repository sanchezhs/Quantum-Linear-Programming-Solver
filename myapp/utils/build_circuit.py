from qiskit import QuantumCircuit, QuantumRegister
import numpy as np

class BuildCircuit():
    def __init__(self,
                 nqubits: int,
                 pauli: list,
                 theta: list,
                 p: int,
                 ) -> None:
        self.nqubis = nqubits
        self.pauli = pauli
        self.theta = theta
        self.p = p

    def problem_hamiltonian(self, circuit: QuantumCircuit, gamma: list, j: int) -> QuantumCircuit:
        print(self.pauli[0].primitive)
        pauli_list = self.pauli[0].primitive.to_list()
        for pauli in pauli_list:
            op, coef = pauli[0][::-1], pauli[1]
            lqubit = []
            for i, c in enumerate(op):
                if c == 'Z':
                    lqubit.append(i)
            if len(lqubit) == 1:
                circuit.rz(coef.real/(2*np.pi) * 2 * gamma[j], lqubit[0])
            elif len(lqubit) == 2:
                circuit.rzz(coef.real/(2*np.pi) * 2 * gamma[j], lqubit[0], lqubit[1])

        return circuit

    def build(self) -> QuantumCircuit:
        nqubits = self.nqubis
        qreg_q = QuantumRegister(nqubits, 'q')
        circuit = QuantumCircuit(qreg_q)
        beta = self.theta[self.p:]
        gamma = self.theta[:self.p]

        # Apply Hadamard gate to all qubits
        for i in range(0, nqubits):
            circuit.h(qreg_q[i])

        # Repeat p times
        for j in range(0, self.p):
            circuit.barrier()

            # Apply problem hamiltonian
            self.problem_hamiltonian(circuit, gamma, j)
            circuit.barrier()

            # Apply mixer hamiltonian
            for i in range(0, nqubits):
                circuit.rx(2 * beta[j], qreg_q[i])

        circuit.measure_all()
        return circuit

    def to_qasm(self) -> str:
        return self.circuit.qasm()

    def print_circuit(self):
        print(self.circuit.draw('text'))

    def get_circuit(self) -> QuantumCircuit:
        return self.circuit
