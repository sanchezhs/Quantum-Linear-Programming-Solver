import { Row } from "react-bootstrap";
import Zoom from "react-medium-image-zoom";

export function Histogram({ histogram }: { histogram: string }) {
  const histogramURI = `data:image/png;base64,${histogram}`;

  return (
    <>
      
        <figure>
          <Zoom>
            <picture>
              <source media="(max-width: 1000px)" srcSet={histogramURI} />
              <img alt="" src={histogramURI} width="400" />
            </picture>
          </Zoom>
        </figure>
        
    </>
  );
}
