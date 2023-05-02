import { Row, Button, ButtonGroup } from "react-bootstrap";
import "react-medium-image-zoom/dist/styles.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export function Circuit({
  circuit,
}: {
  circuit: string;
}) {
  const dataURI = `data:image/png;base64,${circuit}`;
  return (
    <>
      <Row id="modal-row" style={{overflow: 'scroll', maxHeight: '500px'}}>
        <TransformWrapper
      initialScale={0.5}
      limitToBounds={true}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <div className="tools" >
            <ButtonGroup>
            <Button variant="outline-primary" size="sm" onClick={() => zoomIn()}>+</Button>
            <Button variant="outline-primary" size="sm" onClick={() => zoomOut()}>-</Button>
            <Button variant="outline-primary" size="sm" onClick={() => resetTransform()}>Reset</Button>
            </ButtonGroup>
          </div>
          <TransformComponent >
            <img  style={{width: '70%'}} src={dataURI} alt="test" />
          </TransformComponent>
        </>
      )}
    </TransformWrapper>




      </Row>

    </>
  );
}
