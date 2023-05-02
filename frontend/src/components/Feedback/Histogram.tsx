import { Row } from "react-bootstrap";
import Zoom from "react-medium-image-zoom";

export function Histogram({ histogram }: { histogram: string }) {
  const histogramURI = `data:image/png;base64,${histogram}`;

  return (
    <>
      <dl id="modal-row" className="row">
      <dt className="col-sm-4 mb-3">Histogram of variables and its probabilities</dt>
        <dd className="col-sm-8 mb-3">
        <figure>
          <Zoom>
            <picture>
              <source media="(max-width: 1000px)" srcSet={histogramURI} />
              <img alt="" src={histogramURI} width="200" />
            </picture>
          </Zoom>
        </figure>
        </dd>
      </dl>
    </>
  );
}
