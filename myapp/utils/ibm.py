from qiskit import QuantumRegister, ClassicalRegister, QuantumCircuit
from qiskit_ibm_runtime import QiskitRuntimeService, Session, Sampler
from numpy import pi

t = "4028a768ca1626c7d921c2872156924aa8f740ebd43cd7cb18f44a51edb5f2a781dcc40419fcdb28749f04ffa8e31d819e258142766f2c9b7df29796f099f932"

# IBMNotAuthorizedError: 'The access token is not authorized to access the requested resource.'
# error en el token
# instance: ibm-q/open/main
def get_backends(token):
    QiskitRuntimeService.save_account(overwrite=True, channel="ibm_quantum", token=token)
    try:
        backends = QiskitRuntimeService().backends()
    except:
        raise Exception('Invalid IBM token')
    backends_list = []
    for i in range(len(backends)):
        status = backends[i].status()
        try:
            num_qubits = backends[i].configuration().n_qubits
            is_simulator = backends[i].configuration().simulator
        except:
            num_qubits = 'not available'
            is_simulator = 'not available'
        backend_info = {
            'name': backends[i].name,
            'num_qubits': num_qubits,
            'is_simulator': is_simulator,
            'operational': status.operational,
            'pending_jobs': status.pending_jobs,
            'status_msg': status.status_msg,
        }
        backends_list.append(backend_info)
    return backends_list
    





##### Execute the circuit on the qasm simulator backend
#service = QiskitRuntimeService()
#program_inputs = {
#    'iterations': 1
#}
#options = {'backend': 'ibm_qasm_simulator'}
#with Session(service=service, backend="ibmq_qasm_simulator") as session:
#    sampler = Sampler(session=session, options=options)
#    job = sampler.run(circuits=circuit)
#    print(f"Job ID is {job.job_id()}")
#    print(f"Job result is {job.result()}")
#
#
#print(circuit.draw(output='mpl'))


##### tests
#backends = QiskitRuntimeService().backends()
#print(backends)
#backend = backends[0]
#status = backend.status()
#print(
#     'Nombre: ', backend.name, '\n',
#      'num qubits: ', backend.num_qubits,'\n',
#      'is simulator: ', backend.simulator,'\n',
#      'operational: ', status.operational,'\n',
#      'pending jobs: ', status.pending_jobs,'\n',
#      'status msg: ', status.status_msg,    '\n',
#      )
#qreg_q = QuantumRegister(4, 'q')
#creg_c = ClassicalRegister(4, 'c')
#circuit = QuantumCircuit(qreg_q, creg_c)
#
#circuit.h(qreg_q[0])
#circuit.h(qreg_q[1])
#circuit.measure(qreg_q[0], creg_c[0]) 