import { Backends } from '../../Elements/index'
import { Form } from './Form'


export function IBM() {
  return (
    <>
      <h3>IBM Quantum</h3>
      <p>
        If you want to use your own IBM Quantum account to use a IBM quantum
        computer in the cloud, you can do it by entering your API token. You can
        find it in your IBM Quantum account, in the "Account settings / Account
        overview" section.
      </p>
      <p>
        Once you have entered your API token, you will see the available
        backends in the "Backends" section so you can choose the one you want to
        use later.
      </p>
      <p>
        If you don't have an account, you can create one {" "}
        <a
          className="link-primary"
          href="https://quantum-computing.ibm.com/login"
        >
          here
        </a>
        .
      </p>
      <Form />
      <Backends />
    </>
  );
}

